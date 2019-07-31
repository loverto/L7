'use strict';
require.d(exports, 'a', function () {
  return LineLoop;
});
var __WEBPACK_IMPORTED_MODULE_0__Line_js__ = require('./34');
function LineLoop(geometry, material) {
  __WEBPACK_IMPORTED_MODULE_0__Line_js__['a'].call(this, geometry, material);
  this.type = 'LineLoop';
}
LineLoop.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__Line_js__['a'].prototype), {
  constructor: LineLoop,
  isLineLoop: true
});