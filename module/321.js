'use strict';
require.d(exports, 'a', function () {
  return imageLayer;
});
var __WEBPACK_IMPORTED_MODULE_0__core_layer__ = require('./Layer');
var __WEBPACK_IMPORTED_MODULE_1__core_three__ = require('./three');
var __WEBPACK_IMPORTED_MODULE_2__source_imageSource__ = require('./ImageSource');
var __WEBPACK_IMPORTED_MODULE_3__geom_buffer_image__ = require('./322');
var __WEBPACK_IMPORTED_MODULE_4__geom_material_imageMaterial__ = require('./323');
function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
  }
  return _typeof(obj);
}
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
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  }
  return self;
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
var imageLayer = function (_Layer) {
  _inherits(imageLayer, _Layer);
  function imageLayer() {
    _classCallCheck(this, imageLayer);
    return _possibleConstructorReturn(this, _getPrototypeOf(imageLayer).apply(this, arguments));
  }
  _createClass(imageLayer, [
    {
      key: 'source',
      value: function source(data) {
        var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        cfg.mapType = this.get('mapType');
        cfg.data = data;
        this.layerSource = new __WEBPACK_IMPORTED_MODULE_2__source_imageSource__['a'](cfg);
        return this;
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this = this;
        this.init();
        this.type = 'image';
        var source = this.layerSource;
        var _this$get = this.get('styleOptions'), opacity = _this$get.opacity;
        source.on('imageLoaded', function () {
          var buffer = new __WEBPACK_IMPORTED_MODULE_3__geom_buffer_image__['a']({
            coordinates: source.geoData,
            image: source.image
          });
          _this.initGeometry(buffer.attributes);
          var material = new __WEBPACK_IMPORTED_MODULE_4__geom_material_imageMaterial__['a']({
            u_texture: buffer.texture,
            u_opacity: opacity
          });
          var imageMesh = new __WEBPACK_IMPORTED_MODULE_1__core_three__['Mesh'](_this.geometry, material);
          _this.add(imageMesh);
        });
        return this;
      }
    },
    {
      key: 'initGeometry',
      value: function initGeometry(attributes) {
        this.geometry = new __WEBPACK_IMPORTED_MODULE_1__core_three__['BufferGeometry']();
        this.geometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.vertices, 3));
        this.geometry.addAttribute('uv', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.uvs, 2));
      }
    }
  ]);
  return imageLayer;
}(__WEBPACK_IMPORTED_MODULE_0__core_layer__['a']);
