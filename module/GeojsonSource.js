'use strict';
require.d(exports, 'a', function () {
  return GeojsonSource;
});
var __WEBPACK_IMPORTED_MODULE_0__core_source__ = require('./Source');
var __WEBPACK_IMPORTED_MODULE_1__turf_meta__ = require('./66');
var __WEBPACK_IMPORTED_MODULE_1__turf_meta___default = require.n(__WEBPACK_IMPORTED_MODULE_1__turf_meta__);
var __WEBPACK_IMPORTED_MODULE_2__turf_clean_coords__ = require('./268');
var __WEBPACK_IMPORTED_MODULE_2__turf_clean_coords___default = require.n(__WEBPACK_IMPORTED_MODULE_2__turf_clean_coords__);
var __WEBPACK_IMPORTED_MODULE_3__turf_invariant__ = require('./67');
var __WEBPACK_IMPORTED_MODULE_3__turf_invariant___default = require.n(__WEBPACK_IMPORTED_MODULE_3__turf_invariant__);
var __WEBPACK_IMPORTED_MODULE_4__geo_featureIndex__ = require('./68');
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
var GeojsonSource = function (_Source) {
  _inherits(GeojsonSource, _Source);
  function GeojsonSource() {
    _classCallCheck(this, GeojsonSource);
    return _possibleConstructorReturn(this, _getPrototypeOf(GeojsonSource).apply(this, arguments));
  }
  _createClass(GeojsonSource, [
    {
      key: 'prepareData',
      value: function prepareData() {
        var _this = this;
        this.type = 'geojson';
        var data = this.get('data');
        this.propertiesData = [];
        this.geoData = [];
        __WEBPACK_IMPORTED_MODULE_1__turf_meta__['flattenEach'](data, function (currentFeature, featureIndex) {
          var coord = Object(__WEBPACK_IMPORTED_MODULE_3__turf_invariant__['getCoords'])(__WEBPACK_IMPORTED_MODULE_2__turf_clean_coords___default()(currentFeature));
          _this.geoData.push(_this._coordProject(coord));
          currentFeature.properties._id = featureIndex + 1;
          _this.propertiesData.push(currentFeature.properties);
        });
      }
    },
    {
      key: 'featureIndex',
      value: function featureIndex() {
        var data = this.get('data');
        this.featureIndex = new __WEBPACK_IMPORTED_MODULE_4__geo_featureIndex__['a'](data);
      }
    },
    {
      key: 'getSelectFeatureId',
      value: function getSelectFeatureId(featureId) {
        var data = this.get('data');
        var selectFeatureIds = [];
        var featureStyleId = 0;
        __WEBPACK_IMPORTED_MODULE_1__turf_meta__['flattenEach'](data, function (currentFeature, featureIndex) {
          if (featureIndex === featureId) {
            selectFeatureIds.push(featureStyleId);
          }
          featureStyleId++;
          if (featureIndex > featureId) {
            return;
          }
        });
        return selectFeatureIds;
      }
    }
  ]);
  return GeojsonSource;
}(__WEBPACK_IMPORTED_MODULE_0__core_source__['a']);
