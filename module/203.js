'use strict';
require.d(exports, 'a', function () {
  return BoxBufferGeometry;
});
var __WEBPACK_IMPORTED_MODULE_0__core_Geometry_js__ = require('./47');
var __WEBPACK_IMPORTED_MODULE_1__core_BufferGeometry_js__ = require('./14');
var __WEBPACK_IMPORTED_MODULE_2__core_BufferAttribute_js__ = require('./15');
var __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__ = require('./0');
function BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
  __WEBPACK_IMPORTED_MODULE_0__core_Geometry_js__['a'].call(this);
  this.type = 'BoxGeometry';
  this.parameters = {
    width: width,
    height: height,
    depth: depth,
    widthSegments: widthSegments,
    heightSegments: heightSegments,
    depthSegments: depthSegments
  };
  this.fromBufferGeometry(new BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments));
  this.mergeVertices();
}
BoxGeometry.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__core_Geometry_js__['a'].prototype);
BoxGeometry.prototype.constructor = BoxGeometry;
function BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
  __WEBPACK_IMPORTED_MODULE_1__core_BufferGeometry_js__['a'].call(this);
  this.type = 'BoxBufferGeometry';
  this.parameters = {
    width: width,
    height: height,
    depth: depth,
    widthSegments: widthSegments,
    heightSegments: heightSegments,
    depthSegments: depthSegments
  };
  var scope = this;
  width = width || 1;
  height = height || 1;
  depth = depth || 1;
  widthSegments = Math.floor(widthSegments) || 1;
  heightSegments = Math.floor(heightSegments) || 1;
  depthSegments = Math.floor(depthSegments) || 1;
  var indices = [];
  var vertices = [];
  var normals = [];
  var uvs = [];
  var numberOfVertices = 0;
  var groupStart = 0;
  buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0);
  buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1);
  buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2);
  buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3);
  buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4);
  buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5);
  this.setIndex(indices);
  this.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_2__core_BufferAttribute_js__['b'](vertices, 3));
  this.addAttribute('normal', new __WEBPACK_IMPORTED_MODULE_2__core_BufferAttribute_js__['b'](normals, 3));
  this.addAttribute('uv', new __WEBPACK_IMPORTED_MODULE_2__core_BufferAttribute_js__['b'](uvs, 2));
  function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
    var segmentWidth = width / gridX;
    var segmentHeight = height / gridY;
    var widthHalf = width / 2;
    var heightHalf = height / 2;
    var depthHalf = depth / 2;
    var gridX1 = gridX + 1;
    var gridY1 = gridY + 1;
    var vertexCounter = 0;
    var groupCount = 0;
    var ix, iy;
    var vector = new __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__['a']();
    for (iy = 0; iy < gridY1; iy++) {
      var y = iy * segmentHeight - heightHalf;
      for (ix = 0; ix < gridX1; ix++) {
        var x = ix * segmentWidth - widthHalf;
        vector[u] = x * udir;
        vector[v] = y * vdir;
        vector[w] = depthHalf;
        vertices.push(vector.x, vector.y, vector.z);
        vector[u] = 0;
        vector[v] = 0;
        vector[w] = depth > 0 ? 1 : -1;
        normals.push(vector.x, vector.y, vector.z);
        uvs.push(ix / gridX);
        uvs.push(1 - iy / gridY);
        vertexCounter += 1;
      }
    }
    for (iy = 0; iy < gridY; iy++) {
      for (ix = 0; ix < gridX; ix++) {
        var a = numberOfVertices + ix + gridX1 * iy;
        var b = numberOfVertices + ix + gridX1 * (iy + 1);
        var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
        var d = numberOfVertices + (ix + 1) + gridX1 * iy;
        indices.push(a, b, d);
        indices.push(b, c, d);
        groupCount += 6;
      }
    }
    scope.addGroup(groupStart, groupCount, materialIndex);
    groupStart += groupCount;
    numberOfVertices += vertexCounter;
  }
}
BoxBufferGeometry.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_1__core_BufferGeometry_js__['a'].prototype);
BoxBufferGeometry.prototype.constructor = BoxBufferGeometry;