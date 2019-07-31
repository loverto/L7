'use strict';
require.d(exports, 'a', function () {
  return MeshDepthMaterial;
});
var __WEBPACK_IMPORTED_MODULE_0__Material_js__ = require('./19');
var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = require('./3');
function MeshDepthMaterial(parameters) {
  __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].call(this);
  this.type = 'MeshDepthMaterial';
  this.depthPacking = __WEBPACK_IMPORTED_MODULE_1__constants_js__['g'];
  this.skinning = false;
  this.morphTargets = false;
  this.map = null;
  this.alphaMap = null;
  this.displacementMap = null;
  this.displacementScale = 1;
  this.displacementBias = 0;
  this.wireframe = false;
  this.wireframeLinewidth = 1;
  this.fog = false;
  this.lights = false;
  this.setValues(parameters);
}
MeshDepthMaterial.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype);
MeshDepthMaterial.prototype.constructor = MeshDepthMaterial;
MeshDepthMaterial.prototype.isMeshDepthMaterial = true;
MeshDepthMaterial.prototype.copy = function (source) {
  __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype.copy.call(this, source);
  this.depthPacking = source.depthPacking;
  this.skinning = source.skinning;
  this.morphTargets = source.morphTargets;
  this.map = source.map;
  this.alphaMap = source.alphaMap;
  this.displacementMap = source.displacementMap;
  this.displacementScale = source.displacementScale;
  this.displacementBias = source.displacementBias;
  this.wireframe = source.wireframe;
  this.wireframeLinewidth = source.wireframeLinewidth;
  return this;
};