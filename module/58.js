'use strict';
require.d(exports, 'a', function () {
  return LineBasicMaterial;
});
var __WEBPACK_IMPORTED_MODULE_0__Material_js__ = require('./19');
var __WEBPACK_IMPORTED_MODULE_1__math_Color_js__ = require('./7');
function LineBasicMaterial(parameters) {
  __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].call(this);
  this.type = 'LineBasicMaterial';
  this.color = new __WEBPACK_IMPORTED_MODULE_1__math_Color_js__['a'](16777215);
  this.linewidth = 1;
  this.linecap = 'round';
  this.linejoin = 'round';
  this.lights = false;
  this.setValues(parameters);
}
LineBasicMaterial.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype);
LineBasicMaterial.prototype.constructor = LineBasicMaterial;
LineBasicMaterial.prototype.isLineBasicMaterial = true;
LineBasicMaterial.prototype.copy = function (source) {
  __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype.copy.call(this, source);
  this.color.copy(source.color);
  this.linewidth = source.linewidth;
  this.linecap = source.linecap;
  this.linejoin = source.linejoin;
  return this;
};