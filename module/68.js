'use strict';
require.d(exports, 'a', function () {
  return FeatureIndex;
});
var __WEBPACK_IMPORTED_MODULE_0_rbush__ = require('./269');
var __WEBPACK_IMPORTED_MODULE_0_rbush___default = require.n(__WEBPACK_IMPORTED_MODULE_0_rbush__);
var __WEBPACK_IMPORTED_MODULE_1__turf_bbox__ = require('./271');
var __WEBPACK_IMPORTED_MODULE_1__turf_bbox___default = require.n(__WEBPACK_IMPORTED_MODULE_1__turf_bbox__);
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}
function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null)
        _i['return']();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
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
var FeatureIndex = function () {
  function FeatureIndex(data) {
    var _this = this;
    _classCallCheck(this, FeatureIndex);
    this.tree = __WEBPACK_IMPORTED_MODULE_0_rbush___default()();
    this.rawData = data;
    data.features.forEach(function (feature) {
      _this.insert(feature);
    });
  }
  _createClass(FeatureIndex, [
    {
      key: 'insert',
      value: function insert(feature) {
        var bbox = this.toBBox(feature);
        bbox.feature = feature;
        this.tree.insert(bbox);
      }
    },
    {
      key: 'search',
      value: function search(feature) {
        return this.tree.search(this.toBBox(feature));
      }
    },
    {
      key: 'clear',
      value: function clear() {
        this.tree.clear();
      }
    },
    {
      key: 'all',
      value: function all() {
        return this.tree.all();
      }
    },
    {
      key: 'toBBox',
      value: function toBBox(feature) {
        var bbox = feature.type === 'Point' ? this.pointBBox(feature) : __WEBPACK_IMPORTED_MODULE_1__turf_bbox___default()(feature);
        return {
          minX: bbox[0],
          minY: bbox[1],
          maxX: bbox[2],
          maxY: bbox[3]
        };
      }
    },
    {
      key: 'pointBBox',
      value: function pointBBox(feature) {
        var size = 1 / 1000 / 1000;
        var _feature$geometry$coo = _slicedToArray(feature.geometry.coordinates, 2), x = _feature$geometry$coo[0], y = _feature$geometry$coo[1];
        return [
          x - size,
          y - size,
          x + size,
          y + size
        ];
      }
    }
  ]);
  return FeatureIndex;
}();