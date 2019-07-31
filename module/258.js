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
var Global = require('./Global');
var Scale = require('./259');
var dateRegex = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/;
var TYPES = {
  LINEAR: 'linear',
  CAT: 'cat',
  TIME: 'time'
};
var ScaleController = function () {
  function ScaleController(cfg) {
    _classCallCheck(this, ScaleController);
    this.defs = {};
    Util.assign(this, cfg);
  }
  _createClass(ScaleController, [
    {
      key: '_getDef',
      value: function _getDef(field) {
        var defs = this.defs;
        var def = null;
        if (Global.scales[field] || defs[field]) {
          def = Util.mix({}, Global.scales[field]);
          Util.each(defs[field], function (v, k) {
            if (Util.isNil(v)) {
              delete def[k];
            } else {
              def[k] = v;
            }
          });
        }
        return def;
      }
    },
    {
      key: '_getDefaultType',
      value: function _getDefaultType(field, data) {
        var type = TYPES.LINEAR;
        var value = Util.Array.firstValue(data, field);
        if (Util.isArray(value)) {
          value = value[0];
        }
        if (dateRegex.test(value)) {
          type = TYPES.TIME;
        } else if (Util.isString(value)) {
          type = TYPES.CAT;
        }
        return type;
      }
    },
    {
      key: '_getScaleCfg',
      value: function _getScaleCfg(type, field, data) {
        var cfg = { field: field };
        var values = Util.Array.values(data, field);
        cfg.values = values;
        if (!Scale.isCategory(type) && type !== 'time') {
          var range = Util.Array.getRange(values);
          cfg.min = range.min;
          cfg.max = range.max;
          cfg.nice = true;
        }
        if (type === 'time') {
          cfg.nice = false;
        }
        return cfg;
      }
    },
    {
      key: 'createScale',
      value: function createScale(field, data) {
        var self = this;
        var def = self._getDef(field);
        var scale;
        if (!data || !data.length) {
          if (def && def.type) {
            scale = Scale[def.type](def);
          } else {
            scale = Scale.identity({
              value: field,
              field: field.toString(),
              values: [field]
            });
          }
          return scale;
        }
        var firstValue = Util.Array.firstValue(data, field);
        if (Util.isNumber(field) || Util.isNil(firstValue) && !def) {
          scale = Scale.identity({
            value: field,
            field: field.toString(),
            values: [field]
          });
        } else {
          var type;
          if (def) {
            type = def.type;
          }
          type = type || self._getDefaultType(field, data);
          var cfg = self._getScaleCfg(type, field, data);
          if (def) {
            Util.mix(cfg, def);
          }
          scale = Scale[type](cfg);
        }
        return scale;
      }
    }
  ]);
  return ScaleController;
}();
module.exports = ScaleController;
