'use strict';
require.d(exports, 'a', function () {
  return MeshDistanceMaterial;
});
var __WEBPACK_IMPORTED_MODULE_0__Material_js__ = require('./19');
var __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__ = require('./0');
function MeshDistanceMaterial(parameters) {
  __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].call(this);
  this.type = 'MeshDistanceMaterial';
  this.referencePosition = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
  this.nearDistance = 1;
  this.farDistance = 1000;
  this.skinning = false;
  this.morphTargets = false;
  this.map = null;
  this.alphaMap = null;
  this.displacementMap = null;
  this.displacementScale = 1;
  this.displacementBias = 0;
  this.fog = false;
  this.lights = false;
  this.setValues(parameters);
}
MeshDistanceMaterial.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype);
MeshDistanceMaterial.prototype.constructor = MeshDistanceMaterial;
MeshDistanceMaterial.prototype.isMeshDistanceMaterial = true;
MeshDistanceMaterial.prototype.copy = function (source) {
  __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype.copy.call(this, source);
  this.referencePosition.copy(source.referencePosition);
  this.nearDistance = source.nearDistance;
  this.farDistance = source.farDistance;
  this.skinning = source.skinning;
  this.morphTargets = source.morphTargets;
  this.map = source.map;
  this.alphaMap = source.alphaMap;
  this.displacementMap = source.displacementMap;
  this.displacementScale = source.displacementScale;
  this.displacementBias = source.displacementBias;
  return this;
};