'use strict';
require.d(exports, 'a', function () {
  return PointBuffer;
});
var __WEBPACK_IMPORTED_MODULE_0__bufferBase__ = require('./17');
var __WEBPACK_IMPORTED_MODULE_1__shape_index__ = require('./29');
var __WEBPACK_IMPORTED_MODULE_2__util__ = require('./1');
var __WEBPACK_IMPORTED_MODULE_2__util___default = require.n(__WEBPACK_IMPORTED_MODULE_2__util__);
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
var PointBuffer = function (_BufferBase) {
  _inherits(PointBuffer, _BufferBase);
  function PointBuffer() {
    _classCallCheck(this, PointBuffer);
    return _possibleConstructorReturn(this, _getPrototypeOf(PointBuffer).apply(this, arguments));
  }
  _createClass(PointBuffer, [
    {
      key: 'geometryBuffer',
      value: function geometryBuffer() {
        var type = this.get('type');
        switch (type) {
        case 'image':
          this._imageBuffer();
          break;
        case '2d':
          this._3dRegularBuffer();
          break;
        case '3d':
          this._3dRegularBuffer();
          break;
        case 'Model':
          this._ModelBuffer();
          break;
        default:
          this._sdfRegularBuffer();
        }
      }
    },
    {
      key: '_imageBuffer',
      value: function _imageBuffer() {
        var coordinates = this.get('coordinates');
        var properties = this.get('properties');
        var imagePos = this.get('imagePos');
        var uv = new Float32Array(properties.length * 2);
        for (var i = 0; i < properties.length; i++) {
          var _imagePos$properties$ = imagePos[properties[i].shape], x = _imagePos$properties$.x, y = _imagePos$properties$.y;
          uv[i * 2] = x;
          uv[i * 2 + 1] = y;
        }
        this.bufferStruct.position = coordinates;
        this.bufferStruct.uv = uv;
        this.bufferStruct.style = properties;
        this.attributes = this._toPointsAttributes(this.bufferStruct);
        this.attributes.uvs = uv;
      }
    },
    {
      key: '_sdfRegularBuffer',
      value: function _sdfRegularBuffer() {
        var coordinates = this.get('coordinates');
        var properties = this.get('properties');
        this.bufferStruct.position = coordinates;
        this.bufferStruct.style = properties;
        this.attributes = this._toPointsAttributes(this.bufferStruct);
      }
    },
    {
      key: '_3dRegularBuffer',
      value: function _3dRegularBuffer() {
        var coordinates = this.get('coordinates');
        var properties = this.get('properties');
        var type = this.get('type');
        var positions = [];
        var shapes = [];
        var sizes = [];
        var uvs = [];
        var positionsIndex = [];
        var indexCount = 0;
        this.bufferStruct.style = properties;
        coordinates.forEach(function (geo, index) {
          var _properties$index = properties[index], size = _properties$index.size, shape = _properties$index.shape;
          var shapeType = 'extrude';
          if (type === '2d' || type === '3d' && size[2] === 0) {
            shapeType = 'fill';
            __WEBPACK_IMPORTED_MODULE_2__util___default.a.isArray(size) || (size = [
              size,
              size,
              0
            ]);
          } else {
            __WEBPACK_IMPORTED_MODULE_2__util___default.a.isArray(size) || (size = [
              size,
              size,
              size
            ]);
          }
          if (__WEBPACK_IMPORTED_MODULE_1__shape_index__['c'][shape] == null) {
            uvs.push(0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0);
            shape = 'square';
          }
          var vert = __WEBPACK_IMPORTED_MODULE_1__shape_index__['c'][shape](shapeType);
          shapes.push(vert.positions);
          positions.push(geo);
          sizes.push(size);
          positionsIndex.push(vert.positionsIndex);
          indexCount += vert.positionsIndex.length;
        });
        this.bufferStruct.indices = positionsIndex;
        this.bufferStruct.position = positions;
        this.bufferStruct.indexCount = indexCount;
        this.bufferStruct.shapes = shapes;
        this.bufferStruct.sizes = sizes;
        this.bufferStruct.faceUv = uvs;
        this.attributes = this._toPointShapeAttributes(this.bufferStruct);
      }
    }
  ]);
  return PointBuffer;
}(__WEBPACK_IMPORTED_MODULE_0__bufferBase__['a']);