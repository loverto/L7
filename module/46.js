'use strict';
require.d(exports, 'a', function () {
  return Camera;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_1__core_Object3D_js__ = require('./5');
var __WEBPACK_IMPORTED_MODULE_2__math_Vector3_js__ = require('./0');
function Camera() {
  __WEBPACK_IMPORTED_MODULE_1__core_Object3D_js__['a'].call(this);
  this.type = 'Camera';
  this.matrixWorldInverse = new __WEBPACK_IMPORTED_MODULE_0__math_Matrix4_js__['a']();
  this.projectionMatrix = new __WEBPACK_IMPORTED_MODULE_0__math_Matrix4_js__['a']();
  this.projectionMatrixInverse = new __WEBPACK_IMPORTED_MODULE_0__math_Matrix4_js__['a']();
}
Camera.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_1__core_Object3D_js__['a'].prototype), {
  constructor: Camera,
  isCamera: true,
  copy: function (source, recursive) {
    __WEBPACK_IMPORTED_MODULE_1__core_Object3D_js__['a'].prototype.copy.call(this, source, recursive);
    this.matrixWorldInverse.copy(source.matrixWorldInverse);
    this.projectionMatrix.copy(source.projectionMatrix);
    this.projectionMatrixInverse.copy(source.projectionMatrixInverse);
    return this;
  },
  getWorldDirection: function (target) {
    if (target === undefined) {
      console.warn('THREE.Camera: .getWorldDirection() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_2__math_Vector3_js__['a']();
    }
    this.updateMatrixWorld(true);
    var e = this.matrixWorld.elements;
    return target.set(-e[8], -e[9], -e[10]).normalize();
  },
  updateMatrixWorld: function (force) {
    __WEBPACK_IMPORTED_MODULE_1__core_Object3D_js__['a'].prototype.updateMatrixWorld.call(this, force);
    this.matrixWorldInverse.getInverse(this.matrixWorld);
  },
  clone: function () {
    return new this.constructor().copy(this);
  }
});