'use strict';
require.d(exports, 'a', function () {
  return LineBuffer;
});
var __WEBPACK_IMPORTED_MODULE_0__bufferBase__ = require('./17');
var __WEBPACK_IMPORTED_MODULE_1__shape__ = require('./29');
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
var LineBuffer = function (_BufferBase) {
  _inherits(LineBuffer, _BufferBase);
  function LineBuffer() {
    _classCallCheck(this, LineBuffer);
    return _possibleConstructorReturn(this, _getPrototypeOf(LineBuffer).apply(this, arguments));
  }
  _createClass(LineBuffer, [
    {
      key: 'geometryBuffer',
      value: function geometryBuffer() {
        var _this = this;
        var coordinates = this.get('coordinates');
        var properties = this.get('properties');
        var shapeType = this.shapeType = this.get('shapeType');
        var positions = [];
        var positionsIndex = [];
        var instances = [];
        if (shapeType === 'line') {
          this.attributes = this._getMeshLineAttributes();
          return;
        } else if (shapeType === 'arc') {
          this.attributes = this._getArcLineAttributes();
          return;
        }
        coordinates.forEach(function (geo, index) {
          var props = properties[index];
          var attrData = _this._getShape(geo, props, index);
          positions.push.apply(positions, _toConsumableArray(attrData.positions));
          positionsIndex.push.apply(positionsIndex, _toConsumableArray(attrData.indexes));
          if (attrData.hasOwnProperty('instances')) {
            instances.push.apply(instances, _toConsumableArray(attrData.instances));
          }
        });
        this.bufferStruct.style = properties;
        this.bufferStruct.verts = positions;
        this.bufferStruct.indexs = positionsIndex;
        if (instances.length > 0) {
          this.bufferStruct.instances = instances;
        }
        this.attributes = this._toAttributes(this.bufferStruct);
      }
    },
    {
      key: '_getShape',
      value: function _getShape(geo, props, index) {
        if (!this.shapeType) {
          return __WEBPACK_IMPORTED_MODULE_1__shape__['a'].defaultLine(geo, index);
        }
        var shape = this.shapeType;
        if (shape === 'meshLine') {
          return __WEBPACK_IMPORTED_MODULE_1__shape__['a'][shape](geo, props, index);
        } else if (shape === 'tubeLine') {
          return __WEBPACK_IMPORTED_MODULE_1__shape__['a'][shape](geo, props, index);
        } else if (shape === 'arc') {
          return __WEBPACK_IMPORTED_MODULE_1__shape__['a'][shape](geo, props, index);
        }
        return __WEBPACK_IMPORTED_MODULE_1__shape__['a'].Line(geo, props, index);
      }
    },
    {
      key: '_getArcLineAttributes',
      value: function _getArcLineAttributes() {
        var _this2 = this;
        var coordinates = this.get('coordinates');
        var properties = this.get('properties');
        var positions = [];
        var colors = [];
        var indexArray = [];
        var sizes = [];
        var instances = [];
        coordinates.forEach(function (geo, index) {
          var props = properties[index];
          var positionCount = positions.length / 3;
          var attrData = _this2._getShape(geo, props, positionCount);
          positions.push.apply(positions, _toConsumableArray(attrData.positions));
          colors.push.apply(colors, _toConsumableArray(attrData.colors));
          indexArray.push.apply(indexArray, _toConsumableArray(attrData.indexArray));
          instances.push.apply(instances, _toConsumableArray(attrData.instances));
          sizes.push.apply(sizes, _toConsumableArray(attrData.sizes));
        });
        return {
          positions: positions,
          colors: colors,
          indexArray: indexArray,
          sizes: sizes,
          instances: instances
        };
      }
    },
    {
      key: '_getMeshLineAttributes',
      value: function _getMeshLineAttributes() {
        var coordinates = this.get('coordinates');
        var properties = this.get('properties');
        var _this$get = this.get('style'), lineType = _this$get.lineType;
        var positions = [];
        var pickingIds = [];
        var normal = [];
        var miter = [];
        var colors = [];
        var indexArray = [];
        var sizes = [];
        var attrDistance = [];
        coordinates.forEach(function (geo, index) {
          var props = properties[index];
          var positionCount = positions.length / 3;
          var attr = __WEBPACK_IMPORTED_MODULE_1__shape__['a'].Line(geo, props, positionCount, lineType !== 'soild');
          positions.push.apply(positions, _toConsumableArray(attr.positions));
          normal.push.apply(normal, _toConsumableArray(attr.normal));
          miter.push.apply(miter, _toConsumableArray(attr.miter));
          colors.push.apply(colors, _toConsumableArray(attr.colors));
          indexArray.push.apply(indexArray, _toConsumableArray(attr.indexArray));
          sizes.push.apply(sizes, _toConsumableArray(attr.sizes));
          attrDistance.push.apply(attrDistance, _toConsumableArray(attr.attrDistance));
          pickingIds.push.apply(pickingIds, _toConsumableArray(attr.pickingIds));
        });
        return {
          positions: positions,
          normal: normal,
          miter: miter,
          colors: colors,
          indexArray: indexArray,
          pickingIds: pickingIds,
          sizes: sizes,
          attrDistance: attrDistance
        };
      }
    },
    {
      key: '_toAttributes',
      value: function _toAttributes(bufferStruct) {
        var vertCount = bufferStruct.verts.length;
        var vertices = new Float32Array(vertCount * 3);
        var inposs = new Float32Array(vertCount * 4);
        var colors = new Float32Array(vertCount * 4);
        for (var i = 0; i < vertCount; i++) {
          var index = bufferStruct.indexs[i];
          var color = bufferStruct.style[index].color;
          vertices[i * 3] = bufferStruct.verts[i][0];
          vertices[i * 3 + 1] = bufferStruct.verts[i][1];
          vertices[i * 3 + 2] = bufferStruct.verts[i][2];
          colors[i * 4] = color[0];
          colors[i * 4 + 1] = color[1];
          colors[i * 4 + 2] = color[2];
          colors[i * 4 + 3] = color[3];
          if (bufferStruct.instances) {
            inposs[i * 4] = bufferStruct.instances[i][0];
            inposs[i * 4 + 1] = bufferStruct.instances[i][1];
            inposs[i * 4 + 2] = bufferStruct.instances[i][2];
            inposs[i * 4 + 3] = bufferStruct.instances[i][3];
          }
        }
        return {
          vertices: vertices,
          colors: colors,
          inposs: inposs
        };
      }
    }
  ]);
  return LineBuffer;
}(__WEBPACK_IMPORTED_MODULE_0__bufferBase__['a']);