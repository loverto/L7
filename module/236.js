'use strict';
require.d(exports, 'a', function () {
  return DirectionalLight;
});
var __WEBPACK_IMPORTED_MODULE_0__Light_js__ = require('./59');
var __WEBPACK_IMPORTED_MODULE_1__DirectionalLightShadow_js__ = require('./237');
var __WEBPACK_IMPORTED_MODULE_2__core_Object3D_js__ = require('./5');
function DirectionalLight(color, intensity) {
  __WEBPACK_IMPORTED_MODULE_0__Light_js__['a'].call(this, color, intensity);
  this.type = 'DirectionalLight';
  this.position.copy(__WEBPACK_IMPORTED_MODULE_2__core_Object3D_js__['a'].DefaultUp);
  this.updateMatrix();
  this.target = new __WEBPACK_IMPORTED_MODULE_2__core_Object3D_js__['a']();
  this.shadow = new __WEBPACK_IMPORTED_MODULE_1__DirectionalLightShadow_js__['a']();
}
DirectionalLight.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__Light_js__['a'].prototype), {
  constructor: DirectionalLight,
  isDirectionalLight: true,
  copy: function (source) {
    __WEBPACK_IMPORTED_MODULE_0__Light_js__['a'].prototype.copy.call(this, source);
    this.target = source.target.clone();
    this.shadow = source.shadow.clone();
    return this;
  }
});