'use strict';
require.d(exports, 'a', function () {
  return RasterLayer;
});
var __WEBPACK_IMPORTED_MODULE_0__core_layer__ = require('./21');
var __WEBPACK_IMPORTED_MODULE_1__core_three__ = require('./2');
var __WEBPACK_IMPORTED_MODULE_2__source_rasterSource__ = require('./327');
var __WEBPACK_IMPORTED_MODULE_3__geom_material_rasterMaterial__ = require('./328');
var __WEBPACK_IMPORTED_MODULE_4__geom_buffer_raster__ = require('./331');
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
var RasterLayer = function (_Layer) {
  _inherits(RasterLayer, _Layer);
  function RasterLayer() {
    _classCallCheck(this, RasterLayer);
    return _possibleConstructorReturn(this, _getPrototypeOf(RasterLayer).apply(this, arguments));
  }
  _createClass(RasterLayer, [
    {
      key: 'source',
      value: function source(data) {
        var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        cfg.mapType = this.get('mapType');
        cfg.data = data;
        this.layerSource = new __WEBPACK_IMPORTED_MODULE_2__source_rasterSource__['a'](cfg);
        return this;
      }
    },
    {
      key: 'render',
      value: function render() {
        this.type = 'raster';
        this.init();
        var source = this.layerSource;
        var styleOptions = this.get('styleOptions');
        var buffer = new __WEBPACK_IMPORTED_MODULE_4__geom_buffer_raster__['a']({
          coordinates: source.geoData,
          raster: source.rasterData,
          rampColors: styleOptions.rampColors
        });
        this.initGeometry(buffer.attributes);
        var material = new __WEBPACK_IMPORTED_MODULE_3__geom_material_rasterMaterial__['a']({
          u_texture: buffer.bufferStruct.u_raster,
          u_colorTexture: buffer.bufferStruct.u_colorTexture,
          u_opacity: 1,
          u_extent: buffer.bufferStruct.u_extent,
          u_min: source.rasterData.min,
          u_max: source.rasterData.max,
          u_dimension: buffer.attributes.dimension
        });
        var rasterMesh = new __WEBPACK_IMPORTED_MODULE_1__core_three__['Mesh'](this.geometry, material);
        this.add(rasterMesh);
        return this;
      }
    },
    {
      key: 'animateFunc',
      value: function animateFunc() {
        var _this = this;
        var animateOptions = this.get('animateOptions');
        this.material.setValue('u_bands', this.animateData.index % 3);
        this.material.setValue('u_texture', this.animateData.rasters[Math.floor(this.animateData.index / 3) % 8]);
        this.animateData.index++;
        if (animateOptions) {
          animateOptions(this.animateData.index);
        }
        setTimeout(function () {
          _this.animateId = requestAnimationFrame(_this.animateFunc.bind(_this));
        }, 500);
      }
    },
    {
      key: 'cancelAnimate',
      value: function cancelAnimate() {
        window.cancelAnimationFrame(this.animateId);
      }
    },
    {
      key: 'initGeometry',
      value: function initGeometry(attributes) {
        this.geometry = new __WEBPACK_IMPORTED_MODULE_1__core_three__['BufferGeometry']();
        this.geometry.setIndex(attributes.indices);
        this.geometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.vertices, 3));
        this.geometry.addAttribute('uv', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.uvs, 2));
      }
    }
  ]);
  return RasterLayer;
}(__WEBPACK_IMPORTED_MODULE_0__core_layer__['a']);