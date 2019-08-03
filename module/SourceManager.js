'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var geojsonSource = require('./GeojsonSource');
require.d(exports, 'geojson', function () {
  return geojsonSource['a'];
});
var csvSource = require('./CSVSource');
require.d(exports, 'csv', function () {
  return csvSource['a'];
});
require.d(exports, 'array', function () {
  return csvSource['a'];
});
var core_source = require('./Source');
require.d(exports, 'basic', function () {
  return core_source['a'];
});
var imageSource = require('./ImageSource');
require.d(exports, 'imageSource', function () {
  return imageSource['a'];
});
