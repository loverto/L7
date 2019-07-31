'use strict';
require.d(exports, 'a', function () {
  return LineDashedMaterial;
});
var __WEBPACK_IMPORTED_MODULE_0__LineBasicMaterial_js__ = require('./58');
function LineDashedMaterial(parameters) {
  __WEBPACK_IMPORTED_MODULE_0__LineBasicMaterial_js__['a'].call(this);
  this.type = 'LineDashedMaterial';
  this.scale = 1;
  this.dashSize = 3;
  this.gapSize = 1;
  this.setValues(parameters);
}
LineDashedMaterial.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__LineBasicMaterial_js__['a'].prototype);
LineDashedMaterial.prototype.constructor = LineDashedMaterial;
LineDashedMaterial.prototype.isLineDashedMaterial = true;
LineDashedMaterial.prototype.copy = function (source) {
  __WEBPACK_IMPORTED_MODULE_0__LineBasicMaterial_js__['a'].prototype.copy.call(this, source);
  this.scale = source.scale;
  this.dashSize = source.dashSize;
  this.gapSize = source.gapSize;
  return this;
};