'use strict';
require.d(exports, 'a', function () {
  return ImageLoader;
});
var __WEBPACK_IMPORTED_MODULE_0__Cache_js__ = require('./244');
var __WEBPACK_IMPORTED_MODULE_1__LoadingManager_js__ = require('./60');
function ImageLoader(manager) {
  this.manager = manager !== undefined ? manager : __WEBPACK_IMPORTED_MODULE_1__LoadingManager_js__['a'];
}
Object.assign(ImageLoader.prototype, {
  crossOrigin: 'anonymous',
  load: function (url, onLoad, onProgress, onError) {
    if (url === undefined)
      url = '';
    if (this.path !== undefined)
      url = this.path + url;
    url = this.manager.resolveURL(url);
    var scope = this;
    var cached = __WEBPACK_IMPORTED_MODULE_0__Cache_js__['a'].get(url);
    if (cached !== undefined) {
      scope.manager.itemStart(url);
      setTimeout(function () {
        if (onLoad)
          onLoad(cached);
        scope.manager.itemEnd(url);
      }, 0);
      return cached;
    }
    var image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');
    function onImageLoad() {
      image.removeEventListener('load', onImageLoad, false);
      image.removeEventListener('error', onImageError, false);
      __WEBPACK_IMPORTED_MODULE_0__Cache_js__['a'].add(url, this);
      if (onLoad)
        onLoad(this);
      scope.manager.itemEnd(url);
    }
    function onImageError(event) {
      image.removeEventListener('load', onImageLoad, false);
      image.removeEventListener('error', onImageError, false);
      if (onError)
        onError(event);
      scope.manager.itemEnd(url);
      scope.manager.itemError(url);
    }
    image.addEventListener('load', onImageLoad, false);
    image.addEventListener('error', onImageError, false);
    if (url.substr(0, 5) !== 'data:') {
      if (this.crossOrigin !== undefined)
        image.crossOrigin = this.crossOrigin;
    }
    scope.manager.itemStart(url);
    image.src = url;
    return image;
  },
  setCrossOrigin: function (value) {
    this.crossOrigin = value;
    return this;
  },
  setPath: function (value) {
    this.path = value;
    return this;
  }
});