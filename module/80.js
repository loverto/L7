if (Number.EPSILON === undefined) {
  Number.EPSILON = Math.pow(2, -52);
}
if (Number.isInteger === undefined) {
  Number.isInteger = function (value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  };
}
if (Math.sign === undefined) {
  Math.sign = function (x) {
    return x < 0 ? -1 : x > 0 ? 1 : +x;
  };
}
if ('name' in Function.prototype === false) {
  Object.defineProperty(Function.prototype, 'name', {
    get: function () {
      return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1];
    }
  });
}
if (Object.assign === undefined) {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  }());
}