'use strict';
require.d(exports, 'a', function () {
  return PointMaterial;
});
var __WEBPACK_IMPORTED_MODULE_0__core_three__ = require('./2');
var __WEBPACK_IMPORTED_MODULE_1__material__ = require('./16');
var __WEBPACK_IMPORTED_MODULE_2__shader_point_frag_glsl__ = require('./309');
var __WEBPACK_IMPORTED_MODULE_2__shader_point_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_2__shader_point_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_3__shader_point_vert_glsl__ = require('./310');
var __WEBPACK_IMPORTED_MODULE_3__shader_point_vert_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_3__shader_point_vert_glsl__);
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
var PointMaterial = function (_Material) {
  _inherits(PointMaterial, _Material);
  _createClass(PointMaterial, [{
      key: 'getDefaultParameters',
      value: function getDefaultParameters() {
        return {
          uniforms: {
            u_opacity: { value: 1 },
            u_stroke: {
              value: [
                1,
                1,
                1,
                1
              ]
            },
            u_strokeWidth: { value: 1 }
          },
          defines: {
            SHAPE: false,
            TEXCOORD_0: false
          }
        };
      }
    }]);
  function PointMaterial(_uniforms, _defines, parameters) {
    var _this;
    _classCallCheck(this, PointMaterial);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(PointMaterial).call(this, parameters));
    var _this$getDefaultParam = _this.getDefaultParameters(), uniforms = _this$getDefaultParam.uniforms, defines = _this$getDefaultParam.defines;
    _this.uniforms = Object.assign(uniforms, _this.setUniform(_uniforms));
    _this.defines = Object.assign(defines, _defines);
    _this.type = 'PointMaterial';
    _this.vertexShader = __WEBPACK_IMPORTED_MODULE_3__shader_point_vert_glsl___default.a;
    _this.fragmentShader = __WEBPACK_IMPORTED_MODULE_2__shader_point_frag_glsl___default.a;
    _this.transparent = true;
    if (!_uniforms.shape) {
      _this.blending = __WEBPACK_IMPORTED_MODULE_0__core_three__['AdditiveBlending'];
    }
    if (_uniforms.u_texture) {
      _this.defines.TEXCOORD_0 = true;
    }
    return _this;
  }
  return PointMaterial;
}(__WEBPACK_IMPORTED_MODULE_1__material__['a']);