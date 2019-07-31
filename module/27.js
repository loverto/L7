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
var Util = require('./1');
var Scale = function () {
  _createClass(Scale, [{
      key: 'getDefaultCfg',
      value: function getDefaultCfg() {
        return {
          type: 'base',
          formatter: null,
          range: [
            0,
            1
          ],
          ticks: null,
          values: []
        };
      }
    }]);
  function Scale(cfg) {
    _classCallCheck(this, Scale);
    var defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
    this.init();
  }
  _createClass(Scale, [
    {
      key: 'init',
      value: function init() {
      }
    },
    {
      key: 'getTicks',
      value: function getTicks() {
        var self = this;
        var ticks = self.ticks;
        var rst = [];
        Util.each(ticks, function (tick) {
          var obj;
          if (Util.isObject(tick)) {
            obj = tick;
          } else {
            obj = {
              text: self.getText(tick),
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
      key: 'getText',
      value: function getText(value) {
        var formatter = this.formatter;
        value = formatter ? formatter(value) : value;
        if (Util.isNil(value) || !value.toString) {
          value = '';
        }
        return value.toString();
      }
    },
    {
      key: 'rangeMin',
      value: function rangeMin() {
        return this.range[0];
      }
    },
    {
      key: 'rangeMax',
      value: function rangeMax() {
        var range = this.range;
        return range[range.length - 1];
      }
    },
    {
      key: 'invert',
      value: function invert(value) {
        return value;
      }
    },
    {
      key: 'translate',
      value: function translate(value) {
        return value;
      }
    },
    {
      key: 'scale',
      value: function scale(value) {
        return value;
      }
    },
    {
      key: 'clone',
      value: function clone() {
        var self = this;
        var constr = self.constructor;
        var cfg = {};
        Util.each(self, function (v, k) {
          cfg[k] = self[k];
        });
        return new constr(cfg);
      }
    },
    {
      key: 'change',
      value: function change(info) {
        this.ticks = null;
        Util.mix(this, info);
        this.init();
        return this;
      }
    }
  ]);
  return Scale;
}();
module.exports = Scale;