'use strict';
require.d(exports, 'a', function () {
  return PointsMaterial;
});
var __WEBPACK_IMPORTED_MODULE_0__Material_js__ = require('./19');
var __WEBPACK_IMPORTED_MODULE_1__math_Color_js__ = require('./7');
function PointsMaterial(parameters) {
  __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].call(this);
  this.type = 'PointsMaterial';
  this.color = new __WEBPACK_IMPORTED_MODULE_1__math_Color_js__['a'](16777215);
  this.map = null;
  this.size = 1;
  this.sizeAttenuation = true;
  this.morphTargets = false;
  this.lights = false;
  this.setValues(parameters);
}
PointsMaterial.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype);
PointsMaterial.prototype.constructor = PointsMaterial;
PointsMaterial.prototype.isPointsMaterial = true;
PointsMaterial.prototype.copy = function (source) {
  __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype.copy.call(this, source);
  this.color.copy(source.color);
  this.map = source.map;
  this.size = source.size;
  this.sizeAttenuation = source.sizeAttenuation;
  this.morphTargets = source.morphTargets;
  return this;
};