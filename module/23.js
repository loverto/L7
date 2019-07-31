'use strict';
require.d(exports, 'a', function () {
  return Source;
});
var __WEBPACK_IMPORTED_MODULE_0__base__ = require('./22');
var __WEBPACK_IMPORTED_MODULE_1__geo_project__ = require('./267');
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
var Controller = require('./257');
var Source = function (_Base) {
  _inherits(Source, _Base);
  _createClass(Source, [{
      key: 'getDefaultCfg',
      value: function getDefaultCfg() {
        return {
          data: null,
          defs: {},
          scales: {},
          options: {}
        };
      }
    }]);
  function Source(cfg) {
    var _this;
    _classCallCheck(this, Source);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Source).call(this, cfg));
    _this._initControllers();
    _this.prepareData();
    return _this;
  }
  _createClass(Source, [
    {
      key: 'prepareData',
      value: function prepareData() {
        var _this2 = this;
        var data = this.get('data');
        this.propertiesData = [];
        this.geoData = [];
        data.coordinates.forEach(function (geo) {
          var coord = _this2._coordProject(geo);
          _this2.geoData.push(coord);
          _this2.propertiesData.push([]);
        });
      }
    },
    {
      key: 'createScale',
      value: function createScale(field) {
        var data = this.propertiesData;
        var scales = this.get('scales');
        var scale = scales[field];
        var scaleController = this.get('scaleController');
        if (!scale) {
          scale = scaleController.createScale(field, data);
          scales[field] = scale;
        }
        return scale;
      }
    },
    {
      key: '_initControllers',
      value: function _initControllers() {
        var defs = this.get('defs');
        var scaleController = new Controller.Scale({ defs: defs });
        this.set('scaleController', scaleController);
      }
    },
    {
      key: '_getCoord',
      value: function _getCoord(geo) {
        if (geo.geometry) {
          geo = geo.geometry.coordinates;
        } else if (geo.coordinates) {
          geo = geo.coordinates;
        }
        return geo;
      }
    },
    {
      key: '_coordProject',
      value: function _coordProject(geo) {
        var _this3 = this;
        if (Array.isArray(geo[0][0])) {
          return geo.map(function (coor) {
            return _this3._coordProject(coor);
          });
        }
        if (!Array.isArray(geo[0])) {
          return this._coorConvert(geo);
        }
        return geo.map(function (coor) {
          return _this3._coorConvert(coor);
        });
      }
    },
    {
      key: '_coorConvert',
      value: function _coorConvert(geo) {
        var ll = Object(__WEBPACK_IMPORTED_MODULE_1__geo_project__['a'])(geo);
        return [
          ll.x,
          -ll.y,
          geo[2] || 0
        ];
      }
    }
  ]);
  return Source;
}(__WEBPACK_IMPORTED_MODULE_0__base__['a']);