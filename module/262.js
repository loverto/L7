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
function _get(target, property, receiver) {
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base)
        return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null)
      break;
  }
  return object;
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
var Linear = require('./28');
var Util = require('./Util');
var timeAuto = require('./263');
var fecha = require('./64');
var TimeUtil = require('./65');
var Time = function (_Linear) {
  _inherits(Time, _Linear);
  function Time() {
    _classCallCheck(this, Time);
    return _possibleConstructorReturn(this, _getPrototypeOf(Time).apply(this, arguments));
  }
  _createClass(Time, [
    {
      key: 'getDefaultCfg',
      value: function getDefaultCfg() {
        var cfg = _get(_getPrototypeOf(Time.prototype), 'getDefaultCfg', this).call(this);
        return Util.mix({}, cfg, {
          type: 'time',
          mask: 'YYYY-MM-DD'
        });
      }
    },
    {
      key: 'init',
      value: function init() {
        var self = this;
        var values = self.values;
        if (values && values.length) {
          var timeStamps = [];
          var min = Infinity;
          var secondMin = min;
          var max = 0;
          Util.each(values, function (v) {
            var timeStamp = self._toTimeStamp(v);
            if (isNaN(timeStamp)) {
              throw new TypeError('Invalid Time: '.concat(v));
            }
            if (min > timeStamp) {
              secondMin = min;
              min = timeStamp;
            } else if (secondMin > timeStamp) {
              secondMin = timeStamp;
            }
            if (max < timeStamp) {
              max = timeStamp;
            }
            timeStamps.push(timeStamp);
          });
          if (values.length > 1) {
            self.minTickInterval = secondMin - min;
          }
          if (Util.isNil(self.min) || self._toTimeStamp(self.min) > min) {
            self.min = min;
          }
          if (Util.isNil(self.max) || self._toTimeStamp(self.max) < max) {
            self.max = max;
          }
        }
        _get(_getPrototypeOf(Time.prototype), 'init', this).call(this);
      }
    },
    {
      key: 'calculateTicks',
      value: function calculateTicks() {
        var self = this;
        var min = self.min;
        var max = self.max;
        var count = self.tickCount;
        var interval = self.tickInterval;
        var tmp = timeAuto({
          min: min,
          max: max,
          minCount: count,
          maxCount: count,
          interval: interval,
          minInterval: self.minTickInterval
        });
        return tmp.ticks;
      }
    },
    {
      key: 'getText',
      value: function getText(value) {
        var formatter = this.formatter;
        value = this.translate(value);
        value = formatter ? formatter(value) : fecha.format(value, this.mask);
        return value;
      }
    },
    {
      key: 'scale',
      value: function scale(value) {
        if (Util.isString(value)) {
          value = this.translate(value);
        }
        return _get(_getPrototypeOf(Time.prototype), 'scale', this).call(this, value);
      }
    },
    {
      key: 'translate',
      value: function translate(value) {
        return this._toTimeStamp(value);
      }
    },
    {
      key: '_toTimeStamp',
      value: function _toTimeStamp(value) {
        return TimeUtil.toTimeStamp(value);
      }
    }
  ]);
  return Time;
}(Linear);
module.exports = Time;
