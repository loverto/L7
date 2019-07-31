'use strict';
require.d(exports, 'a', function () {
  return AmbientLight;
});
var __WEBPACK_IMPORTED_MODULE_0__Light_js__ = require('./59');
function AmbientLight(color, intensity) {
  __WEBPACK_IMPORTED_MODULE_0__Light_js__['a'].call(this, color, intensity);
  this.type = 'AmbientLight';
  this.castShadow = undefined;
}
AmbientLight.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__Light_js__['a'].prototype), {
  constructor: AmbientLight,
  isAmbientLight: true
});