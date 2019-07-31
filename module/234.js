'use strict';
require.d(exports, 'a', function () {
  return Points;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Sphere_js__ = require('./13');
var __WEBPACK_IMPORTED_MODULE_1__math_Ray_js__ = require('./25');
var __WEBPACK_IMPORTED_MODULE_2__math_Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_3__core_Object3D_js__ = require('./5');
var __WEBPACK_IMPORTED_MODULE_4__math_Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_5__materials_PointsMaterial_js__ = require('./57');
var __WEBPACK_IMPORTED_MODULE_6__core_BufferGeometry_js__ = require('./14');
function Points(geometry, material) {
  __WEBPACK_IMPORTED_MODULE_3__core_Object3D_js__['a'].call(this);
  this.type = 'Points';
  this.geometry = geometry !== undefined ? geometry : new __WEBPACK_IMPORTED_MODULE_6__core_BufferGeometry_js__['a']();
  this.material = material !== undefined ? material : new __WEBPACK_IMPORTED_MODULE_5__materials_PointsMaterial_js__['a']({ color: Math.random() * 16777215 });
}
Points.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_3__core_Object3D_js__['a'].prototype), {
  constructor: Points,
  isPoints: true,
  raycast: function () {
    var inverseMatrix = new __WEBPACK_IMPORTED_MODULE_2__math_Matrix4_js__['a']();
    var ray = new __WEBPACK_IMPORTED_MODULE_1__math_Ray_js__['a']();
    var sphere = new __WEBPACK_IMPORTED_MODULE_0__math_Sphere_js__['a']();
    return function raycast(raycaster, intersects) {
      var object = this;
      var geometry = this.geometry;
      var matrixWorld = this.matrixWorld;
      var threshold = raycaster.params.Points.threshold;
      if (geometry.boundingSphere === null)
        geometry.computeBoundingSphere();
      sphere.copy(geometry.boundingSphere);
      sphere.applyMatrix4(matrixWorld);
      sphere.radius += threshold;
      if (raycaster.ray.intersectsSphere(sphere) === false)
        return;
      inverseMatrix.getInverse(matrixWorld);
      ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
      var localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
      var localThresholdSq = localThreshold * localThreshold;
      var position = new __WEBPACK_IMPORTED_MODULE_4__math_Vector3_js__['a']();
      var intersectPoint = new __WEBPACK_IMPORTED_MODULE_4__math_Vector3_js__['a']();
      function testPoint(point, index) {
        var rayPointDistanceSq = ray.distanceSqToPoint(point);
        if (rayPointDistanceSq < localThresholdSq) {
          ray.closestPointToPoint(point, intersectPoint);
          intersectPoint.applyMatrix4(matrixWorld);
          var distance = raycaster.ray.origin.distanceTo(intersectPoint);
          if (distance < raycaster.near || distance > raycaster.far)
            return;
          intersects.push({
            distance: distance,
            distanceToRay: Math.sqrt(rayPointDistanceSq),
            point: intersectPoint.clone(),
            index: index,
            face: null,
            object: object
          });
        }
      }
      if (geometry.isBufferGeometry) {
        var index = geometry.index;
        var attributes = geometry.attributes;
        var positions = attributes.position.array;
        if (index !== null) {
          var indices = index.array;
          for (var i = 0, il = indices.length; i < il; i++) {
            var a = indices[i];
            position.fromArray(positions, a * 3);
            testPoint(position, a);
          }
        } else {
          for (var i = 0, l = positions.length / 3; i < l; i++) {
            position.fromArray(positions, i * 3);
            testPoint(position, i);
          }
        }
      } else {
        var vertices = geometry.vertices;
        for (var i = 0, l = vertices.length; i < l; i++) {
          testPoint(vertices[i], i);
        }
      }
    };
  }(),
  clone: function () {
    return new this.constructor(this.geometry, this.material).copy(this);
  }
});