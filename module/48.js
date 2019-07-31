'use strict';
require.d(exports, 'a', function () {
  return Face3;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Color_js__ = require('./7');
var __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__ = require('./0');
function Face3(a, b, c, normal, color, materialIndex) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.normal = normal && normal.isVector3 ? normal : new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
  this.vertexNormals = Array.isArray(normal) ? normal : [];
  this.color = color && color.isColor ? color : new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a']();
  this.vertexColors = Array.isArray(color) ? color : [];
  this.materialIndex = materialIndex !== undefined ? materialIndex : 0;
}
Object.assign(Face3.prototype, {
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (source) {
    this.a = source.a;
    this.b = source.b;
    this.c = source.c;
    this.normal.copy(source.normal);
    this.color.copy(source.color);
    this.materialIndex = source.materialIndex;
    for (var i = 0, il = source.vertexNormals.length; i < il; i++) {
      this.vertexNormals[i] = source.vertexNormals[i].clone();
    }
    for (var i = 0, il = source.vertexColors.length; i < il; i++) {
      this.vertexColors[i] = source.vertexColors[i].clone();
    }
    return this;
  }
});