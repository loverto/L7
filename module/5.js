'use strict';
require.d(exports, 'a', function () {
  return Object3D;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Quaternion_js__ = require('./24');
var __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_2__math_Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_3__EventDispatcher_js__ = require('./18');
var __WEBPACK_IMPORTED_MODULE_4__math_Euler_js__ = require('./82');
var __WEBPACK_IMPORTED_MODULE_5__Layers_js__ = require('./83');
var __WEBPACK_IMPORTED_MODULE_6__math_Matrix3_js__ = require('./9');
var __WEBPACK_IMPORTED_MODULE_7__math_Math_js__ = require('./6');
var object3DId = 0;
function Object3D() {
  Object.defineProperty(this, 'id', { value: object3DId++ });
  this.uuid = __WEBPACK_IMPORTED_MODULE_7__math_Math_js__['a'].generateUUID();
  this.name = '';
  this.type = 'Object3D';
  this.parent = null;
  this.children = [];
  this.up = Object3D.DefaultUp.clone();
  var position = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
  var rotation = new __WEBPACK_IMPORTED_MODULE_4__math_Euler_js__['a']();
  var quaternion = new __WEBPACK_IMPORTED_MODULE_0__math_Quaternion_js__['a']();
  var scale = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a'](1, 1, 1);
  function onRotationChange() {
    quaternion.setFromEuler(rotation, false);
  }
  function onQuaternionChange() {
    rotation.setFromQuaternion(quaternion, undefined, false);
  }
  rotation.onChange(onRotationChange);
  quaternion.onChange(onQuaternionChange);
  Object.defineProperties(this, {
    position: {
      enumerable: true,
      value: position
    },
    rotation: {
      enumerable: true,
      value: rotation
    },
    quaternion: {
      enumerable: true,
      value: quaternion
    },
    scale: {
      enumerable: true,
      value: scale
    },
    modelViewMatrix: { value: new __WEBPACK_IMPORTED_MODULE_2__math_Matrix4_js__['a']() },
    normalMatrix: { value: new __WEBPACK_IMPORTED_MODULE_6__math_Matrix3_js__['a']() }
  });
  this.matrix = new __WEBPACK_IMPORTED_MODULE_2__math_Matrix4_js__['a']();
  this.matrixWorld = new __WEBPACK_IMPORTED_MODULE_2__math_Matrix4_js__['a']();
  this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
  this.matrixWorldNeedsUpdate = false;
  this.layers = new __WEBPACK_IMPORTED_MODULE_5__Layers_js__['a']();
  this.visible = true;
  this.castShadow = false;
  this.receiveShadow = false;
  this.frustumCulled = true;
  this.renderOrder = 0;
  this.userData = {};
}
Object3D.DefaultUp = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a'](0, 1, 0);
Object3D.DefaultMatrixAutoUpdate = true;
Object3D.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_3__EventDispatcher_js__['a'].prototype), {
  constructor: Object3D,
  isObject3D: true,
  onBeforeRender: function () {
  },
  onAfterRender: function () {
  },
  applyMatrix: function (matrix) {
    this.matrix.multiplyMatrices(matrix, this.matrix);
    this.matrix.decompose(this.position, this.quaternion, this.scale);
  },
  applyQuaternion: function (q) {
    this.quaternion.premultiply(q);
    return this;
  },
  setRotationFromAxisAngle: function (axis, angle) {
    this.quaternion.setFromAxisAngle(axis, angle);
  },
  setRotationFromEuler: function (euler) {
    this.quaternion.setFromEuler(euler, true);
  },
  setRotationFromMatrix: function (m) {
    this.quaternion.setFromRotationMatrix(m);
  },
  setRotationFromQuaternion: function (q) {
    this.quaternion.copy(q);
  },
  rotateOnAxis: function () {
    var q1 = new __WEBPACK_IMPORTED_MODULE_0__math_Quaternion_js__['a']();
    return function rotateOnAxis(axis, angle) {
      q1.setFromAxisAngle(axis, angle);
      this.quaternion.multiply(q1);
      return this;
    };
  }(),
  rotateOnWorldAxis: function () {
    var q1 = new __WEBPACK_IMPORTED_MODULE_0__math_Quaternion_js__['a']();
    return function rotateOnWorldAxis(axis, angle) {
      q1.setFromAxisAngle(axis, angle);
      this.quaternion.premultiply(q1);
      return this;
    };
  }(),
  rotateX: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a'](1, 0, 0);
    return function rotateX(angle) {
      return this.rotateOnAxis(v1, angle);
    };
  }(),
  rotateY: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a'](0, 1, 0);
    return function rotateY(angle) {
      return this.rotateOnAxis(v1, angle);
    };
  }(),
  rotateZ: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a'](0, 0, 1);
    return function rotateZ(angle) {
      return this.rotateOnAxis(v1, angle);
    };
  }(),
  translateOnAxis: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
    return function translateOnAxis(axis, distance) {
      v1.copy(axis).applyQuaternion(this.quaternion);
      this.position.add(v1.multiplyScalar(distance));
      return this;
    };
  }(),
  translateX: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a'](1, 0, 0);
    return function translateX(distance) {
      return this.translateOnAxis(v1, distance);
    };
  }(),
  translateY: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a'](0, 1, 0);
    return function translateY(distance) {
      return this.translateOnAxis(v1, distance);
    };
  }(),
  translateZ: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a'](0, 0, 1);
    return function translateZ(distance) {
      return this.translateOnAxis(v1, distance);
    };
  }(),
  localToWorld: function (vector) {
    return vector.applyMatrix4(this.matrixWorld);
  },
  worldToLocal: function () {
    var m1 = new __WEBPACK_IMPORTED_MODULE_2__math_Matrix4_js__['a']();
    return function worldToLocal(vector) {
      return vector.applyMatrix4(m1.getInverse(this.matrixWorld));
    };
  }(),
  lookAt: function () {
    var q1 = new __WEBPACK_IMPORTED_MODULE_0__math_Quaternion_js__['a']();
    var m1 = new __WEBPACK_IMPORTED_MODULE_2__math_Matrix4_js__['a']();
    var target = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
    var position = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
    return function lookAt(x, y, z) {
      if (x.isVector3) {
        target.copy(x);
      } else {
        target.set(x, y, z);
      }
      var parent = this.parent;
      this.updateWorldMatrix(true, false);
      position.setFromMatrixPosition(this.matrixWorld);
      if (this.isCamera) {
        m1.lookAt(position, target, this.up);
      } else {
        m1.lookAt(target, position, this.up);
      }
      this.quaternion.setFromRotationMatrix(m1);
      if (parent) {
        m1.extractRotation(parent.matrixWorld);
        q1.setFromRotationMatrix(m1);
        this.quaternion.premultiply(q1.inverse());
      }
    };
  }(),
  add: function (object) {
    if (arguments.length > 1) {
      for (var i = 0; i < arguments.length; i++) {
        this.add(arguments[i]);
      }
      return this;
    }
    if (object === this) {
      console.error('THREE.Object3D.add: object can\'t be added as a child of itself.', object);
      return this;
    }
    if (object && object.isObject3D) {
      if (object.parent !== null) {
        object.parent.remove(object);
      }
      object.parent = this;
      object.dispatchEvent({ type: 'added' });
      this.children.push(object);
    } else {
      console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', object);
    }
    return this;
  },
  remove: function (object) {
    if (arguments.length > 1) {
      for (var i = 0; i < arguments.length; i++) {
        this.remove(arguments[i]);
      }
      return this;
    }
    var index = this.children.indexOf(object);
    if (index !== -1) {
      object.parent = null;
      object.dispatchEvent({ type: 'removed' });
      this.children.splice(index, 1);
    }
    return this;
  },
  getObjectById: function (id) {
    return this.getObjectByProperty('id', id);
  },
  getObjectByName: function (name) {
    return this.getObjectByProperty('name', name);
  },
  getObjectByProperty: function (name, value) {
    if (this[name] === value)
      return this;
    for (var i = 0, l = this.children.length; i < l; i++) {
      var child = this.children[i];
      var object = child.getObjectByProperty(name, value);
      if (object !== undefined) {
        return object;
      }
    }
    return undefined;
  },
  getWorldPosition: function (target) {
    if (target === undefined) {
      console.warn('THREE.Object3D: .getWorldPosition() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
    }
    this.updateMatrixWorld(true);
    return target.setFromMatrixPosition(this.matrixWorld);
  },
  getWorldQuaternion: function () {
    var position = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
    var scale = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
    return function getWorldQuaternion(target) {
      if (target === undefined) {
        console.warn('THREE.Object3D: .getWorldQuaternion() target is now required');
        target = new __WEBPACK_IMPORTED_MODULE_0__math_Quaternion_js__['a']();
      }
      this.updateMatrixWorld(true);
      this.matrixWorld.decompose(position, target, scale);
      return target;
    };
  }(),
  getWorldScale: function () {
    var position = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
    var quaternion = new __WEBPACK_IMPORTED_MODULE_0__math_Quaternion_js__['a']();
    return function getWorldScale(target) {
      if (target === undefined) {
        console.warn('THREE.Object3D: .getWorldScale() target is now required');
        target = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
      }
      this.updateMatrixWorld(true);
      this.matrixWorld.decompose(position, quaternion, target);
      return target;
    };
  }(),
  getWorldDirection: function (target) {
    if (target === undefined) {
      console.warn('THREE.Object3D: .getWorldDirection() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_1__math_Vector3_js__['a']();
    }
    this.updateMatrixWorld(true);
    var e = this.matrixWorld.elements;
    return target.set(e[8], e[9], e[10]).normalize();
  },
  raycast: function () {
  },
  traverse: function (callback) {
    callback(this);
    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      children[i].traverse(callback);
    }
  },
  traverseVisible: function (callback) {
    if (this.visible === false)
      return;
    callback(this);
    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      children[i].traverseVisible(callback);
    }
  },
  traverseAncestors: function (callback) {
    var parent = this.parent;
    if (parent !== null) {
      callback(parent);
      parent.traverseAncestors(callback);
    }
  },
  updateMatrix: function () {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    this.matrixWorldNeedsUpdate = true;
  },
  updateMatrixWorld: function (force) {
    if (this.matrixAutoUpdate)
      this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || force) {
      if (this.parent === null) {
        this.matrixWorld.copy(this.matrix);
      } else {
        this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
      }
      this.matrixWorldNeedsUpdate = false;
      force = true;
    }
    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      children[i].updateMatrixWorld(force);
    }
  },
  updateWorldMatrix: function (updateParents, updateChildren) {
    var parent = this.parent;
    if (updateParents === true && parent !== null) {
      parent.updateWorldMatrix(true, false);
    }
    if (this.matrixAutoUpdate)
      this.updateMatrix();
    if (this.parent === null) {
      this.matrixWorld.copy(this.matrix);
    } else {
      this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
    }
    if (updateChildren === true) {
      var children = this.children;
      for (var i = 0, l = children.length; i < l; i++) {
        children[i].updateWorldMatrix(false, true);
      }
    }
  },
  toJSON: function (meta) {
    var isRootObject = meta === undefined || typeof meta === 'string';
    var output = {};
    if (isRootObject) {
      meta = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {}
      };
      output.metadata = {
        version: 4.5,
        type: 'Object',
        generator: 'Object3D.toJSON'
      };
    }
    var object = {};
    object.uuid = this.uuid;
    object.type = this.type;
    if (this.name !== '')
      object.name = this.name;
    if (this.castShadow === true)
      object.castShadow = true;
    if (this.receiveShadow === true)
      object.receiveShadow = true;
    if (this.visible === false)
      object.visible = false;
    if (this.frustumCulled === false)
      object.frustumCulled = false;
    if (this.renderOrder !== 0)
      object.renderOrder = this.renderOrder;
    if (JSON.stringify(this.userData) !== '{}')
      object.userData = this.userData;
    object.layers = this.layers.mask;
    object.matrix = this.matrix.toArray();
    if (this.matrixAutoUpdate === false)
      object.matrixAutoUpdate = false;
    function serialize(library, element) {
      if (library[element.uuid] === undefined) {
        library[element.uuid] = element.toJSON(meta);
      }
      return element.uuid;
    }
    if (this.isMesh || this.isLine || this.isPoints) {
      object.geometry = serialize(meta.geometries, this.geometry);
      var parameters = this.geometry.parameters;
      if (parameters !== undefined && parameters.shapes !== undefined) {
        var shapes = parameters.shapes;
        if (Array.isArray(shapes)) {
          for (var i = 0, l = shapes.length; i < l; i++) {
            var shape = shapes[i];
            serialize(meta.shapes, shape);
          }
        } else {
          serialize(meta.shapes, shapes);
        }
      }
    }
    if (this.material !== undefined) {
      if (Array.isArray(this.material)) {
        var uuids = [];
        for (var i = 0, l = this.material.length; i < l; i++) {
          uuids.push(serialize(meta.materials, this.material[i]));
        }
        object.material = uuids;
      } else {
        object.material = serialize(meta.materials, this.material);
      }
    }
    if (this.children.length > 0) {
      object.children = [];
      for (var i = 0; i < this.children.length; i++) {
        object.children.push(this.children[i].toJSON(meta).object);
      }
    }
    if (isRootObject) {
      var geometries = extractFromCache(meta.geometries);
      var materials = extractFromCache(meta.materials);
      var textures = extractFromCache(meta.textures);
      var images = extractFromCache(meta.images);
      var shapes = extractFromCache(meta.shapes);
      if (geometries.length > 0)
        output.geometries = geometries;
      if (materials.length > 0)
        output.materials = materials;
      if (textures.length > 0)
        output.textures = textures;
      if (images.length > 0)
        output.images = images;
      if (shapes.length > 0)
        output.shapes = shapes;
    }
    output.object = object;
    return output;
    function extractFromCache(cache) {
      var values = [];
      for (var key in cache) {
        var data = cache[key];
        delete data.metadata;
        values.push(data);
      }
      return values;
    }
  },
  clone: function (recursive) {
    return new this.constructor().copy(this, recursive);
  },
  copy: function (source, recursive) {
    if (recursive === undefined)
      recursive = true;
    this.name = source.name;
    this.up.copy(source.up);
    this.position.copy(source.position);
    this.quaternion.copy(source.quaternion);
    this.scale.copy(source.scale);
    this.matrix.copy(source.matrix);
    this.matrixWorld.copy(source.matrixWorld);
    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
    this.layers.mask = source.layers.mask;
    this.visible = source.visible;
    this.castShadow = source.castShadow;
    this.receiveShadow = source.receiveShadow;
    this.frustumCulled = source.frustumCulled;
    this.renderOrder = source.renderOrder;
    this.userData = JSON.parse(JSON.stringify(source.userData));
    if (recursive === true) {
      for (var i = 0; i < source.children.length; i++) {
        var child = source.children[i];
        this.add(child.clone());
      }
    }
    return this;
  }
});