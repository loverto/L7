'use strict';
require.d(exports, 'a', function () {
  return PolygonLayer;
});
var __WEBPACK_IMPORTED_MODULE_0__core_three__ = require('./three');
var __WEBPACK_IMPORTED_MODULE_1__core_layer__ = require('./21');
var __WEBPACK_IMPORTED_MODULE_2__geom_buffer_polygon__ = require('./71');
var __WEBPACK_IMPORTED_MODULE_3__geom_material_polygonMaterial__ = require('./74');
var __WEBPACK_IMPORTED_MODULE_4__geom_material_lineMaterial__ = require('./75');
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
var PolygonLayer = function (_Layer) {
  _inherits(PolygonLayer, _Layer);
  function PolygonLayer() {
    _classCallCheck(this, PolygonLayer);
    return _possibleConstructorReturn(this, _getPrototypeOf(PolygonLayer).apply(this, arguments));
  }
  _createClass(PolygonLayer, [
    {
      key: 'shape',
      value: function shape(type) {
        this.shape = type;
        return this;
      }
    },
    {
      key: 'render',
      value: function render() {
        if (!this._hasRender) {
          this._hasRender = true;
          this._prepareRender();
        } else {
          this._initAttrs();
          this._needUpdateFilter || this._needUpdateColor ? this._updateFilter() : null;
          var _this$get = this.get('styleOptions'), opacity = _this$get.opacity, baseColor = _this$get.baseColor, brightColor = _this$get.brightColor, windowColor = _this$get.windowColor;
          this.layerMesh.material.upDateUninform({
            u_opacity: opacity,
            u_baseColor: baseColor,
            u_brightColor: brightColor,
            u_windowColor: windowColor
          });
        }
        return this;
      }
    },
    {
      key: '_prepareRender',
      value: function _prepareRender() {
        this.init();
        this.type = 'polygon';
        var source = this.layerSource;
        this._buffer = new __WEBPACK_IMPORTED_MODULE_2__geom_buffer_polygon__['a']({
          shape: this.shape,
          coordinates: source.geoData,
          properties: this.StyleData
        });
        var attributes = this._buffer.attributes;
        this.geometry = new __WEBPACK_IMPORTED_MODULE_0__core_three__['BufferGeometry']();
        this.geometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_0__core_three__['Float32BufferAttribute'](attributes.vertices, 3));
        this.geometry.addAttribute('a_color', new __WEBPACK_IMPORTED_MODULE_0__core_three__['Float32BufferAttribute'](attributes.colors, 4));
        this.geometry.addAttribute('pickingId', new __WEBPACK_IMPORTED_MODULE_0__core_three__['Float32BufferAttribute'](attributes.pickingIds, 1));
        if (this.shape === 'line') {
          this._renderLine();
        } else {
          this._renderPolygon();
        }
      }
    },
    {
      key: '_renderLine',
      value: function _renderLine() {
        var _this$get2 = this.get('styleOptions'), opacity = _this$get2.opacity;
        var lineMaterial = new __WEBPACK_IMPORTED_MODULE_4__geom_material_lineMaterial__['c']({ u_opacity: opacity });
        var polygonLine = new __WEBPACK_IMPORTED_MODULE_0__core_three__['LineSegments'](this.geometry, lineMaterial);
        this.add(polygonLine);
      }
    },
    {
      key: '_renderPolygon',
      value: function _renderPolygon() {
        var animateOptions = this.get('animateOptions');
        var _this$get3 = this.get('styleOptions'), opacity = _this$get3.opacity, baseColor = _this$get3.baseColor, brightColor = _this$get3.brightColor, windowColor = _this$get3.windowColor;
        var camera = this.map.getCameraState();
        var material = new __WEBPACK_IMPORTED_MODULE_3__geom_material_polygonMaterial__['a']({
          u_opacity: opacity,
          u_baseColor: baseColor,
          u_brightColor: brightColor,
          u_windowColor: windowColor,
          u_near: camera.near,
          u_far: camera.far
        });
        var attributes = this._buffer.attributes;
        this.geometry.addAttribute('normal', new __WEBPACK_IMPORTED_MODULE_0__core_three__['Float32BufferAttribute'](attributes.normals, 3));
        if (animateOptions.enable) {
          material.setDefinesvalue('ANIMATE', true);
          this.geometry.addAttribute('faceUv', new __WEBPACK_IMPORTED_MODULE_0__core_three__['Float32BufferAttribute'](attributes.faceUv, 2));
          this.geometry.addAttribute('a_size', new __WEBPACK_IMPORTED_MODULE_0__core_three__['Float32BufferAttribute'](attributes.sizes, 1));
        }
        var polygonMesh = new __WEBPACK_IMPORTED_MODULE_0__core_three__['Mesh'](this.geometry, material);
        this.add(polygonMesh);
      }
    },
    {
      key: 'update',
      value: function update() {
        this.updateFilter(this.StyleData);
      }
    }
  ]);
  return PolygonLayer;
}(__WEBPACK_IMPORTED_MODULE_1__core_layer__['a']);
