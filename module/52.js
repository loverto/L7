'use strict';
require.d(exports, 'a', function () {
  return Mesh;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__ = require('./8');
var __WEBPACK_IMPORTED_MODULE_2__math_Sphere_js__ = require('./13');
var __WEBPACK_IMPORTED_MODULE_3__math_Ray_js__ = require('./25');
var __WEBPACK_IMPORTED_MODULE_4__math_Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_5__core_Object3D_js__ = require('./5');
var __WEBPACK_IMPORTED_MODULE_6__math_Triangle_js__ = require('./206');
var __WEBPACK_IMPORTED_MODULE_7__core_Face3_js__ = require('./48');
var __WEBPACK_IMPORTED_MODULE_8__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_9__materials_MeshBasicMaterial_js__ = require('./50');
var __WEBPACK_IMPORTED_MODULE_10__core_BufferGeometry_js__ = require('./14');
function Mesh(geometry, material) {
  __WEBPACK_IMPORTED_MODULE_5__core_Object3D_js__['a'].call(this);
  this.type = 'Mesh';
  this.geometry = geometry !== undefined ? geometry : new __WEBPACK_IMPORTED_MODULE_10__core_BufferGeometry_js__['a']();
  this.material = material !== undefined ? material : new __WEBPACK_IMPORTED_MODULE_9__materials_MeshBasicMaterial_js__['a']({ color: Math.random() * 16777215 });
  this.drawMode = __WEBPACK_IMPORTED_MODULE_8__constants_js__['_73'];
  this.updateMorphTargets();
}
Mesh.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_5__core_Object3D_js__['a'].prototype), {
  constructor: Mesh,
  isMesh: true,
  setDrawMode: function (value) {
    this.drawMode = value;
  },
  copy: function (source) {
    __WEBPACK_IMPORTED_MODULE_5__core_Object3D_js__['a'].prototype.copy.call(this, source);
    this.drawMode = source.drawMode;
    if (source.morphTargetInfluences !== undefined) {
      this.morphTargetInfluences = source.morphTargetInfluences.slice();
    }
    if (source.morphTargetDictionary !== undefined) {
      this.morphTargetDictionary = Object.assign({}, source.morphTargetDictionary);
    }
    return this;
  },
  updateMorphTargets: function () {
    var geometry = this.geometry;
    var m, ml, name;
    if (geometry.isBufferGeometry) {
      var morphAttributes = geometry.morphAttributes;
      var keys = Object.keys(morphAttributes);
      if (keys.length > 0) {
        var morphAttribute = morphAttributes[keys[0]];
        if (morphAttribute !== undefined) {
          this.morphTargetInfluences = [];
          this.morphTargetDictionary = {};
          for (m = 0, ml = morphAttribute.length; m < ml; m++) {
            name = morphAttribute[m].name || String(m);
            this.morphTargetInfluences.push(0);
            this.morphTargetDictionary[name] = m;
          }
        }
      }
    } else {
      var morphTargets = geometry.morphTargets;
      if (morphTargets !== undefined && morphTargets.length > 0) {
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (m = 0, ml = morphTargets.length; m < ml; m++) {
          name = morphTargets[m].name || String(m);
          this.morphTargetInfluences.push(0);
          this.morphTargetDictionary[name] = m;
        }
      }
    }
  },
  raycast: function () {
    var inverseMatrix = new __WEBPACK_IMPORTED_MODULE_4__math_Matrix4_js__['a']();
    var ray = new __WEBPACK_IMPORTED_MODULE_3__math_Ray_js__['a']();
    var sphere = new __WEBPACK_IMPORTED_MODULE_2__math_Sphere_js__['a']();
    var vA = new __WEBPACK_IMPORTED_MODULE_0__math_Vector3_js__['a']();
    var vB = new __WEBPACK_IMPORTED_MODULE_0__math_Vector3_js__['a']();
    var vC = new __WEBPACK_IMPORTED_MODULE_0__math_Vector3_js__['a']();
    var tempA = new __WEBPACK_IMPORTED_MODULE_0__math_Vector3_js__['a']();
    var tempB = new __WEBPACK_IMPORTED_MODULE_0__math_Vector3_js__['a']();
    var tempC = new __WEBPACK_IMPORTED_MODULE_0__math_Vector3_js__['a']();
    var uvA = new __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__['a']();
    var uvB = new __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__['a']();
    var uvC = new __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__['a']();
    var intersectionPoint = new __WEBPACK_IMPORTED_MODULE_0__math_Vector3_js__['a']();
    var intersectionPointWorld = new __WEBPACK_IMPORTED_MODULE_0__math_Vector3_js__['a']();
    function checkIntersection(object, material, raycaster, ray, pA, pB, pC, point) {
      var intersect;
      if (material.side === __WEBPACK_IMPORTED_MODULE_8__constants_js__['f']) {
        intersect = ray.intersectTriangle(pC, pB, pA, true, point);
      } else {
        intersect = ray.intersectTriangle(pA, pB, pC, material.side !== __WEBPACK_IMPORTED_MODULE_8__constants_js__['w'], point);
      }
      if (intersect === null)
        return null;
      intersectionPointWorld.copy(point);
      intersectionPointWorld.applyMatrix4(object.matrixWorld);
      var distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);
      if (distance < raycaster.near || distance > raycaster.far)
        return null;
      return {
        distance: distance,
        point: intersectionPointWorld.clone(),
        object: object
      };
    }
    function checkBufferGeometryIntersection(object, material, raycaster, ray, position, uv, a, b, c) {
      vA.fromBufferAttribute(position, a);
      vB.fromBufferAttribute(position, b);
      vC.fromBufferAttribute(position, c);
      var intersection = checkIntersection(object, material, raycaster, ray, vA, vB, vC, intersectionPoint);
      if (intersection) {
        if (uv) {
          uvA.fromBufferAttribute(uv, a);
          uvB.fromBufferAttribute(uv, b);
          uvC.fromBufferAttribute(uv, c);
          intersection.uv = __WEBPACK_IMPORTED_MODULE_6__math_Triangle_js__['a'].getUV(intersectionPoint, vA, vB, vC, uvA, uvB, uvC, new __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__['a']());
        }
        var face = new __WEBPACK_IMPORTED_MODULE_7__core_Face3_js__['a'](a, b, c);
        __WEBPACK_IMPORTED_MODULE_6__math_Triangle_js__['a'].getNormal(vA, vB, vC, face.normal);
        intersection.face = face;
      }
      return intersection;
    }
    return function raycast(raycaster, intersects) {
      var geometry = this.geometry;
      var material = this.material;
      var matrixWorld = this.matrixWorld;
      if (material === undefined)
        return;
      if (geometry.boundingSphere === null)
        geometry.computeBoundingSphere();
      sphere.copy(geometry.boundingSphere);
      sphere.applyMatrix4(matrixWorld);
      if (raycaster.ray.intersectsSphere(sphere) === false)
        return;
      inverseMatrix.getInverse(matrixWorld);
      ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
      if (geometry.boundingBox !== null) {
        if (ray.intersectsBox(geometry.boundingBox) === false)
          return;
      }
      var intersection;
      if (geometry.isBufferGeometry) {
        var a, b, c;
        var index = geometry.index;
        var position = geometry.attributes.position;
        var uv = geometry.attributes.uv;
        var groups = geometry.groups;
        var drawRange = geometry.drawRange;
        var i, j, il, jl;
        var group, groupMaterial;
        var start, end;
        if (index !== null) {
          if (Array.isArray(material)) {
            for (i = 0, il = groups.length; i < il; i++) {
              group = groups[i];
              groupMaterial = material[group.materialIndex];
              start = Math.max(group.start, drawRange.start);
              end = Math.min(group.start + group.count, drawRange.start + drawRange.count);
              for (j = start, jl = end; j < jl; j += 3) {
                a = index.getX(j);
                b = index.getX(j + 1);
                c = index.getX(j + 2);
                intersection = checkBufferGeometryIntersection(this, groupMaterial, raycaster, ray, position, uv, a, b, c);
                if (intersection) {
                  intersection.faceIndex = Math.floor(j / 3);
                  intersects.push(intersection);
                }
              }
            }
          } else {
            start = Math.max(0, drawRange.start);
            end = Math.min(index.count, drawRange.start + drawRange.count);
            for (i = start, il = end; i < il; i += 3) {
              a = index.getX(i);
              b = index.getX(i + 1);
              c = index.getX(i + 2);
              intersection = checkBufferGeometryIntersection(this, material, raycaster, ray, position, uv, a, b, c);
              if (intersection) {
                intersection.faceIndex = Math.floor(i / 3);
                intersects.push(intersection);
              }
            }
          }
        } else if (position !== undefined) {
          if (Array.isArray(material)) {
            for (i = 0, il = groups.length; i < il; i++) {
              group = groups[i];
              groupMaterial = material[group.materialIndex];
              start = Math.max(group.start, drawRange.start);
              end = Math.min(group.start + group.count, drawRange.start + drawRange.count);
              for (j = start, jl = end; j < jl; j += 3) {
                a = j;
                b = j + 1;
                c = j + 2;
                intersection = checkBufferGeometryIntersection(this, groupMaterial, raycaster, ray, position, uv, a, b, c);
                if (intersection) {
                  intersection.faceIndex = Math.floor(j / 3);
                  intersects.push(intersection);
                }
              }
            }
          } else {
            start = Math.max(0, drawRange.start);
            end = Math.min(position.count, drawRange.start + drawRange.count);
            for (i = start, il = end; i < il; i += 3) {
              a = i;
              b = i + 1;
              c = i + 2;
              intersection = checkBufferGeometryIntersection(this, material, raycaster, ray, position, uv, a, b, c);
              if (intersection) {
                intersection.faceIndex = Math.floor(i / 3);
                intersects.push(intersection);
              }
            }
          }
        }
      } else if (geometry.isGeometry) {
        var fvA, fvB, fvC;
        var isMultiMaterial = Array.isArray(material);
        var vertices = geometry.vertices;
        var faces = geometry.faces;
        var uvs;
        var faceVertexUvs = geometry.faceVertexUvs[0];
        if (faceVertexUvs.length > 0)
          uvs = faceVertexUvs;
        for (var f = 0, fl = faces.length; f < fl; f++) {
          var face = faces[f];
          var faceMaterial = isMultiMaterial ? material[face.materialIndex] : material;
          if (faceMaterial === undefined)
            continue;
          fvA = vertices[face.a];
          fvB = vertices[face.b];
          fvC = vertices[face.c];
          if (faceMaterial.morphTargets === true) {
            var morphTargets = geometry.morphTargets;
            var morphInfluences = this.morphTargetInfluences;
            vA.set(0, 0, 0);
            vB.set(0, 0, 0);
            vC.set(0, 0, 0);
            for (var t = 0, tl = morphTargets.length; t < tl; t++) {
              var influence = morphInfluences[t];
              if (influence === 0)
                continue;
              var targets = morphTargets[t].vertices;
              vA.addScaledVector(tempA.subVectors(targets[face.a], fvA), influence);
              vB.addScaledVector(tempB.subVectors(targets[face.b], fvB), influence);
              vC.addScaledVector(tempC.subVectors(targets[face.c], fvC), influence);
            }
            vA.add(fvA);
            vB.add(fvB);
            vC.add(fvC);
            fvA = vA;
            fvB = vB;
            fvC = vC;
          }
          intersection = checkIntersection(this, faceMaterial, raycaster, ray, fvA, fvB, fvC, intersectionPoint);
          if (intersection) {
            if (uvs && uvs[f]) {
              var uvs_f = uvs[f];
              uvA.copy(uvs_f[0]);
              uvB.copy(uvs_f[1]);
              uvC.copy(uvs_f[2]);
              intersection.uv = __WEBPACK_IMPORTED_MODULE_6__math_Triangle_js__['a'].getUV(intersectionPoint, fvA, fvB, fvC, uvA, uvB, uvC, new __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__['a']());
            }
            intersection.face = face;
            intersection.faceIndex = f;
            intersects.push(intersection);
          }
        }
      }
    };
  }(),
  clone: function () {
    return new this.constructor(this.geometry, this.material).copy(this);
  }
});