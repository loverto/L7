'use strict';
require.d(exports, 'a', function () {
  return PerspectiveCamera;
});
var __WEBPACK_IMPORTED_MODULE_0__Camera_js__ = require('./46');
var __WEBPACK_IMPORTED_MODULE_1__core_Object3D_js__ = require('./5');
var __WEBPACK_IMPORTED_MODULE_2__math_Math_js__ = require('./6');
function PerspectiveCamera(fov, aspect, near, far) {
  __WEBPACK_IMPORTED_MODULE_0__Camera_js__['a'].call(this);
  this.type = 'PerspectiveCamera';
  this.fov = fov !== undefined ? fov : 50;
  this.zoom = 1;
  this.near = near !== undefined ? near : 0.1;
  this.far = far !== undefined ? far : 2000;
  this.focus = 10;
  this.aspect = aspect !== undefined ? aspect : 1;
  this.view = null;
  this.filmGauge = 35;
  this.filmOffset = 0;
  this.updateProjectionMatrix();
}
PerspectiveCamera.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__Camera_js__['a'].prototype), {
  constructor: PerspectiveCamera,
  isPerspectiveCamera: true,
  copy: function (source, recursive) {
    __WEBPACK_IMPORTED_MODULE_0__Camera_js__['a'].prototype.copy.call(this, source, recursive);
    this.fov = source.fov;
    this.zoom = source.zoom;
    this.near = source.near;
    this.far = source.far;
    this.focus = source.focus;
    this.aspect = source.aspect;
    this.view = source.view === null ? null : Object.assign({}, source.view);
    this.filmGauge = source.filmGauge;
    this.filmOffset = source.filmOffset;
    return this;
  },
  setFocalLength: function (focalLength) {
    var vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;
    this.fov = __WEBPACK_IMPORTED_MODULE_2__math_Math_js__['a'].RAD2DEG * 2 * Math.atan(vExtentSlope);
    this.updateProjectionMatrix();
  },
  getFocalLength: function () {
    var vExtentSlope = Math.tan(__WEBPACK_IMPORTED_MODULE_2__math_Math_js__['a'].DEG2RAD * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / vExtentSlope;
  },
  getEffectiveFOV: function () {
    return __WEBPACK_IMPORTED_MODULE_2__math_Math_js__['a'].RAD2DEG * 2 * Math.atan(Math.tan(__WEBPACK_IMPORTED_MODULE_2__math_Math_js__['a'].DEG2RAD * 0.5 * this.fov) / this.zoom);
  },
  getFilmWidth: function () {
    return this.filmGauge * Math.min(this.aspect, 1);
  },
  getFilmHeight: function () {
    return this.filmGauge / Math.max(this.aspect, 1);
  },
  setViewOffset: function (fullWidth, fullHeight, x, y, width, height) {
    this.aspect = fullWidth / fullHeight;
    if (this.view === null) {
      this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      };
    }
    this.view.enabled = true;
    this.view.fullWidth = fullWidth;
    this.view.fullHeight = fullHeight;
    this.view.offsetX = x;
    this.view.offsetY = y;
    this.view.width = width;
    this.view.height = height;
    this.updateProjectionMatrix();
  },
  clearViewOffset: function () {
    if (this.view !== null) {
      this.view.enabled = false;
    }
    this.updateProjectionMatrix();
  },
  updateProjectionMatrix: function () {
    var near = this.near, top = near * Math.tan(__WEBPACK_IMPORTED_MODULE_2__math_Math_js__['a'].DEG2RAD * 0.5 * this.fov) / this.zoom, height = 2 * top, width = this.aspect * height, left = -0.5 * width, view = this.view;
    if (this.view !== null && this.view.enabled) {
      var fullWidth = view.fullWidth, fullHeight = view.fullHeight;
      left += view.offsetX * width / fullWidth;
      top -= view.offsetY * height / fullHeight;
      width *= view.width / fullWidth;
      height *= view.height / fullHeight;
    }
    var skew = this.filmOffset;
    if (skew !== 0)
      left += near * skew / this.getFilmWidth();
    this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);
    this.projectionMatrixInverse.getInverse(this.projectionMatrix);
  },
  toJSON: function (meta) {
    var data = __WEBPACK_IMPORTED_MODULE_1__core_Object3D_js__['a'].prototype.toJSON.call(this, meta);
    data.object.fov = this.fov;
    data.object.zoom = this.zoom;
    data.object.near = this.near;
    data.object.far = this.far;
    data.object.focus = this.focus;
    data.object.aspect = this.aspect;
    if (this.view !== null)
      data.object.view = Object.assign({}, this.view);
    data.object.filmGauge = this.filmGauge;
    data.object.filmOffset = this.filmOffset;
    return data;
  }
});