'use strict';
require.d(exports, 'a', function () {
  return TextureLoader;
});
var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_1__ImageLoader_js__ = require('./243');
var __WEBPACK_IMPORTED_MODULE_2__textures_Texture_js__ = require('./10');
var __WEBPACK_IMPORTED_MODULE_3__LoadingManager_js__ = require('./60');
function TextureLoader(manager) {
  this.manager = manager !== undefined ? manager : __WEBPACK_IMPORTED_MODULE_3__LoadingManager_js__['a'];
}
Object.assign(TextureLoader.prototype, {
  crossOrigin: 'anonymous',
  load: function (url, onLoad, onProgress, onError) {
    var texture = new __WEBPACK_IMPORTED_MODULE_2__textures_Texture_js__['a']();
    var loader = new __WEBPACK_IMPORTED_MODULE_1__ImageLoader_js__['a'](this.manager);
    loader.setCrossOrigin(this.crossOrigin);
    loader.setPath(this.path);
    loader.load(url, function (image) {
      texture.image = image;
      var isJPEG = url.search(/\.jpe?g$/i) > 0 || url.search(/^data\:image\/jpeg/) === 0;
      texture.format = isJPEG ? __WEBPACK_IMPORTED_MODULE_0__constants_js__['_52'] : __WEBPACK_IMPORTED_MODULE_0__constants_js__['_29'];
      texture.needsUpdate = true;
      if (onLoad !== undefined) {
        onLoad(texture);
      }
    }, onProgress, onError);
    return texture;
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