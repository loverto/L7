'use strict';
require.d(exports, 'a', function () {
  return PlaneBufferGeometry;
});
var __WEBPACK_IMPORTED_MODULE_0__core_Geometry_js__ = require('./47');
var __WEBPACK_IMPORTED_MODULE_1__core_BufferGeometry_js__ = require('./14');
var __WEBPACK_IMPORTED_MODULE_2__core_BufferAttribute_js__ = require('./15');
function PlaneGeometry(width, height, widthSegments, heightSegments) {
  __WEBPACK_IMPORTED_MODULE_0__core_Geometry_js__['a'].call(this);
  this.type = 'PlaneGeometry';
  this.parameters = {
    width: width,
    height: height,
    widthSegments: widthSegments,
    heightSegments: heightSegments
  };
  this.fromBufferGeometry(new PlaneBufferGeometry(width, height, widthSegments, heightSegments));
  this.mergeVertices();
}
PlaneGeometry.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__core_Geometry_js__['a'].prototype);
PlaneGeometry.prototype.constructor = PlaneGeometry;
function PlaneBufferGeometry(width, height, widthSegments, heightSegments) {
  __WEBPACK_IMPORTED_MODULE_1__core_BufferGeometry_js__['a'].call(this);
  this.type = 'PlaneBufferGeometry';
  this.parameters = {
    width: width,
    height: height,
    widthSegments: widthSegments,
    heightSegments: heightSegments
  };
  width = width || 1;
  height = height || 1;
  var width_half = width / 2;
  var height_half = height / 2;
  var gridX = Math.floor(widthSegments) || 1;
  var gridY = Math.floor(heightSegments) || 1;
  var gridX1 = gridX + 1;
  var gridY1 = gridY + 1;
  var segment_width = width / gridX;
  var segment_height = height / gridY;
  var ix, iy;
  var indices = [];
  var vertices = [];
  var normals = [];
  var uvs = [];
  for (iy = 0; iy < gridY1; iy++) {
    var y = iy * segment_height - height_half;
    for (ix = 0; ix < gridX1; ix++) {
      var x = ix * segment_width - width_half;
      vertices.push(x, -y, 0);
      normals.push(0, 0, 1);
      uvs.push(ix / gridX);
      uvs.push(1 - iy / gridY);
    }
  }
  for (iy = 0; iy < gridY; iy++) {
    for (ix = 0; ix < gridX; ix++) {
      var a = ix + gridX1 * iy;
      var b = ix + gridX1 * (iy + 1);
      var c = ix + 1 + gridX1 * (iy + 1);
      var d = ix + 1 + gridX1 * iy;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }
  this.setIndex(indices);
  this.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_2__core_BufferAttribute_js__['b'](vertices, 3));
  this.addAttribute('normal', new __WEBPACK_IMPORTED_MODULE_2__core_BufferAttribute_js__['b'](normals, 3));
  this.addAttribute('uv', new __WEBPACK_IMPORTED_MODULE_2__core_BufferAttribute_js__['b'](uvs, 2));
}
PlaneBufferGeometry.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_1__core_BufferGeometry_js__['a'].prototype);
PlaneBufferGeometry.prototype.constructor = PlaneBufferGeometry;