'use strict';
require.d(exports, 'a', function () {
  return Geometry;
});
var __WEBPACK_IMPORTED_MODULE_0__EventDispatcher_js__ = require('./18');
var __WEBPACK_IMPORTED_MODULE_1__Face3_js__ = require('./48');
var __WEBPACK_IMPORTED_MODULE_2__math_Matrix3_js__ = require('./9');
var __WEBPACK_IMPORTED_MODULE_3__math_Sphere_js__ = require('./13');
var __WEBPACK_IMPORTED_MODULE_4__math_Box3_js__ = require('./31');
var __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_6__math_Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_7__math_Vector2_js__ = require('./8');
var __WEBPACK_IMPORTED_MODULE_8__math_Color_js__ = require('./7');
var __WEBPACK_IMPORTED_MODULE_9__Object3D_js__ = require('./5');
var __WEBPACK_IMPORTED_MODULE_10__math_Math_js__ = require('./6');
var geometryId = 0;
function Geometry() {
  Object.defineProperty(this, 'id', { value: geometryId += 2 });
  this.uuid = __WEBPACK_IMPORTED_MODULE_10__math_Math_js__['a'].generateUUID();
  this.name = '';
  this.type = 'Geometry';
  this.vertices = [];
  this.colors = [];
  this.faces = [];
  this.faceVertexUvs = [[]];
  this.morphTargets = [];
  this.morphNormals = [];
  this.skinWeights = [];
  this.skinIndices = [];
  this.lineDistances = [];
  this.boundingBox = null;
  this.boundingSphere = null;
  this.elementsNeedUpdate = false;
  this.verticesNeedUpdate = false;
  this.uvsNeedUpdate = false;
  this.normalsNeedUpdate = false;
  this.colorsNeedUpdate = false;
  this.lineDistancesNeedUpdate = false;
  this.groupsNeedUpdate = false;
}
Geometry.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__EventDispatcher_js__['a'].prototype), {
  constructor: Geometry,
  isGeometry: true,
  applyMatrix: function (matrix) {
    var normalMatrix = new __WEBPACK_IMPORTED_MODULE_2__math_Matrix3_js__['a']().getNormalMatrix(matrix);
    for (var i = 0, il = this.vertices.length; i < il; i++) {
      var vertex = this.vertices[i];
      vertex.applyMatrix4(matrix);
    }
    for (var i = 0, il = this.faces.length; i < il; i++) {
      var face = this.faces[i];
      face.normal.applyMatrix3(normalMatrix).normalize();
      for (var j = 0, jl = face.vertexNormals.length; j < jl; j++) {
        face.vertexNormals[j].applyMatrix3(normalMatrix).normalize();
      }
    }
    if (this.boundingBox !== null) {
      this.computeBoundingBox();
    }
    if (this.boundingSphere !== null) {
      this.computeBoundingSphere();
    }
    this.verticesNeedUpdate = true;
    this.normalsNeedUpdate = true;
    return this;
  },
  rotateX: function () {
    var m1 = new __WEBPACK_IMPORTED_MODULE_6__math_Matrix4_js__['a']();
    return function rotateX(angle) {
      m1.makeRotationX(angle);
      this.applyMatrix(m1);
      return this;
    };
  }(),
  rotateY: function () {
    var m1 = new __WEBPACK_IMPORTED_MODULE_6__math_Matrix4_js__['a']();
    return function rotateY(angle) {
      m1.makeRotationY(angle);
      this.applyMatrix(m1);
      return this;
    };
  }(),
  rotateZ: function () {
    var m1 = new __WEBPACK_IMPORTED_MODULE_6__math_Matrix4_js__['a']();
    return function rotateZ(angle) {
      m1.makeRotationZ(angle);
      this.applyMatrix(m1);
      return this;
    };
  }(),
  translate: function () {
    var m1 = new __WEBPACK_IMPORTED_MODULE_6__math_Matrix4_js__['a']();
    return function translate(x, y, z) {
      m1.makeTranslation(x, y, z);
      this.applyMatrix(m1);
      return this;
    };
  }(),
  scale: function () {
    var m1 = new __WEBPACK_IMPORTED_MODULE_6__math_Matrix4_js__['a']();
    return function scale(x, y, z) {
      m1.makeScale(x, y, z);
      this.applyMatrix(m1);
      return this;
    };
  }(),
  lookAt: function () {
    var obj = new __WEBPACK_IMPORTED_MODULE_9__Object3D_js__['a']();
    return function lookAt(vector) {
      obj.lookAt(vector);
      obj.updateMatrix();
      this.applyMatrix(obj.matrix);
    };
  }(),
  fromBufferGeometry: function (geometry) {
    var scope = this;
    var indices = geometry.index !== null ? geometry.index.array : undefined;
    var attributes = geometry.attributes;
    var positions = attributes.position.array;
    var normals = attributes.normal !== undefined ? attributes.normal.array : undefined;
    var colors = attributes.color !== undefined ? attributes.color.array : undefined;
    var uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;
    var uvs2 = attributes.uv2 !== undefined ? attributes.uv2.array : undefined;
    if (uvs2 !== undefined)
      this.faceVertexUvs[1] = [];
    var tempNormals = [];
    var tempUVs = [];
    var tempUVs2 = [];
    for (var i = 0, j = 0; i < positions.length; i += 3, j += 2) {
      scope.vertices.push(new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](positions[i], positions[i + 1], positions[i + 2]));
      if (normals !== undefined) {
        tempNormals.push(new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](normals[i], normals[i + 1], normals[i + 2]));
      }
      if (colors !== undefined) {
        scope.colors.push(new __WEBPACK_IMPORTED_MODULE_8__math_Color_js__['a'](colors[i], colors[i + 1], colors[i + 2]));
      }
      if (uvs !== undefined) {
        tempUVs.push(new __WEBPACK_IMPORTED_MODULE_7__math_Vector2_js__['a'](uvs[j], uvs[j + 1]));
      }
      if (uvs2 !== undefined) {
        tempUVs2.push(new __WEBPACK_IMPORTED_MODULE_7__math_Vector2_js__['a'](uvs2[j], uvs2[j + 1]));
      }
    }
    function addFace(a, b, c, materialIndex) {
      var vertexNormals = normals !== undefined ? [
        tempNormals[a].clone(),
        tempNormals[b].clone(),
        tempNormals[c].clone()
      ] : [];
      var vertexColors = colors !== undefined ? [
        scope.colors[a].clone(),
        scope.colors[b].clone(),
        scope.colors[c].clone()
      ] : [];
      var face = new __WEBPACK_IMPORTED_MODULE_1__Face3_js__['a'](a, b, c, vertexNormals, vertexColors, materialIndex);
      scope.faces.push(face);
      if (uvs !== undefined) {
        scope.faceVertexUvs[0].push([
          tempUVs[a].clone(),
          tempUVs[b].clone(),
          tempUVs[c].clone()
        ]);
      }
      if (uvs2 !== undefined) {
        scope.faceVertexUvs[1].push([
          tempUVs2[a].clone(),
          tempUVs2[b].clone(),
          tempUVs2[c].clone()
        ]);
      }
    }
    var groups = geometry.groups;
    if (groups.length > 0) {
      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        var start = group.start;
        var count = group.count;
        for (var j = start, jl = start + count; j < jl; j += 3) {
          if (indices !== undefined) {
            addFace(indices[j], indices[j + 1], indices[j + 2], group.materialIndex);
          } else {
            addFace(j, j + 1, j + 2, group.materialIndex);
          }
        }
      }
    } else {
      if (indices !== undefined) {
        for (var i = 0; i < indices.length; i += 3) {
          addFace(indices[i], indices[i + 1], indices[i + 2]);
        }
      } else {
        for (var i = 0; i < positions.length / 3; i += 3) {
          addFace(i, i + 1, i + 2);
        }
      }
    }
    this.computeFaceNormals();
    if (geometry.boundingBox !== null) {
      this.boundingBox = geometry.boundingBox.clone();
    }
    if (geometry.boundingSphere !== null) {
      this.boundingSphere = geometry.boundingSphere.clone();
    }
    return this;
  },
  center: function () {
    var offset = new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a']();
    return function center() {
      this.computeBoundingBox();
      this.boundingBox.getCenter(offset).negate();
      this.translate(offset.x, offset.y, offset.z);
      return this;
    };
  }(),
  normalize: function () {
    this.computeBoundingSphere();
    var center = this.boundingSphere.center;
    var radius = this.boundingSphere.radius;
    var s = radius === 0 ? 1 : 1 / radius;
    var matrix = new __WEBPACK_IMPORTED_MODULE_6__math_Matrix4_js__['a']();
    matrix.set(s, 0, 0, -s * center.x, 0, s, 0, -s * center.y, 0, 0, s, -s * center.z, 0, 0, 0, 1);
    this.applyMatrix(matrix);
    return this;
  },
  computeFaceNormals: function () {
    var cb = new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](), ab = new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a']();
    for (var f = 0, fl = this.faces.length; f < fl; f++) {
      var face = this.faces[f];
      var vA = this.vertices[face.a];
      var vB = this.vertices[face.b];
      var vC = this.vertices[face.c];
      cb.subVectors(vC, vB);
      ab.subVectors(vA, vB);
      cb.cross(ab);
      cb.normalize();
      face.normal.copy(cb);
    }
  },
  computeVertexNormals: function (areaWeighted) {
    if (areaWeighted === undefined)
      areaWeighted = true;
    var v, vl, f, fl, face, vertices;
    vertices = new Array(this.vertices.length);
    for (v = 0, vl = this.vertices.length; v < vl; v++) {
      vertices[v] = new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a']();
    }
    if (areaWeighted) {
      var vA, vB, vC;
      var cb = new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](), ab = new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a']();
      for (f = 0, fl = this.faces.length; f < fl; f++) {
        face = this.faces[f];
        vA = this.vertices[face.a];
        vB = this.vertices[face.b];
        vC = this.vertices[face.c];
        cb.subVectors(vC, vB);
        ab.subVectors(vA, vB);
        cb.cross(ab);
        vertices[face.a].add(cb);
        vertices[face.b].add(cb);
        vertices[face.c].add(cb);
      }
    } else {
      this.computeFaceNormals();
      for (f = 0, fl = this.faces.length; f < fl; f++) {
        face = this.faces[f];
        vertices[face.a].add(face.normal);
        vertices[face.b].add(face.normal);
        vertices[face.c].add(face.normal);
      }
    }
    for (v = 0, vl = this.vertices.length; v < vl; v++) {
      vertices[v].normalize();
    }
    for (f = 0, fl = this.faces.length; f < fl; f++) {
      face = this.faces[f];
      var vertexNormals = face.vertexNormals;
      if (vertexNormals.length === 3) {
        vertexNormals[0].copy(vertices[face.a]);
        vertexNormals[1].copy(vertices[face.b]);
        vertexNormals[2].copy(vertices[face.c]);
      } else {
        vertexNormals[0] = vertices[face.a].clone();
        vertexNormals[1] = vertices[face.b].clone();
        vertexNormals[2] = vertices[face.c].clone();
      }
    }
    if (this.faces.length > 0) {
      this.normalsNeedUpdate = true;
    }
  },
  computeFlatVertexNormals: function () {
    var f, fl, face;
    this.computeFaceNormals();
    for (f = 0, fl = this.faces.length; f < fl; f++) {
      face = this.faces[f];
      var vertexNormals = face.vertexNormals;
      if (vertexNormals.length === 3) {
        vertexNormals[0].copy(face.normal);
        vertexNormals[1].copy(face.normal);
        vertexNormals[2].copy(face.normal);
      } else {
        vertexNormals[0] = face.normal.clone();
        vertexNormals[1] = face.normal.clone();
        vertexNormals[2] = face.normal.clone();
      }
    }
    if (this.faces.length > 0) {
      this.normalsNeedUpdate = true;
    }
  },
  computeMorphNormals: function () {
    var i, il, f, fl, face;
    for (f = 0, fl = this.faces.length; f < fl; f++) {
      face = this.faces[f];
      if (!face.__originalFaceNormal) {
        face.__originalFaceNormal = face.normal.clone();
      } else {
        face.__originalFaceNormal.copy(face.normal);
      }
      if (!face.__originalVertexNormals)
        face.__originalVertexNormals = [];
      for (i = 0, il = face.vertexNormals.length; i < il; i++) {
        if (!face.__originalVertexNormals[i]) {
          face.__originalVertexNormals[i] = face.vertexNormals[i].clone();
        } else {
          face.__originalVertexNormals[i].copy(face.vertexNormals[i]);
        }
      }
    }
    var tmpGeo = new Geometry();
    tmpGeo.faces = this.faces;
    for (i = 0, il = this.morphTargets.length; i < il; i++) {
      if (!this.morphNormals[i]) {
        this.morphNormals[i] = {};
        this.morphNormals[i].faceNormals = [];
        this.morphNormals[i].vertexNormals = [];
        var dstNormalsFace = this.morphNormals[i].faceNormals;
        var dstNormalsVertex = this.morphNormals[i].vertexNormals;
        var faceNormal, vertexNormals;
        for (f = 0, fl = this.faces.length; f < fl; f++) {
          faceNormal = new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a']();
          vertexNormals = {
            a: new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](),
            b: new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](),
            c: new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a']()
          };
          dstNormalsFace.push(faceNormal);
          dstNormalsVertex.push(vertexNormals);
        }
      }
      var morphNormals = this.morphNormals[i];
      tmpGeo.vertices = this.morphTargets[i].vertices;
      tmpGeo.computeFaceNormals();
      tmpGeo.computeVertexNormals();
      var faceNormal, vertexNormals;
      for (f = 0, fl = this.faces.length; f < fl; f++) {
        face = this.faces[f];
        faceNormal = morphNormals.faceNormals[f];
        vertexNormals = morphNormals.vertexNormals[f];
        faceNormal.copy(face.normal);
        vertexNormals.a.copy(face.vertexNormals[0]);
        vertexNormals.b.copy(face.vertexNormals[1]);
        vertexNormals.c.copy(face.vertexNormals[2]);
      }
    }
    for (f = 0, fl = this.faces.length; f < fl; f++) {
      face = this.faces[f];
      face.normal = face.__originalFaceNormal;
      face.vertexNormals = face.__originalVertexNormals;
    }
  },
  computeBoundingBox: function () {
    if (this.boundingBox === null) {
      this.boundingBox = new __WEBPACK_IMPORTED_MODULE_4__math_Box3_js__['a']();
    }
    this.boundingBox.setFromPoints(this.vertices);
  },
  computeBoundingSphere: function () {
    if (this.boundingSphere === null) {
      this.boundingSphere = new __WEBPACK_IMPORTED_MODULE_3__math_Sphere_js__['a']();
    }
    this.boundingSphere.setFromPoints(this.vertices);
  },
  merge: function (geometry, matrix, materialIndexOffset) {
    if (!(geometry && geometry.isGeometry)) {
      console.error('THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry);
      return;
    }
    var normalMatrix, vertexOffset = this.vertices.length, vertices1 = this.vertices, vertices2 = geometry.vertices, faces1 = this.faces, faces2 = geometry.faces, uvs1 = this.faceVertexUvs[0], uvs2 = geometry.faceVertexUvs[0], colors1 = this.colors, colors2 = geometry.colors;
    if (materialIndexOffset === undefined)
      materialIndexOffset = 0;
    if (matrix !== undefined) {
      normalMatrix = new __WEBPACK_IMPORTED_MODULE_2__math_Matrix3_js__['a']().getNormalMatrix(matrix);
    }
    for (var i = 0, il = vertices2.length; i < il; i++) {
      var vertex = vertices2[i];
      var vertexCopy = vertex.clone();
      if (matrix !== undefined)
        vertexCopy.applyMatrix4(matrix);
      vertices1.push(vertexCopy);
    }
    for (var i = 0, il = colors2.length; i < il; i++) {
      colors1.push(colors2[i].clone());
    }
    for (i = 0, il = faces2.length; i < il; i++) {
      var face = faces2[i], faceCopy, normal, color, faceVertexNormals = face.vertexNormals, faceVertexColors = face.vertexColors;
      faceCopy = new __WEBPACK_IMPORTED_MODULE_1__Face3_js__['a'](face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset);
      faceCopy.normal.copy(face.normal);
      if (normalMatrix !== undefined) {
        faceCopy.normal.applyMatrix3(normalMatrix).normalize();
      }
      for (var j = 0, jl = faceVertexNormals.length; j < jl; j++) {
        normal = faceVertexNormals[j].clone();
        if (normalMatrix !== undefined) {
          normal.applyMatrix3(normalMatrix).normalize();
        }
        faceCopy.vertexNormals.push(normal);
      }
      faceCopy.color.copy(face.color);
      for (var j = 0, jl = faceVertexColors.length; j < jl; j++) {
        color = faceVertexColors[j];
        faceCopy.vertexColors.push(color.clone());
      }
      faceCopy.materialIndex = face.materialIndex + materialIndexOffset;
      faces1.push(faceCopy);
    }
    for (i = 0, il = uvs2.length; i < il; i++) {
      var uv = uvs2[i], uvCopy = [];
      if (uv === undefined) {
        continue;
      }
      for (var j = 0, jl = uv.length; j < jl; j++) {
        uvCopy.push(uv[j].clone());
      }
      uvs1.push(uvCopy);
    }
  },
  mergeMesh: function (mesh) {
    if (!(mesh && mesh.isMesh)) {
      console.error('THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.', mesh);
      return;
    }
    if (mesh.matrixAutoUpdate)
      mesh.updateMatrix();
    this.merge(mesh.geometry, mesh.matrix);
  },
  mergeVertices: function () {
    var verticesMap = {};
    var unique = [], changes = [];
    var v, key;
    var precisionPoints = 4;
    var precision = Math.pow(10, precisionPoints);
    var i, il, face;
    var indices, j, jl;
    for (i = 0, il = this.vertices.length; i < il; i++) {
      v = this.vertices[i];
      key = Math.round(v.x * precision) + '_' + Math.round(v.y * precision) + '_' + Math.round(v.z * precision);
      if (verticesMap[key] === undefined) {
        verticesMap[key] = i;
        unique.push(this.vertices[i]);
        changes[i] = unique.length - 1;
      } else {
        changes[i] = changes[verticesMap[key]];
      }
    }
    var faceIndicesToRemove = [];
    for (i = 0, il = this.faces.length; i < il; i++) {
      face = this.faces[i];
      face.a = changes[face.a];
      face.b = changes[face.b];
      face.c = changes[face.c];
      indices = [
        face.a,
        face.b,
        face.c
      ];
      for (var n = 0; n < 3; n++) {
        if (indices[n] === indices[(n + 1) % 3]) {
          faceIndicesToRemove.push(i);
          break;
        }
      }
    }
    for (i = faceIndicesToRemove.length - 1; i >= 0; i--) {
      var idx = faceIndicesToRemove[i];
      this.faces.splice(idx, 1);
      for (j = 0, jl = this.faceVertexUvs.length; j < jl; j++) {
        this.faceVertexUvs[j].splice(idx, 1);
      }
    }
    var diff = this.vertices.length - unique.length;
    this.vertices = unique;
    return diff;
  },
  setFromPoints: function (points) {
    this.vertices = [];
    for (var i = 0, l = points.length; i < l; i++) {
      var point = points[i];
      this.vertices.push(new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](point.x, point.y, point.z || 0));
    }
    return this;
  },
  sortFacesByMaterialIndex: function () {
    var faces = this.faces;
    var length = faces.length;
    for (var i = 0; i < length; i++) {
      faces[i]._id = i;
    }
    function materialIndexSort(a, b) {
      return a.materialIndex - b.materialIndex;
    }
    faces.sort(materialIndexSort);
    var uvs1 = this.faceVertexUvs[0];
    var uvs2 = this.faceVertexUvs[1];
    var newUvs1, newUvs2;
    if (uvs1 && uvs1.length === length)
      newUvs1 = [];
    if (uvs2 && uvs2.length === length)
      newUvs2 = [];
    for (var i = 0; i < length; i++) {
      var id = faces[i]._id;
      if (newUvs1)
        newUvs1.push(uvs1[id]);
      if (newUvs2)
        newUvs2.push(uvs2[id]);
    }
    if (newUvs1)
      this.faceVertexUvs[0] = newUvs1;
    if (newUvs2)
      this.faceVertexUvs[1] = newUvs2;
  },
  toJSON: function () {
    var data = {
      metadata: {
        version: 4.5,
        type: 'Geometry',
        generator: 'Geometry.toJSON'
      }
    };
    data.uuid = this.uuid;
    data.type = this.type;
    if (this.name !== '')
      data.name = this.name;
    if (this.parameters !== undefined) {
      var parameters = this.parameters;
      for (var key in parameters) {
        if (parameters[key] !== undefined)
          data[key] = parameters[key];
      }
      return data;
    }
    var vertices = [];
    for (var i = 0; i < this.vertices.length; i++) {
      var vertex = this.vertices[i];
      vertices.push(vertex.x, vertex.y, vertex.z);
    }
    var faces = [];
    var normals = [];
    var normalsHash = {};
    var colors = [];
    var colorsHash = {};
    var uvs = [];
    var uvsHash = {};
    for (var i = 0; i < this.faces.length; i++) {
      var face = this.faces[i];
      var hasMaterial = true;
      var hasFaceUv = false;
      var hasFaceVertexUv = this.faceVertexUvs[0][i] !== undefined;
      var hasFaceNormal = face.normal.length() > 0;
      var hasFaceVertexNormal = face.vertexNormals.length > 0;
      var hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
      var hasFaceVertexColor = face.vertexColors.length > 0;
      var faceType = 0;
      faceType = setBit(faceType, 0, 0);
      faceType = setBit(faceType, 1, hasMaterial);
      faceType = setBit(faceType, 2, hasFaceUv);
      faceType = setBit(faceType, 3, hasFaceVertexUv);
      faceType = setBit(faceType, 4, hasFaceNormal);
      faceType = setBit(faceType, 5, hasFaceVertexNormal);
      faceType = setBit(faceType, 6, hasFaceColor);
      faceType = setBit(faceType, 7, hasFaceVertexColor);
      faces.push(faceType);
      faces.push(face.a, face.b, face.c);
      faces.push(face.materialIndex);
      if (hasFaceVertexUv) {
        var faceVertexUvs = this.faceVertexUvs[0][i];
        faces.push(getUvIndex(faceVertexUvs[0]), getUvIndex(faceVertexUvs[1]), getUvIndex(faceVertexUvs[2]));
      }
      if (hasFaceNormal) {
        faces.push(getNormalIndex(face.normal));
      }
      if (hasFaceVertexNormal) {
        var vertexNormals = face.vertexNormals;
        faces.push(getNormalIndex(vertexNormals[0]), getNormalIndex(vertexNormals[1]), getNormalIndex(vertexNormals[2]));
      }
      if (hasFaceColor) {
        faces.push(getColorIndex(face.color));
      }
      if (hasFaceVertexColor) {
        var vertexColors = face.vertexColors;
        faces.push(getColorIndex(vertexColors[0]), getColorIndex(vertexColors[1]), getColorIndex(vertexColors[2]));
      }
    }
    function setBit(value, position, enabled) {
      return enabled ? value | 1 << position : value & ~(1 << position);
    }
    function getNormalIndex(normal) {
      var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();
      if (normalsHash[hash] !== undefined) {
        return normalsHash[hash];
      }
      normalsHash[hash] = normals.length / 3;
      normals.push(normal.x, normal.y, normal.z);
      return normalsHash[hash];
    }
    function getColorIndex(color) {
      var hash = color.r.toString() + color.g.toString() + color.b.toString();
      if (colorsHash[hash] !== undefined) {
        return colorsHash[hash];
      }
      colorsHash[hash] = colors.length;
      colors.push(color.getHex());
      return colorsHash[hash];
    }
    function getUvIndex(uv) {
      var hash = uv.x.toString() + uv.y.toString();
      if (uvsHash[hash] !== undefined) {
        return uvsHash[hash];
      }
      uvsHash[hash] = uvs.length / 2;
      uvs.push(uv.x, uv.y);
      return uvsHash[hash];
    }
    data.data = {};
    data.data.vertices = vertices;
    data.data.normals = normals;
    if (colors.length > 0)
      data.data.colors = colors;
    if (uvs.length > 0)
      data.data.uvs = [uvs];
    data.data.faces = faces;
    return data;
  },
  clone: function () {
    return new Geometry().copy(this);
  },
  copy: function (source) {
    var i, il, j, jl, k, kl;
    this.vertices = [];
    this.colors = [];
    this.faces = [];
    this.faceVertexUvs = [[]];
    this.morphTargets = [];
    this.morphNormals = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.lineDistances = [];
    this.boundingBox = null;
    this.boundingSphere = null;
    this.name = source.name;
    var vertices = source.vertices;
    for (i = 0, il = vertices.length; i < il; i++) {
      this.vertices.push(vertices[i].clone());
    }
    var colors = source.colors;
    for (i = 0, il = colors.length; i < il; i++) {
      this.colors.push(colors[i].clone());
    }
    var faces = source.faces;
    for (i = 0, il = faces.length; i < il; i++) {
      this.faces.push(faces[i].clone());
    }
    for (i = 0, il = source.faceVertexUvs.length; i < il; i++) {
      var faceVertexUvs = source.faceVertexUvs[i];
      if (this.faceVertexUvs[i] === undefined) {
        this.faceVertexUvs[i] = [];
      }
      for (j = 0, jl = faceVertexUvs.length; j < jl; j++) {
        var uvs = faceVertexUvs[j], uvsCopy = [];
        for (k = 0, kl = uvs.length; k < kl; k++) {
          var uv = uvs[k];
          uvsCopy.push(uv.clone());
        }
        this.faceVertexUvs[i].push(uvsCopy);
      }
    }
    var morphTargets = source.morphTargets;
    for (i = 0, il = morphTargets.length; i < il; i++) {
      var morphTarget = {};
      morphTarget.name = morphTargets[i].name;
      if (morphTargets[i].vertices !== undefined) {
        morphTarget.vertices = [];
        for (j = 0, jl = morphTargets[i].vertices.length; j < jl; j++) {
          morphTarget.vertices.push(morphTargets[i].vertices[j].clone());
        }
      }
      if (morphTargets[i].normals !== undefined) {
        morphTarget.normals = [];
        for (j = 0, jl = morphTargets[i].normals.length; j < jl; j++) {
          morphTarget.normals.push(morphTargets[i].normals[j].clone());
        }
      }
      this.morphTargets.push(morphTarget);
    }
    var morphNormals = source.morphNormals;
    for (i = 0, il = morphNormals.length; i < il; i++) {
      var morphNormal = {};
      if (morphNormals[i].vertexNormals !== undefined) {
        morphNormal.vertexNormals = [];
        for (j = 0, jl = morphNormals[i].vertexNormals.length; j < jl; j++) {
          var srcVertexNormal = morphNormals[i].vertexNormals[j];
          var destVertexNormal = {};
          destVertexNormal.a = srcVertexNormal.a.clone();
          destVertexNormal.b = srcVertexNormal.b.clone();
          destVertexNormal.c = srcVertexNormal.c.clone();
          morphNormal.vertexNormals.push(destVertexNormal);
        }
      }
      if (morphNormals[i].faceNormals !== undefined) {
        morphNormal.faceNormals = [];
        for (j = 0, jl = morphNormals[i].faceNormals.length; j < jl; j++) {
          morphNormal.faceNormals.push(morphNormals[i].faceNormals[j].clone());
        }
      }
      this.morphNormals.push(morphNormal);
    }
    var skinWeights = source.skinWeights;
    for (i = 0, il = skinWeights.length; i < il; i++) {
      this.skinWeights.push(skinWeights[i].clone());
    }
    var skinIndices = source.skinIndices;
    for (i = 0, il = skinIndices.length; i < il; i++) {
      this.skinIndices.push(skinIndices[i].clone());
    }
    var lineDistances = source.lineDistances;
    for (i = 0, il = lineDistances.length; i < il; i++) {
      this.lineDistances.push(lineDistances[i]);
    }
    var boundingBox = source.boundingBox;
    if (boundingBox !== null) {
      this.boundingBox = boundingBox.clone();
    }
    var boundingSphere = source.boundingSphere;
    if (boundingSphere !== null) {
      this.boundingSphere = boundingSphere.clone();
    }
    this.elementsNeedUpdate = source.elementsNeedUpdate;
    this.verticesNeedUpdate = source.verticesNeedUpdate;
    this.uvsNeedUpdate = source.uvsNeedUpdate;
    this.normalsNeedUpdate = source.normalsNeedUpdate;
    this.colorsNeedUpdate = source.colorsNeedUpdate;
    this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
    this.groupsNeedUpdate = source.groupsNeedUpdate;
    return this;
  },
  dispose: function () {
    this.dispatchEvent({ type: 'dispose' });
  }
});