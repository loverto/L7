'use strict';
require.d(exports, 'a', function () {
  return WebGLRenderTarget;
});
var __WEBPACK_IMPORTED_MODULE_0__core_EventDispatcher_js__ = require('./18');
var __WEBPACK_IMPORTED_MODULE_1__textures_Texture_js__ = require('./10');
var __WEBPACK_IMPORTED_MODULE_2__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_3__math_Vector4_js__ = require('./11');
function WebGLRenderTarget(width, height, options) {
  this.width = width;
  this.height = height;
  this.scissor = new __WEBPACK_IMPORTED_MODULE_3__math_Vector4_js__['a'](0, 0, width, height);
  this.scissorTest = false;
  this.viewport = new __WEBPACK_IMPORTED_MODULE_3__math_Vector4_js__['a'](0, 0, width, height);
  options = options || {};
  if (options.minFilter === undefined)
    options.minFilter = __WEBPACK_IMPORTED_MODULE_2__constants_js__['T'];
  this.texture = new __WEBPACK_IMPORTED_MODULE_1__textures_Texture_js__['a'](undefined, undefined, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);
  this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : true;
  this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
  this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;
  this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;
}
WebGLRenderTarget.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__core_EventDispatcher_js__['a'].prototype), {
  constructor: WebGLRenderTarget,
  isWebGLRenderTarget: true,
  setSize: function (width, height) {
    if (this.width !== width || this.height !== height) {
      this.width = width;
      this.height = height;
      this.dispose();
    }
    this.viewport.set(0, 0, width, height);
    this.scissor.set(0, 0, width, height);
  },
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (source) {
    this.width = source.width;
    this.height = source.height;
    this.viewport.copy(source.viewport);
    this.texture = source.texture.clone();
    this.depthBuffer = source.depthBuffer;
    this.stencilBuffer = source.stencilBuffer;
    this.depthTexture = source.depthTexture;
    return this;
  },
  dispose: function () {
    this.dispatchEvent({ type: 'dispose' });
  }
});