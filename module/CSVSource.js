'use strict';
require.d(exports, 'a', function () {
  return CSVSource;
});
var __WEBPACK_IMPORTED_MODULE_0__core_source__ = require('./Source');
var __WEBPACK_IMPORTED_MODULE_1__geo_featureIndex__ = require('./FeatureIndex');
var __WEBPACK_IMPORTED_MODULE_2__util__ = require('./Util');
var __WEBPACK_IMPORTED_MODULE_2__util___default = require.n(__WEBPACK_IMPORTED_MODULE_2__util__);
var __WEBPACK_IMPORTED_MODULE_3_d3_dsv__ = require('./272');
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
var CSVSource = function (_Source) {
  _inherits(CSVSource, _Source);
  function CSVSource() {
    _classCallCheck(this, CSVSource);
    return _possibleConstructorReturn(this, _getPrototypeOf(CSVSource).apply(this, arguments));
  }
  _createClass(CSVSource, [
    {
      key: 'prepareData',
      value: function prepareData() {
        var _this = this;
        this.type = 'csv';
        var data = this.get('data');
        var x = this.get('x');
        var y = this.get('y');
        var x1 = this.get('x1');
        var y1 = this.get('y1');
        var coords = this.get('coordinates');
        this.propertiesData = [];
        this.geoData = [];
        var csvdata = data;
        __WEBPACK_IMPORTED_MODULE_2__util___default.a.isArray(csvdata) || (csvdata = Object(__WEBPACK_IMPORTED_MODULE_3_d3_dsv__['a'])(data));
        this.propertiesData = csvdata;
        csvdata.forEach(function (col, featureIndex) {
          var coordinates = [];
          if (col.coordinates) {
            coordinates = col.coordinates;
          }
          if (x && y) {
            coordinates = [
              col[x],
              col[y]
            ];
          }
          if (x1 && y1) {
            coordinates = [
              [
                col[x],
                col[y]
              ],
              [
                col[x1],
                col[y1]
              ]
            ];
          }
          if (coords && col.coords) {
            coordinates = col.coords;
          }
          col._id = featureIndex + 1;
          _this._coordProject(coordinates);
          _this.geoData.push(_this._coordProject(coordinates));
        });
      }
    },
    {
      key: 'featureIndex',
      value: function featureIndex() {
        var data = this.get('data');
        this.featureIndex = new __WEBPACK_IMPORTED_MODULE_1__geo_featureIndex__['a'](data);
      }
    },
    {
      key: 'getSelectFeatureId',
      value: function getSelectFeatureId(featureId) {
        return [featureId];
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
        var _this2 = this;
        if (Array.isArray(geo[0][0])) {
          return geo.map(function (coor) {
            return _this2._coordProject(coor);
          });
        }
        if (!Array.isArray(geo[0])) {
          return this._coorConvert(geo);
        }
        return geo.map(function (coor) {
          return _this2._coorConvert(coor);
        });
      }
    }
  ]);
  return CSVSource;
}(__WEBPACK_IMPORTED_MODULE_0__core_source__['a']);
