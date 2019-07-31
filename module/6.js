'use strict';
require.d(exports, 'a', function () {
  return _Math;
});
var _Math = {
  DEG2RAD: Math.PI / 180,
  RAD2DEG: 180 / Math.PI,
  generateUUID: function () {
    var lut = [];
    for (var i = 0; i < 256; i++) {
      lut[i] = (i < 16 ? '0' : '') + i.toString(16);
    }
    return function generateUUID() {
      var d0 = Math.random() * 4294967295 | 0;
      var d1 = Math.random() * 4294967295 | 0;
      var d2 = Math.random() * 4294967295 | 0;
      var d3 = Math.random() * 4294967295 | 0;
      var uuid = lut[d0 & 255] + lut[d0 >> 8 & 255] + lut[d0 >> 16 & 255] + lut[d0 >> 24 & 255] + '-' + lut[d1 & 255] + lut[d1 >> 8 & 255] + '-' + lut[d1 >> 16 & 15 | 64] + lut[d1 >> 24 & 255] + '-' + lut[d2 & 63 | 128] + lut[d2 >> 8 & 255] + '-' + lut[d2 >> 16 & 255] + lut[d2 >> 24 & 255] + lut[d3 & 255] + lut[d3 >> 8 & 255] + lut[d3 >> 16 & 255] + lut[d3 >> 24 & 255];
      return uuid.toUpperCase();
    };
  }(),
  clamp: function (value, min, max) {
    return Math.max(min, Math.min(max, value));
  },
  euclideanModulo: function (n, m) {
    return (n % m + m) % m;
  },
  mapLinear: function (x, a1, a2, b1, b2) {
    return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
  },
  lerp: function (x, y, t) {
    return (1 - t) * x + t * y;
  },
  smoothstep: function (x, min, max) {
    if (x <= min)
      return 0;
    if (x >= max)
      return 1;
    x = (x - min) / (max - min);
    return x * x * (3 - 2 * x);
  },
  smootherstep: function (x, min, max) {
    if (x <= min)
      return 0;
    if (x >= max)
      return 1;
    x = (x - min) / (max - min);
    return x * x * x * (x * (x * 6 - 15) + 10);
  },
  randInt: function (low, high) {
    return low + Math.floor(Math.random() * (high - low + 1));
  },
  randFloat: function (low, high) {
    return low + Math.random() * (high - low);
  },
  randFloatSpread: function (range) {
    return range * (0.5 - Math.random());
  },
  degToRad: function (degrees) {
    return degrees * _Math.DEG2RAD;
  },
  radToDeg: function (radians) {
    return radians * _Math.RAD2DEG;
  },
  isPowerOfTwo: function (value) {
    return (value & value - 1) === 0 && value !== 0;
  },
  ceilPowerOfTwo: function (value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
  },
  floorPowerOfTwo: function (value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
  }
};