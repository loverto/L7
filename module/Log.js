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
var Linear = require('./Linear');
var Util = require('./Util');
function log(a, b) {
  if (a === 1) {
    return 1;
  }
  return Math.log(b) / Math.log(a);
}
var Log = function (_Linear) {
  _inherits(Log, _Linear);
  function Log() {
    _classCallCheck(this, Log);
    return _possibleConstructorReturn(this, _getPrototypeOf(Log).apply(this, arguments));
  }
  _createClass(Log, [
    {
      key: 'getDefaultCfg',
      value: function getDefaultCfg() {
        var cfg = _get(_getPrototypeOf(Log.prototype), 'getDefaultCfg', this).call(this);
        return Util.mix({}, cfg, {
          type: 'log',
          base: 2,
          tickCount: 10,
          _minTick: null
        });
      }
    },
    {
      key: 'calculateTicks',
      value: function calculateTicks() {
        var self = this;
        var base = self.base;
        var minTick;
        if (self.min < 0) {
          throw new Error('The minimum value must be greater than zero!');
        }
        var maxTick = log(base, self.max);
        if (self.min > 0) {
          minTick = Math.floor(log(base, self.min));
        } else {
          var values = self.values;
          var positiveMin = self.max;
          Util.each(values, function (value) {
            if (value > 0 && value < positiveMin) {
              positiveMin = value;
            }
          });
          if (positiveMin === self.max) {
            positiveMin = self.max / base;
          }
          if (positiveMin > 1) {
            positiveMin = 1;
          }
          minTick = Math.floor(log(base, positiveMin));
          self._minTick = minTick;
          self.positiveMin = positiveMin;
        }
        var count = maxTick - minTick;
        var tickCount = self.tickCount;
        var avg = Math.ceil(count / tickCount);
        var ticks = [];
        for (var i = minTick; i < maxTick + avg; i = i + avg) {
          ticks.push(Math.pow(base, i));
        }
        if (self.min === 0) {
          ticks.unshift(0);
        }
        return ticks;
      }
    },
    {
      key: '_getScalePercent',
      value: function _getScalePercent(value) {
        var max = this.max;
        var min = this.min;
        if (max === min) {
          return 0;
        }
        if (value <= 0) {
          return 0;
        }
        var base = this.base;
        var positiveMin = this.positiveMin;
        if (positiveMin) {
          min = positiveMin * 1 / base;
        }
        var percent;
        if (value < positiveMin) {
          percent = value / positiveMin / (log(base, max) - log(base, min));
        } else {
          percent = (log(base, value) - log(base, min)) / (log(base, max) - log(base, min));
        }
        return percent;
      }
    },
    {
      key: 'scale',
      value: function scale(value) {
        var percent = this._getScalePercent(value);
        var rangeMin = this.rangeMin();
        var rangeMax = this.rangeMax();
        return rangeMin + percent * (rangeMax - rangeMin);
      }
    },
    {
      key: 'invert',
      value: function invert(value) {
        var base = this.base;
        var max = log(base, this.max);
        var rangeMin = this.rangeMin();
        var range = this.rangeMax() - rangeMin;
        var min;
        var positiveMin = this.positiveMin;
        if (positiveMin) {
          if (value === 0) {
            return 0;
          }
          min = log(base, positiveMin / base);
          var appendPercent = 1 / (max - min) * range;
          if (value < appendPercent) {
            return value / appendPercent * positiveMin;
          }
        } else {
          min = log(base, this.min);
        }
        var percent = (value - rangeMin) / range;
        var tmp = percent * (max - min) + min;
        return Math.pow(base, tmp);
      }
    }
  ]);
  return Log;
}(Linear);
module.exports = Log;
