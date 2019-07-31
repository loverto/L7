'use strict';
require.d(exports, 'a', function () {
  return Group;
});
var __WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__ = require('./5');
function Group() {
  __WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__['a'].call(this);
  this.type = 'Group';
}
Group.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__['a'].prototype), {
  constructor: Group,
  isGroup: true
});