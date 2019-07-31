'use strict';
require.d(exports, 'a', function () {
  return Light;
});
var __WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__ = require('./5');
var __WEBPACK_IMPORTED_MODULE_1__math_Color_js__ = require('./7');
function Light(color, intensity) {
  __WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__['a'].call(this);
  this.type = 'Light';
  this.color = new __WEBPACK_IMPORTED_MODULE_1__math_Color_js__['a'](color);
  this.intensity = intensity !== undefined ? intensity : 1;
  this.receiveShadow = undefined;
}
Light.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__['a'].prototype), {
  constructor: Light,
  isLight: true,
  copy: function (source) {
    __WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__['a'].prototype.copy.call(this, source);
    this.color.copy(source.color);
    this.intensity = source.intensity;
    return this;
  },
  toJSON: function (meta) {
    var data = __WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__['a'].prototype.toJSON.call(this, meta);
    data.object.color = this.color.getHex();
    data.object.intensity = this.intensity;
    if (this.groundColor !== undefined)
      data.object.groundColor = this.groundColor.getHex();
    if (this.distance !== undefined)
      data.object.distance = this.distance;
    if (this.angle !== undefined)
      data.object.angle = this.angle;
    if (this.decay !== undefined)
      data.object.decay = this.decay;
    if (this.penumbra !== undefined)
      data.object.penumbra = this.penumbra;
    if (this.shadow !== undefined)
      data.object.shadow = this.shadow.toJSON();
    return data;
  }
});