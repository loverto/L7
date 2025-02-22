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
var Base = require('./Scale');
var Util = require('./Util');
var catAuto = require('./CatAuto');
var Category = function (_Base) {
  _inherits(Category, _Base);
  function Category() {
    _classCallCheck(this, Category);
    return _possibleConstructorReturn(this, _getPrototypeOf(Category).apply(this, arguments));
  }
  _createClass(Category, [
    {
      key: 'getDefaultCfg',
      value: function getDefaultCfg() {
        var cfg = _get(_getPrototypeOf(Category.prototype), 'getDefaultCfg', this).call(this);
        return Util.mix({}, cfg, {
          type: 'cat',
          tickCount: null,
          isCategory: true
        });
      }
    },
    {
      key: 'init',
      value: function init() {
        var self = this;
        var values = self.values;
        var tickCount = self.tickCount;
        Util.each(values, function (v, i) {
          values[i] = v.toString();
        });
        if (!self.ticks) {
          var ticks = values;
          if (tickCount) {
            var temp = catAuto({
              maxCount: tickCount,
              data: values
            });
            ticks = temp.ticks;
          }
          this.ticks = ticks;
        }
      }
    },
    {
      key: 'getText',
      value: function getText(value) {
        if (this.values.indexOf(value) === -1 && Util.isNumber(value)) {
          value = this.values[Math.round(value)];
        }
        return _get(_getPrototypeOf(Category.prototype), 'getText', this).call(this, value);
      }
    },
    {
      key: 'translate',
      value: function translate(value) {
        var index = this.values.indexOf(value);
        if (index === -1 && Util.isNumber(value)) {
          index = value;
        } else if (index === -1) {
          index = NaN;
        }
        return index;
      }
    },
    {
      key: 'scale',
      value: function scale(value) {
        var rangeMin = this.rangeMin();
        var rangeMax = this.rangeMax();
        var percent;
        if (Util.isString(value) || this.values.indexOf(value) !== -1) {
          value = this.translate(value);
        }
        if (this.values.length > 1) {
          percent = value / (this.values.length - 1);
        } else {
          percent = value;
        }
        return rangeMin + percent * (rangeMax - rangeMin);
      }
    },
    {
      key: 'invert',
      value: function invert(value) {
        if (Util.isString(value)) {
          return value;
        }
        var min = this.rangeMin();
        var max = this.rangeMax();
        if (value < min) {
          value = min;
        }
        if (value > max) {
          value = max;
        }
        var percent = (value - min) / (max - min);
        var index = Math.round(percent * (this.values.length - 1)) % this.values.length;
        index = index || 0;
        return this.values[index];
      }
    }
  ]);
  return Category;
}(Base);
module.exports = Category;
