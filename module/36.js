'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.earthRadius = 6371008.8;
exports.factors = {
  centimeters: exports.earthRadius * 100,
  centimetres: exports.earthRadius * 100,
  degrees: exports.earthRadius / 111325,
  feet: exports.earthRadius * 3.28084,
  inches: exports.earthRadius * 39.37,
  kilometers: exports.earthRadius / 1000,
  kilometres: exports.earthRadius / 1000,
  meters: exports.earthRadius,
  metres: exports.earthRadius,
  miles: exports.earthRadius / 1609.344,
  millimeters: exports.earthRadius * 1000,
  millimetres: exports.earthRadius * 1000,
  nauticalmiles: exports.earthRadius / 1852,
  radians: 1,
  yards: exports.earthRadius / 1.0936
};
exports.unitsFactors = {
  centimeters: 100,
  centimetres: 100,
  degrees: 1 / 111325,
  feet: 3.28084,
  inches: 39.37,
  kilometers: 1 / 1000,
  kilometres: 1 / 1000,
  meters: 1,
  metres: 1,
  miles: 1 / 1609.344,
  millimeters: 1000,
  millimetres: 1000,
  nauticalmiles: 1 / 1852,
  radians: 1 / exports.earthRadius,
  yards: 1 / 1.0936
};
exports.areaFactors = {
  acres: 0.000247105,
  centimeters: 10000,
  centimetres: 10000,
  feet: 10.763910417,
  inches: 1550.003100006,
  kilometers: 0.000001,
  kilometres: 0.000001,
  meters: 1,
  metres: 1,
  miles: 3.86e-7,
  millimeters: 1000000,
  millimetres: 1000000,
  yards: 1.195990046
};
function feature(geom, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var feat = { type: 'Feature' };
  if (options.id === 0 || options.id) {
    feat.id = options.id;
  }
  if (options.bbox) {
    feat.bbox = options.bbox;
  }
  feat.properties = properties || {};
  feat.geometry = geom;
  return feat;
}
exports.feature = feature;
function geometry(type, coordinates, options) {
  if (options === void 0) {
    options = {};
  }
  switch (type) {
  case 'Point':
    return point(coordinates).geometry;
  case 'LineString':
    return lineString(coordinates).geometry;
  case 'Polygon':
    return polygon(coordinates).geometry;
  case 'MultiPoint':
    return multiPoint(coordinates).geometry;
  case 'MultiLineString':
    return multiLineString(coordinates).geometry;
  case 'MultiPolygon':
    return multiPolygon(coordinates).geometry;
  default:
    throw new Error(type + ' is invalid');
  }
}
exports.geometry = geometry;
function point(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: 'Point',
    coordinates: coordinates
  };
  return feature(geom, properties, options);
}
exports.point = point;
function points(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  return featureCollection(coordinates.map(function (coords) {
    return point(coords, properties);
  }), options);
}
exports.points = points;
function polygon(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
    var ring = coordinates_1[_i];
    if (ring.length < 4) {
      throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
    }
    for (var j = 0; j < ring[ring.length - 1].length; j++) {
      if (ring[ring.length - 1][j] !== ring[0][j]) {
        throw new Error('First and last Position are not equivalent.');
      }
    }
  }
  var geom = {
    type: 'Polygon',
    coordinates: coordinates
  };
  return feature(geom, properties, options);
}
exports.polygon = polygon;
function polygons(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  return featureCollection(coordinates.map(function (coords) {
    return polygon(coords, properties);
  }), options);
}
exports.polygons = polygons;
function lineString(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  if (coordinates.length < 2) {
    throw new Error('coordinates must be an array of two or more positions');
  }
  var geom = {
    type: 'LineString',
    coordinates: coordinates
  };
  return feature(geom, properties, options);
}
exports.lineString = lineString;
function lineStrings(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  return featureCollection(coordinates.map(function (coords) {
    return lineString(coords, properties);
  }), options);
}
exports.lineStrings = lineStrings;
function featureCollection(features, options) {
  if (options === void 0) {
    options = {};
  }
  var fc = { type: 'FeatureCollection' };
  if (options.id) {
    fc.id = options.id;
  }
  if (options.bbox) {
    fc.bbox = options.bbox;
  }
  fc.features = features;
  return fc;
}
exports.featureCollection = featureCollection;
function multiLineString(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: 'MultiLineString',
    coordinates: coordinates
  };
  return feature(geom, properties, options);
}
exports.multiLineString = multiLineString;
function multiPoint(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: 'MultiPoint',
    coordinates: coordinates
  };
  return feature(geom, properties, options);
}
exports.multiPoint = multiPoint;
function multiPolygon(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: 'MultiPolygon',
    coordinates: coordinates
  };
  return feature(geom, properties, options);
}
exports.multiPolygon = multiPolygon;
function geometryCollection(geometries, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: 'GeometryCollection',
    geometries: geometries
  };
  return feature(geom, properties, options);
}
exports.geometryCollection = geometryCollection;
function round(num, precision) {
  if (precision === void 0) {
    precision = 0;
  }
  if (precision && !(precision >= 0)) {
    throw new Error('precision must be a positive number');
  }
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(num * multiplier) / multiplier;
}
exports.round = round;
function radiansToLength(radians, units) {
  if (units === void 0) {
    units = 'kilometers';
  }
  var factor = exports.factors[units];
  if (!factor) {
    throw new Error(units + ' units is invalid');
  }
  return radians * factor;
}
exports.radiansToLength = radiansToLength;
function lengthToRadians(distance, units) {
  if (units === void 0) {
    units = 'kilometers';
  }
  var factor = exports.factors[units];
  if (!factor) {
    throw new Error(units + ' units is invalid');
  }
  return distance / factor;
}
exports.lengthToRadians = lengthToRadians;
function lengthToDegrees(distance, units) {
  return radiansToDegrees(lengthToRadians(distance, units));
}
exports.lengthToDegrees = lengthToDegrees;
function bearingToAzimuth(bearing) {
  var angle = bearing % 360;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}
