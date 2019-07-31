'use strict';
require.d(exports, 'a', function () {
  return VideoTexture;
});
var __WEBPACK_IMPORTED_MODULE_0__Texture_js__ = require('./10');
function VideoTexture(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
  __WEBPACK_IMPORTED_MODULE_0__Texture_js__['a'].call(this, video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
  this.generateMipmaps = false;
}
VideoTexture.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__Texture_js__['a'].prototype), {
  constructor: VideoTexture,
  isVideoTexture: true,
  update: function () {
    var video = this.image;
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      this.needsUpdate = true;
    }
  }
});