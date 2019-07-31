var Util = require('./1');
var Base = require('./27');
Base.Linear = require('./28');
Base.Identity = require('./261');
Base.Cat = require('./62');
Base.Time = require('./262');
Base.TimeCat = require('./264');
Base.Log = require('./265');
Base.Pow = require('./266');
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