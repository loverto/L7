'use strict';
require.d(exports, 'a', function () {
  return CubeTexture;
});
var __WEBPACK_IMPORTED_MODULE_0__Texture_js__ = require('./10');
var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = require('./3');
function CubeTexture(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
  images = images !== undefined ? images : [];
  mapping = mapping !== undefined ? mapping : __WEBPACK_IMPORTED_MODULE_1__constants_js__['l'];
  __WEBPACK_IMPORTED_MODULE_0__Texture_js__['a'].call(this, images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
  this.flipY = false;
}
CubeTexture.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__Texture_js__['a'].prototype);
CubeTexture.prototype.constructor = CubeTexture;
CubeTexture.prototype.isCubeTexture = true;
Object.defineProperty(CubeTexture.prototype, 'images', {
  get: function () {
    return this.image;
  },
  set: function (value) {
    this.image = value;
  }
});