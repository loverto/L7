'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var helpers_1 = require('./36');
var invariant_1 = require('./67');
function cleanCoords(geojson, options) {
  if (options === void 0) {
    options = {};
  }
  var mutate = typeof options === 'object' ? options.mutate : options;
  if (!geojson)
    throw new Error('geojson is required');
  var type = invariant_1.getType(geojson);
  var newCoords = [];
  switch (type) {
  case 'LineString':
    newCoords = cleanLine(geojson);
    break;
  case 'MultiLineString':
  case 'Polygon':
    invariant_1.getCoords(geojson).forEach(function (line) {
      newCoords.push(cleanLine(line));
    });
    break;
  case 'MultiPolygon':
    invariant_1.getCoords(geojson).forEach(function (polygons) {
      var polyPoints = [];
      polygons.forEach(function (ring) {
        polyPoints.push(cleanLine(ring));
      });
      newCoords.push(polyPoints);
    });
    break;
  case 'Point':
    return geojson;
  case 'MultiPoint':
    var existing = {};
    invariant_1.getCoords(geojson).forEach(function (coord) {
      var key = coord.join('-');
      if (!existing.hasOwnProperty(key)) {
        newCoords.push(coord);
        existing[key] = true;
      }
    });
    break;
  default:
    throw new Error(type + ' geometry not supported');
  }
  if (geojson.coordinates) {
    if (mutate === true) {
      geojson.coordinates = newCoords;
      return geojson;
    }
    return {
      type: type,
      coordinates: newCoords
    };
  } else {
    if (mutate === true) {
      geojson.geometry.coordinates = newCoords;
      return geojson;
    }
    return helpers_1.feature({
      type: type,
      coordinates: newCoords
    }, geojson.properties, {
      bbox: geojson.bbox,
      id: geojson.id
    });
  }
}
function cleanLine(line) {
  var points = invariant_1.getCoords(line);
  if (points.length === 2 && !equals(points[0], points[1]))
    return points;
  var newPoints = [];
  var secondToLast = points.length - 1;
  var newPointsLength = newPoints.length;
  newPoints.push(points[0]);
  for (var i = 1; i < secondToLast; i++) {
    var prevAddedPoint = newPoints[newPoints.length - 1];
    if (points[i][0] === prevAddedPoint[0] && points[i][1] === prevAddedPoint[1])
      continue;
    else {
      newPoints.push(points[i]);
      newPointsLength = newPoints.length;
      if (newPointsLength > 2) {
        if (isPointOnLineSegment(newPoints[newPointsLength - 3], newPoints[newPointsLength - 1], newPoints[newPointsLength - 2]))
          newPoints.splice(newPoints.length - 2, 1);
      }
    }
  }
  newPoints.push(points[points.length - 1]);
  newPointsLength = newPoints.length;
  if (equals(points[0], points[points.length - 1]) && newPointsLength < 4)
    throw new Error('invalid polygon');
  if (isPointOnLineSegment(newPoints[newPointsLength - 3], newPoints[newPointsLength - 1], newPoints[newPointsLength - 2]))
    newPoints.splice(newPoints.length - 2, 1);
  return newPoints;
}
function equals(pt1, pt2) {
  return pt1[0] === pt2[0] && pt1[1] === pt2[1];
}
function isPointOnLineSegment(start, end, point) {
  var x = point[0], y = point[1];
  var startX = start[0], startY = start[1];
  var endX = end[0], endY = end[1];
  var dxc = x - startX;
  var dyc = y - startY;
  var dxl = endX - startX;
  var dyl = endY - startY;
  var cross = dxc * dyl - dyc * dxl;
  if (cross !== 0)
    return false;
  else if (Math.abs(dxl) >= Math.abs(dyl))
    return dxl > 0 ? startX <= x && x <= endX : endX <= x && x <= startX;
  else
    return dyl > 0 ? startY <= y && y <= endY : endY <= y && y <= startY;
}
exports.default = cleanCoords;