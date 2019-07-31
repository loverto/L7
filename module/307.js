'use strict';
require.d(exports, 'a', function () {
  return PointLayer;
});
var __WEBPACK_IMPORTED_MODULE_0__core_layer__ = require('./21');
var __WEBPACK_IMPORTED_MODULE_1__core_three__ = require('./2');
var __WEBPACK_IMPORTED_MODULE_2__geom_buffer_point__ = require('./76');
var __WEBPACK_IMPORTED_MODULE_3__geom_material_pointMaterial__ = require('./308');
var __WEBPACK_IMPORTED_MODULE_4__geom_material_polygonMaterial__ = require('./74');
var __WEBPACK_IMPORTED_MODULE_5__geom_buffer_text__ = require('./311');
var __WEBPACK_IMPORTED_MODULE_6__geom_material_textMaterial__ = require('./312');
var __WEBPACK_IMPORTED_MODULE_7__geom_shader_radar_frag_glsl__ = require('./315');
var __WEBPACK_IMPORTED_MODULE_7__geom_shader_radar_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_7__geom_shader_radar_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_8__geom_shader_warn_frag_glsl__ = require('./316');
var __WEBPACK_IMPORTED_MODULE_8__geom_shader_warn_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_8__geom_shader_warn_frag_glsl__);
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
var PointLayer = function (_Layer) {
  _inherits(PointLayer, _Layer);
  function PointLayer() {
    _classCallCheck(this, PointLayer);
    return _possibleConstructorReturn(this, _getPrototypeOf(PointLayer).apply(this, arguments));
  }
  _createClass(PointLayer, [
    {
      key: 'render',
      value: function render() {
        this.type = 'point';
        this.init();
        if (!this._hasRender) {
          this._prepareRender(this.shapeType);
          this._hasRender = true;
        } else {
          this._initAttrs();
          this._needUpdateFilter || this._needUpdateColor ? this._updateFilter() : null;
        }
        return this;
      }
    },
    {
      key: '_prepareRender',
      value: function _prepareRender() {
        if (this.shapeType === 'text') {
          this._textPoint();
          return;
        }
        var source = this.layerSource;
        var _this$get = this.get('styleOptions'), opacity = _this$get.opacity, strokeWidth = _this$get.strokeWidth, stroke = _this$get.stroke, shape = _this$get.shape;
        this._buffer = new __WEBPACK_IMPORTED_MODULE_2__geom_buffer_point__['a']({
          type: this.shapeType,
          imagePos: this.scene.image.imagePos,
          coordinates: source.geoData,
          properties: this.StyleData
        });
        var geometry = this.geometry = new __WEBPACK_IMPORTED_MODULE_1__core_three__['BufferGeometry']();
        var mtl;
        if (this.shapeType === '2d' || this.shapeType === '3d') {
          mtl = new __WEBPACK_IMPORTED_MODULE_4__geom_material_polygonMaterial__['a']({
            u_opacity: opacity,
            u_zoom: this.scene.getZoom()
          });
          mtl.setDefinesvalue('SHAPE', true);
          if (shape === 'radar') {
            mtl.fragmentShader = __WEBPACK_IMPORTED_MODULE_7__geom_shader_radar_frag_glsl___default.a;
          }
          if (shape === 'warn') {
            mtl.fragmentShader = __WEBPACK_IMPORTED_MODULE_8__geom_shader_warn_frag_glsl___default.a;
          }
        } else {
          mtl = new __WEBPACK_IMPORTED_MODULE_3__geom_material_pointMaterial__['a']({
            u_opacity: opacity,
            u_strokeWidth: strokeWidth,
            u_stroke: stroke,
            shape: this.shapeType || false,
            u_texture: this.scene.image.texture
          }, {
            SHAPE: this.shapeType !== 'image',
            TEXCOORD_0: this.shapeType === 'image'
          });
        }
        var attributes = this._buffer.attributes;
        geometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.vertices, 3));
        geometry.addAttribute('a_color', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.colors, 4));
        geometry.addAttribute('pickingId', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.pickingIds, 1));
        if (this.shapeType === 'image') {
          geometry.addAttribute('uv', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.uvs, 2));
          geometry.addAttribute('a_size', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.sizes, 1));
        } else if (this.shapeType === undefined) {
          geometry.addAttribute('a_size', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.sizes, 1));
        } else {
          geometry.addAttribute('normal', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.normals, 3));
          geometry.addAttribute('a_shape', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.shapePositions, 3));
          geometry.addAttribute('a_size', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.a_size, 3));
          if (shape) {
            geometry.addAttribute('faceUv', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](attributes.faceUv, 2));
          }
        }
        var mesh;
        if (this.shapeType === 'image') {
          mesh = new __WEBPACK_IMPORTED_MODULE_1__core_three__['Points'](geometry, mtl);
        } else if (this.shapeType === undefined) {
          mesh = new __WEBPACK_IMPORTED_MODULE_1__core_three__['Points'](geometry, mtl);
        } else {
          mesh = new __WEBPACK_IMPORTED_MODULE_1__core_three__['Mesh'](geometry, mtl);
        }
        this.add(mesh);
      }
    },
    {
      key: '_textPoint',
      value: function _textPoint() {
        var _this = this;
        var source = this.layerSource;
        var styleOptions = this.get('styleOptions');
        var buffer = new __WEBPACK_IMPORTED_MODULE_5__geom_buffer_text__['a']({
          type: this.shapeType,
          coordinates: source.geoData,
          properties: this.StyleData,
          style: this.get('styleOptions')
        });
        buffer.on('completed', function () {
          var color = styleOptions.color, stroke = styleOptions.stroke;
          var geometry = new __WEBPACK_IMPORTED_MODULE_1__core_three__['BufferGeometry']();
          geometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](buffer.attributes.originPoints, 3));
          geometry.addAttribute('uv', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](buffer.attributes.textureElements, 2));
          geometry.addAttribute('a_txtsize', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](buffer.attributes.textSizes, 2));
          geometry.addAttribute('a_txtOffsets', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](buffer.attributes.textOffsets, 2));
          geometry.addAttribute('a_color', new __WEBPACK_IMPORTED_MODULE_1__core_three__['Float32BufferAttribute'](buffer.attributes.colors, 4));
          var _this$scene$getSize = _this.scene.getSize(), width = _this$scene$getSize.width, height = _this$scene$getSize.height;
          var material = new __WEBPACK_IMPORTED_MODULE_6__geom_material_textMaterial__['a']({
            name: _this.layerId,
            u_texture: buffer.bufferStruct.textTexture,
            u_strokeWidth: 1,
            u_stroke: stroke,
            u_textSize: buffer.bufferStruct.textSize,
            u_gamma: 0.11,
            u_buffer: 0.8,
            u_color: color,
            u_glSize: [
              width,
              height
            ]
          });
          var mesh = new __WEBPACK_IMPORTED_MODULE_1__core_three__['Mesh'](geometry, material);
          _this.add(mesh);
        });
      }
    }
  ]);
  return PointLayer;
}(__WEBPACK_IMPORTED_MODULE_0__core_layer__['a']);