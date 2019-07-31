'use strict';
require.d(exports, 'a', function () {
  return Scene;
});
var __WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__ = require('./5');
function Scene() {
  __WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__['a'].call(this);
  this.type = 'Scene';
  this.background = null;
  this.fog = null;
  this.overrideMaterial = null;
  this.autoUpdate = true;
}
Scene.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__['a'].prototype), {
  constructor: Scene,
  copy: function (source, recursive) {
    __WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__['a'].prototype.copy.call(this, source, recursive);
    if (source.background !== null)
      this.background = source.background.clone();
    if (source.fog !== null)
      this.fog = source.fog.clone();
    if (source.overrideMaterial !== null)
      this.overrideMaterial = source.overrideMaterial.clone();
    this.autoUpdate = source.autoUpdate;
    this.matrixAutoUpdate = source.matrixAutoUpdate;
    return this;
  },
  toJSON: function (meta) {
    var data = __WEBPACK_IMPORTED_MODULE_0__core_Object3D_js__['a'].prototype.toJSON.call(this, meta);
    if (this.background !== null)
      data.object.background = this.background.toJSON(meta);
    if (this.fog !== null)
      data.object.fog = this.fog.toJSON();
    return data;
  }
});