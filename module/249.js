'use strict';
require.d(exports, 'a', function () {
  return Renderer;
});
var __WEBPACK_IMPORTED_MODULE_0__three__ = require('./three');
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
var Renderer = function () {
  function Renderer(container) {
    _classCallCheck(this, Renderer);
    this.container = container;
    this.initRender();
    this.updateSize();
    window.addEventListener('resize', this.updateSize.bind(this), false);
  }
  _createClass(Renderer, [
    {
      key: 'initRender',
      value: function initRender() {
        this.renderer = new __WEBPACK_IMPORTED_MODULE_0__three__['WebGLRenderer']({
          antialias: true,
          alpha: true
        });
        this.renderer.setClearColor(16711680, 0);
        this.pixelRatio = window.devicePixelRatio;
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
      }
    },
    {
      key: 'updateSize',
      value: function updateSize() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      }
    }
  ]);
  return Renderer;
}();
