'use strict';
require.d(exports, 'a', function () {
  return Camera;
});
var __WEBPACK_IMPORTED_MODULE_0__three__ = require('./2');
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
var Camera = function () {
  function Camera(container) {
    _classCallCheck(this, Camera);
    this.container = container;
    var camera = new __WEBPACK_IMPORTED_MODULE_0__three__['PerspectiveCamera'](45, 1, 1, 2000000);
    this.camera = camera;
    this.updateSize();
    window.addEventListener('resize', this.updateSize.bind(this));
  }
  _createClass(Camera, [{
      key: 'updateSize',
      value: function updateSize() {
        var container = this.container;
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
      }
    }]);
  return Camera;
}();