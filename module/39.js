'use strict';
require.d(exports, 'a', function () {
  return DataTexture;
});
var __WEBPACK_IMPORTED_MODULE_0__Texture_js__ = require('./10');
var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = require('./3');
function DataTexture(data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding) {
  __WEBPACK_IMPORTED_MODULE_0__Texture_js__['a'].call(this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
  this.image = {
    data: data,
    width: width,
    height: height
  };
  this.magFilter = magFilter !== undefined ? magFilter : __WEBPACK_IMPORTED_MODULE_1__constants_js__['_10'];
  this.minFilter = minFilter !== undefined ? minFilter : __WEBPACK_IMPORTED_MODULE_1__constants_js__['_10'];
  this.generateMipmaps = false;
  this.flipY = false;
  this.unpackAlignment = 1;
}
DataTexture.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__Texture_js__['a'].prototype);
DataTexture.prototype.constructor = DataTexture;
DataTexture.prototype.isDataTexture = true;