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
var Category = require('./62');
var Util = require('./1');
var fecha = require('./64');
var catAuto = require('./63');
var TimeUtil = require('./65');
var TimeCategory = function (_Category) {
  _inherits(TimeCategory, _Category);
  function TimeCategory() {
    _classCallCheck(this, TimeCategory);
    return _possibleConstructorReturn(this, _getPrototypeOf(TimeCategory).apply(this, arguments));
  }
  _createClass(TimeCategory, [
    {
      key: 'getDefaultCfg',
      value: function getDefaultCfg() {
        var cfg = _get(_getPrototypeOf(TimeCategory.prototype), 'getDefaultCfg', this).call(this);
        return Util.mix({}, cfg, {
          type: 'timeCat',
          mask: 'YYYY-MM-DD',
          tickCount: 7
        });
      }
    },
    {
      key: 'init',
      value: function init() {
        var self = this;
        var values = this.values;
        Util.each(values, function (v, i) {
          values[i] = self._toTimeStamp(v);
        });
        values.sort(function (v1, v2) {
          return v1 - v2;
        });
        if (!self.ticks) {
          self.ticks = this.calculateTicks(false);
        }
      }
    },
    {
      key: 'calculateTicks',
      value: function calculateTicks(formated) {
        var self = this;
        var count = self.tickCount;
        var ticks;
        if (count) {
          var temp = catAuto({
            maxCount: count,
            data: self.values
          });
          ticks = temp.ticks;
        } else {
          ticks = self.values;
        }
        if (formated) {
          Util.each(ticks, function (value, index) {
            ticks[index] = fecha.format(value, self.mask);
          });
        }
        return ticks;
      }
    },
    {
      key: 'translate',
      value: function translate(value) {
        value = this._toTimeStamp(value);
        var index = this.values.indexOf(value);
        if (index === -1) {
          if (Util.isNumber(value) && value < this.values.length) {
            index = value;
          } else {
            index = NaN;
          }
        }
        return index;
      }
    },
    {
      key: 'scale',
      value: function scale(value) {
        var rangeMin = this.rangeMin();
        var rangeMax = this.rangeMax();
        var index = this.translate(value);
        var percent;
        if (this.values.length === 1) {
          percent = index;
        } else if (index > -1) {
          percent = index / (this.values.length - 1);
        } else {
          percent = 0;
        }
        return rangeMin + percent * (rangeMax - rangeMin);
      }
    },
    {
      key: 'getText',
      value: function getText(value) {
        var result = '';
        var index = this.translate(value);
        if (index > -1) {
          result = this.values[index];
        } else {
          result = value;
        }
        var formatter = this.formatter;
        result = parseInt(result, 10);
        result = formatter ? formatter(result) : fecha.format(result, this.mask);
        return result;
      }
    },
    {
      key: 'getTicks',
      value: function getTicks() {
        var self = this;
        var ticks = this.ticks;
        var rst = [];
        Util.each(ticks, function (tick) {
          var obj;
          if (Util.isObject(tick)) {
            obj = tick;
          } else {
            obj = {
              text: Util.isString(tick) ? tick : self.getText(tick),
              tickValue: tick,
              value: self.scale(tick)
            };
          }
          rst.push(obj);
        });
        return rst;
      }
    },
    {
      key: '_toTimeStamp',
      value: function _toTimeStamp(value) {
        return TimeUtil.toTimeStamp(value);
      }
    }
  ]);
  return TimeCategory;
}(Category);
module.exports = TimeCategory;