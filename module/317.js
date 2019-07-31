'use strict';
require.d(exports, 'a', function () {
  return LineLayer;
});
var __WEBPACK_IMPORTED_MODULE_0__core_layer__ = require('./21');
var __WEBPACK_IMPORTED_MODULE_1__core_three__ = require('./three');
var __WEBPACK_IMPORTED_MODULE_2__geom_buffer_index__ = require('./318');
var __WEBPACK_IMPORTED_MODULE_3__geom_material_lineMaterial__ = require('./75');
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
var LineLayer = function (_Layer) {
  _inherits(LineLayer, _Layer);
  function LineLayer() {
    _classCallCheck(this, LineLayer);
    return _possibleConstructorReturn(this, _getPrototypeOf(LineLayer).apply(this, arguments));
  }
  _createClass(LineLayer, [
    {
      key: 'shape',
      value: function shape(type) {
        this.shapeType = type;
        return this;
      }
    },
    {
      key: 'render',
      value: function render() {
        this.type = 'polyline';
        this.init();
        var source = this.layerSource;
        var StyleData = this.StyleData;
        var style = this.get('styleOptions');
        var buffer = this._buffer = new __WEBPACK_IMPORTED_MODULE_2__geom_buffer_index__['a']({
          coordinates: source.geoData,
          properties: StyleData,
          shapeType: this.shapeType,
          style: style
        });
        var _this$get = this.get('styleOptions'), opacity = _this$get.opacity;
        var animateOptions = this.get('animateOptions');
        var geometry = new __WEBPACK_IMPORTED_MODULE_1__core_three__['BufferGeometry']();
        var attributes = buffer.attributes;
        if (this.shapeType === 'arc') {
          geometry.setIndex(attributes.indexArray);
          geometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.positions, 3));
          geometry.addAttribute('a_color', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.colors, 4));
          geometry.addAttribute('a_instance', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.instances, 4));
          geometry.addAttribute('a_size', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.sizes, 1));
          var material = new __WEBPACK_IMPORTED_MODULE_3__geom_material_lineMaterial__['a']({
            u_opacity: opacity,
            u_zoom: this.scene.getZoom()
          });
          var mesh = new __WEBPACK_IMPORTED_MODULE_1__core_three__['Mesh'](geometry, material);
          this.add(mesh);
        } else if (this.shapeType === 'line') {
          geometry.setIndex(attributes.indexArray);
          geometry.addAttribute('pickingId', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.pickingIds, 1));
          geometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.positions, 3));
          geometry.addAttribute('a_color', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.colors, 4));
          geometry.addAttribute('a_size', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.sizes, 1));
          geometry.addAttribute('normal', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.normal, 3));
          geometry.addAttribute('a_miter', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.miter, 1));
          var lineType = style.lineType;
          var _material;
          if (lineType !== 'dash') {
            _material = new __WEBPACK_IMPORTED_MODULE_3__geom_material_lineMaterial__['d']({
              u_opacity: opacity,
              u_zoom: this.scene.getZoom()
            });
          } else {
            geometry.addAttribute('a_distance', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.attrDistance, 1));
            _material = new __WEBPACK_IMPORTED_MODULE_3__geom_material_lineMaterial__['b']({
              u_opacity: opacity,
              u_zoom: this.scene.getZoom()
            });
          }
          var _mesh = new __WEBPACK_IMPORTED_MODULE_1__core_three__['Mesh'](geometry, _material);
          this.add(_mesh);
        } else {
          geometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.vertices, 3));
          geometry.addAttribute('a_color', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.colors, 4));
          var _material2 = new __WEBPACK_IMPORTED_MODULE_3__geom_material_lineMaterial__['c']({
            u_opacity: opacity,
            u_time: 0
          });
          if (animateOptions.enable) {
            _material2.setDefinesvalue('ANIMATE', true);
          }
          var _mesh2 = new __WEBPACK_IMPORTED_MODULE_1__core_three__['LineSegments'](geometry, _material2);
          this.add(_mesh2);
        }
        return this;
      }
    }
  ]);
  return LineLayer;
}(__WEBPACK_IMPORTED_MODULE_0__core_layer__['a']);
