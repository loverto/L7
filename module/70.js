'use strict';
require.d(exports, 'a', function () {
  return ImageSource;
});
var __WEBPACK_IMPORTED_MODULE_0__core_source__ = require('./23');
var __WEBPACK_IMPORTED_MODULE_1__util_ajax__ = require('./38');
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
var ImageSource = function (_Source) {
  _inherits(ImageSource, _Source);
  function ImageSource() {
    _classCallCheck(this, ImageSource);
    return _possibleConstructorReturn(this, _getPrototypeOf(ImageSource).apply(this, arguments));
  }
  _createClass(ImageSource, [
    {
      key: 'prepareData',
      value: function prepareData() {
        this.type = 'image';
        var extent = this.get('extent');
        var lb = this._coorConvert(extent.slice(0, 2));
        var tr = this._coorConvert(extent.slice(2, 4));
        this.geoData = [
          lb,
          tr
        ];
        this.propertiesData = [];
        this._loadData();
      }
    },
    {
      key: '_loadData',
      value: function _loadData() {
        var _this = this;
        var url = this.get('data');
        this.image = [];
        if (typeof url === 'string') {
          Object(__WEBPACK_IMPORTED_MODULE_1__util_ajax__['a'])({ url: url }, function (err, img) {
            _this.image = img;
            _this.emit('imageLoaded');
          });
        } else {
          var imageCount = url.length;
          var imageindex = 0;
          url.forEach(function (item) {
            Object(__WEBPACK_IMPORTED_MODULE_1__util_ajax__['a'])({ url: item }, function (err, img) {
              imageindex++;
              _this.image.push(img);
              if (imageindex === imageCount) {
                _this.emit('imageLoaded');
              }
            });
          });
        }
      }
    }
  ]);
  return ImageSource;
}(__WEBPACK_IMPORTED_MODULE_0__core_source__['a']);