'use strict';
require.d(exports, 'a', function () {
  return TextBuffer;
});
var __WEBPACK_IMPORTED_MODULE_0__bufferBase__ = require('./17');
var __WEBPACK_IMPORTED_MODULE_1__util_ajax__ = require('./38');
var __WEBPACK_IMPORTED_MODULE_2__core_three__ = require('./three');
var __WEBPACK_IMPORTED_MODULE_3__global__ = require('./Global');
var __WEBPACK_IMPORTED_MODULE_3__global___default = require.n(__WEBPACK_IMPORTED_MODULE_3__global__);
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
var Space = 1;
var TextBuffer = function (_BufferBase) {
  _inherits(TextBuffer, _BufferBase);
  function TextBuffer() {
    _classCallCheck(this, TextBuffer);
    return _possibleConstructorReturn(this, _getPrototypeOf(TextBuffer).apply(this, arguments));
  }
  _createClass(TextBuffer, [
    {
      key: 'geometryBuffer',
      value: function geometryBuffer() {
        var _this = this;
        this.metrics = {
          buffer: 3,
          family: 'ios9',
          size: 24
        };
        var coordinates = this.get('coordinates');
        var properties = this.get('properties');
        var _this$get = this.get('style'), _this$get$textOffset = _this$get.textOffset, textOffset = _this$get$textOffset === void 0 ? [
            0,
            0
          ] : _this$get$textOffset;
        var chars = [];
        properties.forEach(function (element) {
          var text = element.shape || '';
          text = text.toString();
          for (var j = 0; j < text.length; j++) {
            var code = text.charCodeAt(j);
            if (chars.indexOf(code) === -1) {
              chars.push(text.charCodeAt(j));
            }
          }
        });
        this._loadTextInfo(chars);
        this.on('SourceLoaded', function () {
          var textureElements = [];
          var colors = [];
          var originPoints = [];
          var textSizes = [];
          var textOffsets = [];
          properties.forEach(function (element, index) {
            var size = element.size;
            var pos = coordinates[index];
            var pen = {
              x: textOffset[0],
              y: textOffset[1]
            };
            var text = element.shape || '';
            text = text.toString();
            for (var i = 0; i < text.length; i++) {
              var chr = text.charCodeAt(i);
              var color = element.color;
              _this._drawGlyph(pos, chr, pen, size, colors, textureElements, originPoints, textSizes, textOffsets, color);
            }
          });
          _this.bufferStruct.style = properties;
          _this.attributes = {
            originPoints: originPoints,
            textSizes: textSizes,
            textOffsets: textOffsets,
            colors: colors,
            textureElements: textureElements
          };
          _this.emit('completed');
        });
      }
    },
    {
      key: '_loadTextInfo',
      value: function _loadTextInfo(chars) {
        var _this2 = this;
        Object(__WEBPACK_IMPORTED_MODULE_1__util_ajax__['b'])({ url: ''.concat(__WEBPACK_IMPORTED_MODULE_3__global___default.a.sdfHomeUrl, '/getsdfdata?chars=').concat(chars.join('|')) }, function (e, info) {
          _this2.metrics.chars = info.info;
          _this2._loadTextTexture(info.url);
        });
      }
    },
    {
      key: '_loadTextTexture',
      value: function _loadTextTexture(url) {
        var _this3 = this;
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
          _this3.bufferStruct.textTexture = _this3._creatTexture(img);
          _this3.emit('SourceLoaded');
        };
        img.src = url;
      }
    },
    {
      key: '_drawGlyph',
      value: function _drawGlyph(pos, chr, pen, size, colors, textureElements, originPoints, textSizes, textOffsets, color) {
        var metrics = this.metrics;
        var metric = metrics.chars[chr];
        if (!metric)
          return;
        var scale = size / metrics.size;
        var width = metric[0];
        var height = metric[1];
        var horiBearingX = metric[2];
        var horiBearingY = metric[3];
        var horiAdvance = metric[4];
        var posX = metric[5];
        var posY = metric[6];
        var buffer = metrics.buffer;
        if (width > 0 && height > 0) {
          width += buffer * 2;
          height += buffer * 2;
          var originX = (horiBearingX - buffer + width / 2) * scale;
          var originY = -(height / 2 - horiBearingY) * scale;
          var offsetWidth = width / 2 * scale / (1 - horiBearingX * 1.5 / horiAdvance);
          var offsetHeight = horiAdvance / 2 * scale;
          var offsetX = pen.x;
          var offsetY = pen.y;
          originPoints.push(pos[0] + originX, pos[1] + originY, 0, pos[0] + originX, pos[1] + originY, 0, pos[0] + originX, pos[1] + originY, 0, pos[0] + originX, pos[1] + originY, 0, pos[0] + originX, pos[1] + originY, 0, pos[0] + originX, pos[1] + originY, 0);
          textSizes.push(offsetWidth, offsetHeight, -offsetWidth, offsetHeight, -offsetWidth, -offsetHeight, offsetWidth, offsetHeight, -offsetWidth, -offsetHeight, offsetWidth, -offsetHeight);
          textOffsets.push(offsetX, offsetY, offsetX, offsetY, offsetX, offsetY, offsetX, offsetY, offsetX, offsetY, offsetX, offsetY);
          colors.push.apply(colors, _toConsumableArray(color).concat(_toConsumableArray(color), _toConsumableArray(color), _toConsumableArray(color), _toConsumableArray(color), _toConsumableArray(color)));
          textureElements.push(posX + width, posY, posX, posY, posX, posY + height, posX + width, posY, posX, posY + height, posX + width, posY + height);
        }
        pen.x = pen.x + (horiAdvance + Space) * scale;
      }
    },
    {
      key: '_measureText',
      value: function _measureText(text, size) {
        var dimensions = { advance: 0 };
        var metrics = this.metrics;
        var scale = size / metrics.size;
        for (var i = 0; i < text.length; i++) {
          var code = text.charCodeAt(i);
          var horiAdvance = metrics.chars[code][4];
          dimensions.advance += (horiAdvance + Space) * scale;
        }
        return dimensions;
      }
    },
    {
      key: '_creatTexture',
      value: function _creatTexture(image) {
        this.bufferStruct.textSize = [
          image.width,
          image.height
        ];
        var texture = new __WEBPACK_IMPORTED_MODULE_2__core_three__['Texture'](image);
        texture.minFilter = __WEBPACK_IMPORTED_MODULE_2__core_three__['LinearFilter'];
        texture.magFilter = __WEBPACK_IMPORTED_MODULE_2__core_three__['LinearFilter'];
        texture.needsUpdate = true;
        return texture;
      }
    }
  ]);
  return TextBuffer;
}(__WEBPACK_IMPORTED_MODULE_0__bufferBase__['a']);
