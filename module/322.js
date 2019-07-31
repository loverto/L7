'use strict';
require.d(exports, 'a', function () {
  return ImageBuffer;
});
var __WEBPACK_IMPORTED_MODULE_0__bufferBase__ = require('./BufferBase');
var __WEBPACK_IMPORTED_MODULE_1__util__ = require('./1');
var __WEBPACK_IMPORTED_MODULE_1__util___default = require.n(__WEBPACK_IMPORTED_MODULE_1__util__);
var __WEBPACK_IMPORTED_MODULE_2__core_three__ = require('./three');
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
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]')
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
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
var ImageBuffer = function (_BufferBase) {
  _inherits(ImageBuffer, _BufferBase);
  function ImageBuffer() {
    _classCallCheck(this, ImageBuffer);
    return _possibleConstructorReturn(this, _getPrototypeOf(ImageBuffer).apply(this, arguments));
  }
  _createClass(ImageBuffer, [
    {
      key: 'geometryBuffer',
      value: function geometryBuffer() {
        var _this = this;
        var coordinates = this.get('coordinates');
        var images = this.get('image');
        var positions = _toConsumableArray(coordinates[0]).concat([
          coordinates[1][0],
          coordinates[0][1],
          0
        ], _toConsumableArray(coordinates[1]), _toConsumableArray(coordinates[0]), _toConsumableArray(coordinates[1]), [
          coordinates[0][0],
          coordinates[1][1],
          0
        ]);
        var image = images;
        if (__WEBPACK_IMPORTED_MODULE_1__util___default.a.isArray(images)) {
          image = images[0];
          var textures = images.map(function (img) {
            return _this._getTexture(img);
          });
          this.u_rasters = textures;
        }
        var uv = [
          0,
          1,
          1,
          1,
          1,
          0,
          0,
          1,
          1,
          0,
          0,
          0
        ];
        var texture = new __WEBPACK_IMPORTED_MODULE_2__core_three__['Texture'](image);
        texture.magFilter = __WEBPACK_IMPORTED_MODULE_2__core_three__['LinearFilter'];
        texture.minFilter = __WEBPACK_IMPORTED_MODULE_2__core_three__['LinearFilter'];
        texture.needsUpdate = true;
        var attributes = {
          vertices: new Float32Array(positions),
          uvs: new Float32Array(uv)
        };
        this.attributes = attributes;
        this.texture = texture;
      }
    },
    {
      key: '_getTexture',
      value: function _getTexture(image) {
        var texture = new __WEBPACK_IMPORTED_MODULE_2__core_three__['Texture'](image);
        texture.magFilter = __WEBPACK_IMPORTED_MODULE_2__core_three__['LinearFilter'];
        texture.minFilter = __WEBPACK_IMPORTED_MODULE_2__core_three__['LinearFilter'];
      }
    }
  ]);
  return ImageBuffer;
}(__WEBPACK_IMPORTED_MODULE_0__bufferBase__['a']);
