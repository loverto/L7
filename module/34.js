'use strict';
require.d(exports, 'a', function () {
  return Line;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Sphere_js__ = require('./13');
var __WEBPACK_IMPORTED_MODULE_1__math_Ray_js__ = require('./25');
var __WEBPACK_IMPORTED_MODULE_2__math_Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_3__core_Object3D_js__ = require('./5');
var __WEBPACK_IMPORTED_MODULE_4__math_Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_5__materials_LineBasicMaterial_js__ = require('./58');
var __WEBPACK_IMPORTED_MODULE_6__core_BufferGeometry_js__ = require('./14');
var __WEBPACK_IMPORTED_MODULE_7__core_BufferAttribute_js__ = require('./15');
function Line(geometry, material, mode) {
  if (mode === 1) {
    console.error('THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead.');
  }
  __WEBPACK_IMPORTED_MODULE_3__core_Object3D_js__['a'].call(this);
  this.type = 'Line';
  this.geometry = geometry !== undefined ? geometry : new __WEBPACK_IMPORTED_MODULE_6__core_BufferGeometry_js__['a']();
  this.material = material !== undefined ? material : new __WEBPACK_IMPORTED_MODULE_5__materials_LineBasicMaterial_js__['a']({ color: Math.random() * 16777215 });
}
Line.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_3__core_Object3D_js__['a'].prototype), {
  constructor: Line,
  isLine: true,
  computeLineDistances: function () {
    var start = new __WEBPACK_IMPORTED_MODULE_4__math_Vector3_js__['a']();
    var end = new __WEBPACK_IMPORTED_MODULE_4__math_Vector3_js__['a']();
    return function computeLineDistances() {
      var geometry = this.geometry;
      if (geometry.isBufferGeometry) {
        if (geometry.index === null) {
          var positionAttribute = geometry.attributes.position;
          var lineDistances = [0];
          for (var i = 1, l = positionAttribute.count; i < l; i++) {
            start.fromBufferAttribute(positionAttribute, i - 1);
            end.fromBufferAttribute(positionAttribute, i);
            lineDistances[i] = lineDistances[i - 1];
            lineDistances[i] += start.distanceTo(end);
          }
          geometry.addAttribute('lineDistance', new __WEBPACK_IMPORTED_MODULE_7__core_BufferAttribute_js__['b'](lineDistances, 1));
        } else {
          console.warn('THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.');
        }
      } else if (geometry.isGeometry) {
        var vertices = geometry.vertices;
        var lineDistances = geometry.lineDistances;
        lineDistances[0] = 0;
        for (var i = 1, l = vertices.length; i < l; i++) {
          lineDistances[i] = lineDistances[i - 1];
          lineDistances[i] += vertices[i - 1].distanceTo(vertices[i]);
        }
      }
      return this;
    };
  }(),
  raycast: function () {
    var inverseMatrix = new __WEBPACK_IMPORTED_MODULE_2__math_Matrix4_js__['a']();
    var ray = new __WEBPACK_IMPORTED_MODULE_1__math_Ray_js__['a']();
    var sphere = new __WEBPACK_IMPORTED_MODULE_0__math_Sphere_js__['a']();
    return function raycast(raycaster, intersects) {
      var precision = raycaster.linePrecision;
      var geometry = this.geometry;
      var matrixWorld = this.matrixWorld;
      if (geometry.boundingSphere === null)
        geometry.computeBoundingSphere();
      sphere.copy(geometry.boundingSphere);
      sphere.applyMatrix4(matrixWorld);
      sphere.radius += precision;
      if (raycaster.ray.intersectsSphere(sphere) === false)
        return;
      inverseMatrix.getInverse(matrixWorld);
      ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
      var localPrecision = precision / ((this.scale.x + this.scale.y + this.scale.z) / 3);
      var localPrecisionSq = localPrecision * localPrecision;
      var vStart = new __WEBPACK_IMPORTED_MODULE_4__math_Vector3_js__['a']();
      var vEnd = new __WEBPACK_IMPORTED_MODULE_4__math_Vector3_js__['a']();
      var interSegment = new __WEBPACK_IMPORTED_MODULE_4__math_Vector3_js__['a']();
      var interRay = new __WEBPACK_IMPORTED_MODULE_4__math_Vector3_js__['a']();
      var step = this && this.isLineSegments ? 2 : 1;
      if (geometry.isBufferGeometry) {
        var index = geometry.index;
        var attributes = geometry.attributes;
        var positions = attributes.position.array;
        if (index !== null) {
          var indices = index.array;
          for (var i = 0, l = indices.length - 1; i < l; i += step) {
            var a = indices[i];
            var b = indices[i + 1];
            vStart.fromArray(positions, a * 3);
            vEnd.fromArray(positions, b * 3);
            var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);
            if (distSq > localPrecisionSq)
              continue;
            interRay.applyMatrix4(this.matrixWorld);
            var distance = raycaster.ray.origin.distanceTo(interRay);
            if (distance < raycaster.near || distance > raycaster.far)
              continue;
            intersects.push({
              distance: distance,
              point: interSegment.clone().applyMatrix4(this.matrixWorld),
              index: i,
              face: null,
              faceIndex: null,
              object: this
            });
          }
        } else {
          for (var i = 0, l = positions.length / 3 - 1; i < l; i += step) {
            vStart.fromArray(positions, 3 * i);
            vEnd.fromArray(positions, 3 * i + 3);
            var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);
            if (distSq > localPrecisionSq)
              continue;
            interRay.applyMatrix4(this.matrixWorld);
            var distance = raycaster.ray.origin.distanceTo(interRay);
            if (distance < raycaster.near || distance > raycaster.far)
              continue;
            intersects.push({
              distance: distance,
              point: interSegment.clone().applyMatrix4(this.matrixWorld),
              index: i,
              face: null,
              faceIndex: null,
              object: this
            });
          }
        }
      } else if (geometry.isGeometry) {
        var vertices = geometry.vertices;
        var nbVertices = vertices.length;
        for (var i = 0; i < nbVertices - 1; i += step) {
          var distSq = ray.distanceSqToSegment(vertices[i], vertices[i + 1], interRay, interSegment);
          if (distSq > localPrecisionSq)
            continue;
          interRay.applyMatrix4(this.matrixWorld);
          var distance = raycaster.ray.origin.distanceTo(interRay);
          if (distance < raycaster.near || distance > raycaster.far)
            continue;
          intersects.push({
            distance: distance,
            point: interSegment.clone().applyMatrix4(this.matrixWorld),
            index: i,
            face: null,
            faceIndex: null,
            object: this
          });
        }
      }
    };
  }(),
  clone: function () {
    return new this.constructor(this.geometry, this.material).copy(this);
  }
});