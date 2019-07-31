'use strict';
require.d(exports, 'a', function () {
  return LightShadow;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__ = require('./8');
function LightShadow(camera) {
  this.camera = camera;
  this.bias = 0;
  this.radius = 1;
  this.mapSize = new __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__['a'](512, 512);
  this.map = null;
  this.matrix = new __WEBPACK_IMPORTED_MODULE_0__math_Matrix4_js__['a']();
}
Object.assign(LightShadow.prototype, {
  copy: function (source) {
    this.camera = source.camera.clone();
    this.bias = source.bias;
    this.radius = source.radius;
    this.mapSize.copy(source.mapSize);
    return this;
  },
  clone: function () {
    return new this.constructor().copy(this);
  },
  toJSON: function () {
    var object = {};
    if (this.bias !== 0)
      object.bias = this.bias;
    if (this.radius !== 1)
      object.radius = this.radius;
    if (this.mapSize.x !== 512 || this.mapSize.y !== 512)
      object.mapSize = this.mapSize.toArray();
    object.camera = this.camera.toJSON(false).object;
    delete object.camera.matrix;
    return object;
  }
});