exports.bearingToAzimuth = bearingToAzimuth;
function radiansToDegrees(radians) {
  var degrees = radians % (2 * Math.PI);
  return degrees * 180 / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
function degreesToRadians(degrees) {
  var radians = degrees % 360;
  return radians * Math.PI / 180;
}
exports.degreesToRadians = degreesToRadians;
function convertLength(length, originalUnit, finalUnit) {
  if (originalUnit === void 0) {
    originalUnit = 'kilometers';
  }
  if (finalUnit === void 0) {
    finalUnit = 'kilometers';
  }
  if (!(length >= 0)) {
    throw new Error('length must be a positive number');
  }
  return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
exports.convertLength = convertLength;
function convertArea(area, originalUnit, finalUnit) {
  if (originalUnit === void 0) {
    originalUnit = 'meters';
  }
  if (finalUnit === void 0) {
    finalUnit = 'kilometers';
  }
  if (!(area >= 0)) {
    throw new Error('area must be a positive number');
  }
  var startFactor = exports.areaFactors[originalUnit];
  if (!startFactor) {
    throw new Error('invalid original units');
  }
  var finalFactor = exports.areaFactors[finalUnit];
  if (!finalFactor) {
    throw new Error('invalid final units');
  }
  return area / startFactor * finalFactor;
}
exports.convertArea = convertArea;
function isNumber(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num) && !/^\s*$/.test(num);
}
exports.isNumber = isNumber;
function isObject(input) {
  return !!input && input.constructor === Object;
}
exports.isObject = isObject;
function validateBBox(bbox) {
  if (!bbox) {
    throw new Error('bbox is required');
  }
  if (!Array.isArray(bbox)) {
    throw new Error('bbox must be an Array');
  }
  if (bbox.length !== 4 && bbox.length !== 6) {
    throw new Error('bbox must be an Array of 4 or 6 numbers');
  }
  bbox.forEach(function (num) {
    if (!isNumber(num)) {
      throw new Error('bbox must only contain numbers');
    }
  });
}
exports.validateBBox = validateBBox;
function validateId(id) {
  if (!id) {
    throw new Error('id is required');
  }
  if ([
      'string',
      'number'
    ].indexOf(typeof id) === -1) {
    throw new Error('id must be a number or a string');
  }
}
exports.validateId = validateId;
function radians2degrees() {
  throw new Error('method has been renamed to `radiansToDegrees`');
}
exports.radians2degrees = radians2degrees;
function degrees2radians() {
  throw new Error('method has been renamed to `degreesToRadians`');
}
exports.degrees2radians = degrees2radians;
function distanceToDegrees() {
  throw new Error('method has been renamed to `lengthToDegrees`');
}
exports.distanceToDegrees = distanceToDegrees;
function distanceToRadians() {
  throw new Error('method has been renamed to `lengthToRadians`');
}
exports.distanceToRadians = distanceToRadians;
function radiansToDistance() {
  throw new Error('method has been renamed to `radiansToLength`');
}
exports.radiansToDistance = radiansToDistance;
function bearingToAngle() {
  throw new Error('method has been renamed to `bearingToAzimuth`');
}
exports.bearingToAngle = bearingToAngle;
function convertDistance() {
  throw new Error('method has been renamed to `convertLength`');
}
exports.convertDistance = convertDistance;