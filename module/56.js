'use strict';
require.d(exports, 'a', function () {
  return ArrayCamera;
});
var __WEBPACK_IMPORTED_MODULE_0__PerspectiveCamera_js__ = require('./26');
function ArrayCamera(array) {
  __WEBPACK_IMPORTED_MODULE_0__PerspectiveCamera_js__['a'].call(this);
  this.cameras = array || [];
}
ArrayCamera.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__PerspectiveCamera_js__['a'].prototype), {
  constructor: ArrayCamera,
  isArrayCamera: true
});