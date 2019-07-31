'use strict';
require.d(exports, 'a', function () {
  return LineSegments;
});
var __WEBPACK_IMPORTED_MODULE_0__Line_js__ = require('./34');
var __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_2__core_BufferAttribute_js__ = require('./15');
function LineSegments(geometry, material) {
  __WEBPACK_IMPORTED_MODULE_0__Line_js__['a'].call(this, geometry, material);
  this.type = 'LineSegments';
}
LineSegments.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__Line_js__['a'].prototype), {
  constructor: LineSegments,
  isLineSegments: true,
  computeLineDistances: function () {
    var start = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
    var end = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
    return function computeLineDistances() {
      var geometry = this.geometry;
      if (geometry.isBufferGeometry) {
        if (geometry.index === null) {
          var positionAttribute = geometry.attributes.position;
          var lineDistances = [];
          for (var i = 0, l = positionAttribute.count; i < l; i += 2) {
            start.fromBufferAttribute(positionAttribute, i);
            end.fromBufferAttribute(positionAttribute, i + 1);
            lineDistances[i] = i === 0 ? 0 : lineDistances[i - 1];
            lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);
          }
          geometry.addAttribute('lineDistance', new __WEBPACK_IMPORTED_MODULE_2__core_BufferAttribute_js__['b'](lineDistances, 1));
        } else {
          console.warn('THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.');
        }
      } else if (geometry.isGeometry) {
        var vertices = geometry.vertices;
        var lineDistances = geometry.lineDistances;
        for (var i = 0, l = vertices.length; i < l; i += 2) {
          start.copy(vertices[i]);
          end.copy(vertices[i + 1]);
          lineDistances[i] = i === 0 ? 0 : lineDistances[i - 1];
          lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);
        }
      }
      return this;
    };
  }()
});