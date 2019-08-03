var Util = require('./Util');
var Base = require('./Scale');
Base.Linear = require('./Linear');
Base.Identity = require('./Identity');
Base.Cat = require('./Category');
Base.Time = require('./Time');
Base.TimeCat = require('./TimeCategory');
Base.Log = require('./Log');
Base.Pow = require('./Pow');
var _loop = function _loop(k) {
  if (Base.hasOwnProperty(k)) {
    var methodName = Util.lowerFirst(k);
    Base[methodName] = function (cfg) {
      return new Base[k](cfg);
    };
  }
};
for (var k in Base) {
  _loop(k);
}
var CAT_ARR = [
  'cat',
  'timeCat'
];
Base.isCategory = function (type) {
  return CAT_ARR.indexOf(type) >= 0;
};
module.exports = Base;
