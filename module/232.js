'use strict';
require.d(exports, 'a', function () {
  return CanvasTexture;
});
var __WEBPACK_IMPORTED_MODULE_0__Texture_js__ = require('./10');
function CanvasTexture(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
  __WEBPACK_IMPORTED_MODULE_0__Texture_js__['a'].call(this, canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
  this.needsUpdate = true;
}
CanvasTexture.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__Texture_js__['a'].prototype);
CanvasTexture.prototype.constructor = CanvasTexture;
CanvasTexture.prototype.isCanvasTexture = true;