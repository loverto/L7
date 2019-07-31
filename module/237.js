'use strict';
require.d(exports, 'a', function () {
  return DirectionalLightShadow;
});
var __WEBPACK_IMPORTED_MODULE_0__LightShadow_js__ = require('./238');
var __WEBPACK_IMPORTED_MODULE_1__cameras_OrthographicCamera_js__ = require('./45');
function DirectionalLightShadow() {
  __WEBPACK_IMPORTED_MODULE_0__LightShadow_js__['a'].call(this, new __WEBPACK_IMPORTED_MODULE_1__cameras_OrthographicCamera_js__['a'](-5, 5, 5, -5, 0.5, 500));
}
DirectionalLightShadow.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__LightShadow_js__['a'].prototype), { constructor: DirectionalLightShadow });