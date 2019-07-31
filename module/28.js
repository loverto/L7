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
var Base = require('./27');
var Util = require('./1');
var numberAuto = require('./260');
var Linear = function (_Base) {
  _inherits(Linear, _Base);
  function Linear() {
    _classCallCheck(this, Linear);
    return _possibleConstructorReturn(this, _getPrototypeOf(Linear).apply(this, arguments));
  }
  _createClass(Linear, [
    {
      key: 'getDefaultCfg',
      value: function getDefaultCfg() {
        var cfg = _get(_getPrototypeOf(Linear.prototype), 'getDefaultCfg', this).call(this);
        return Util.mix({}, cfg, {
          type: 'linear',
          isLinear: true,
          min: null,
          minLimit: null,
          max: null,
          maxLimit: null,
          nice: false,
          tickCount: null,
          tickInterval: null,
          snapArray: null
        });
      }
    },
    {
      key: 'init',
      value: function init() {
        var self = this;
        if (!self.ticks) {
          self.min = self.translate(self.min);
          self.max = self.translate(self.max);
          self.initTicks();
        } else {
          var ticks = self.ticks;
          var firstValue = self.translate(ticks[0]);
          var lastValue = self.translate(ticks[ticks.length - 1]);
          if (Util.isNil(self.min) || self.min > firstValue) {
            self.min = firstValue;
          }
          if (Util.isNil(self.max) || self.max < lastValue) {
            self.max = lastValue;
          }
        }
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
        if (max < min) {
          throw new Error('max: '.concat(max, ' should not be less than min: ').concat(min));
        }
        var tmp = numberAuto({
          min: min,
          max: max,
          minLimit: self.minLimit,
          maxLimit: self.maxLimit,
          minCount: count,
          maxCount: count,
          interval: interval,
          snapArray: this.snapArray
        });
        return tmp.ticks;
      }
    },
    {
      key: 'initTicks',
      value: function initTicks() {
        var self = this;
        var calTicks = self.calculateTicks();
        if (self.nice) {
          self.ticks = calTicks;
          self.min = calTicks[0];
          self.max = calTicks[calTicks.length - 1];
        } else {
          var ticks = [];
          Util.each(calTicks, function (tick) {
            if (tick >= self.min && tick <= self.max) {
              ticks.push(tick);
            }
          });
          if (!ticks.length) {
            ticks.push(self.min);
            ticks.push(self.max);
          }
          self.ticks = ticks;
        }
      }
    },
    {
      key: 'scale',
      value: function scale(value) {
        if (value === null || value === undefined) {
          return NaN;
        }
        var max = this.max;
        var min = this.min;
        if (max === min) {
          return 0;
        }
        var percent = (value - min) / (max - min);
        var rangeMin = this.rangeMin();
        var rangeMax = this.rangeMax();
        return rangeMin + percent * (rangeMax - rangeMin);
      }
    },
    {
      key: 'invert',
      value: function invert(value) {
        var percent = (value - this.rangeMin()) / (this.rangeMax() - this.rangeMin());
        return this.min + percent * (this.max - this.min);
      }
    }
  ]);
  return Linear;
}(Base);
module.exports = Linear;