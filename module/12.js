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
var ColorUtil = require('./35');
var Util = require('./1');
function toScaleString(scale, value) {
  if (Util.isString(value)) {
    return value;
  }
  return scale.invert(scale.scale(value));
}
var AttributeBase = function () {
  function AttributeBase(cfg) {
    _classCallCheck(this, AttributeBase);
    this.type = 'base';
    this.name = null;
    this.method = null;
    this.values = [];
    this.scales = [];
    this.linear = null;
    Util.mix(this, cfg);
  }
  _createClass(AttributeBase, [
    {
      key: 'get',
      value: function get(name) {
        return this[name];
      }
    },
    {
      key: 'set',
      value: function set(name, value) {
        this[name] = value;
      }
    },
    {
      key: '_getAttrValue',
      value: function _getAttrValue(scale, value) {
        var values = this.values;
        if (scale.isCategory && !this.linear) {
          var index = scale.translate(value);
          return values[index % values.length];
        }
        var percent = scale.scale(value);
        return this.getLinearValue(percent);
      }
    },
    {
      key: 'getLinearValue',
      value: function getLinearValue(percent) {
        var values = this.values;
        var steps = values.length - 1;
        var step = Math.floor(steps * percent);
        var leftPercent = steps * percent - step;
        var start = values[step];
        var end = step === steps ? start : values[step + 1];
        var rstValue = start + (end - start) * leftPercent;
        return rstValue;
      }
    },
    {
      key: 'callback',
      value: function callback(value) {
        var self = this;
        var scale = self.scales[0];
        var rstValue = null;
        if (scale.type === 'identity') {
          rstValue = scale.value;
        } else {
          rstValue = self._getAttrValue(scale, value);
        }
        return rstValue;
      }
    },
    {
      key: 'getNames',
      value: function getNames() {
        var scales = this.scales;
        var names = this.names;
        var length = Math.min(scales.length, names.length);
        var rst = [];
        for (var i = 0; i < length; i++) {
          rst.push(names[i]);
        }
        return rst;
      }
    },
    {
      key: 'getFields',
      value: function getFields() {
        var scales = this.scales;
        var rst = [];
        Util.each(scales, function (scale) {
          rst.push(scale.field);
        });
        return rst;
      }
    },
    {
      key: 'getScale',
      value: function getScale(name) {
        var scales = this.scales;
        var names = this.names;
        var index = names.indexOf(name);
        return scales[index];
      }
    },
    {
      key: 'mapping',
      value: function mapping() {
        var scales = this.scales;
        var callback = this.callback;
        for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }
        var values = params;
        if (callback) {
          for (var i = 0; i < params.length; i++) {
            params[i] = this._toOriginParam(params[i], scales[i]);
          }
          values = callback.apply(this, params);
        }
        if (this.type === 'color' && !Util.isArray(values)) {
          values = ColorUtil.toRGB(values).map(function (e) {
            return e / 255;
          });
        }
        if (!Util.isArray(values)) {
          values = [values];
        }
        return values;
      }
    },
    {
      key: '_toOriginParam',
      value: function _toOriginParam(param, scale) {
        var rst = param;
        if (!scale.isLinear) {
          if (Util.isArray(param)) {
            rst = [];
            for (var i = 0; i < param.length; i++) {
              rst.push(toScaleString(scale, param[i]));
            }
          } else {
            rst = toScaleString(scale, param);
          }
        }
        return rst;
      }
    }
  ]);
  return AttributeBase;
}();
module.exports = AttributeBase;