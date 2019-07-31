'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var meta_1 = require('./66');
function bbox(geojson) {
  var result = [
    Infinity,
    Infinity,
    -Infinity,
    -Infinity
  ];
  meta_1.coordEach(geojson, function (coord) {
    if (result[0] > coord[0]) {
      result[0] = coord[0];
    }
    if (result[1] > coord[1]) {
      result[1] = coord[1];
    }
    if (result[2] < coord[0]) {
      result[2] = coord[0];
    }
    if (result[3] < coord[1]) {
      result[3] = coord[1];
    }
  });
  return result;
}
exports.default = bbox;