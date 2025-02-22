'use strict';
require.d(exports, 'a', function () {
  return Raycaster;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Ray_js__ = require('./25');
function Raycaster(origin, direction, near, far) {
  this.ray = new __WEBPACK_IMPORTED_MODULE_0__math_Ray_js__['a'](origin, direction);
  this.near = near || 0;
  this.far = far || Infinity;
  this.params = {
    Mesh: {},
    Line: {},
    LOD: {},
    Points: { threshold: 1 },
    Sprite: {}
  };
  Object.defineProperties(this.params, {
    PointCloud: {
      get: function () {
        console.warn('THREE.Raycaster: params.PointCloud has been renamed to params.Points.');
        return this.Points;
      }
    }
  });
}
function ascSort(a, b) {
  return a.distance - b.distance;
}
function intersectObject(object, raycaster, intersects, recursive) {
  if (object.visible === false)
    return;
  object.raycast(raycaster, intersects);
  if (recursive === true) {
    var children = object.children;
    for (var i = 0, l = children.length; i < l; i++) {
      intersectObject(children[i], raycaster, intersects, true);
    }
  }
}
Object.assign(Raycaster.prototype, {
  linePrecision: 1,
  set: function (origin, direction) {
    this.ray.set(origin, direction);
  },
  setFromCamera: function (coords, camera) {
    if (camera && camera.isPerspectiveCamera) {
      this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
      this.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(this.ray.origin).normalize();
    } else if (camera && camera.isOrthographicCamera) {
      this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera);
      this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
    } else {
      console.error('THREE.Raycaster: Unsupported camera type.');
    }
  },
  intersectObject: function (object, recursive, optionalTarget) {
    var intersects = optionalTarget || [];
    intersectObject(object, this, intersects, recursive);
    intersects.sort(ascSort);
    return intersects;
  },
  intersectObjects: function (objects, recursive, optionalTarget) {
    var intersects = optionalTarget || [];
    if (Array.isArray(objects) === false) {
      console.warn('THREE.Raycaster.intersectObjects: objects is not an Array.');
      return intersects;
    }
    for (var i = 0, l = objects.length; i < l; i++) {
      intersectObject(objects[i], this, intersects, recursive);
    }
    intersects.sort(ascSort);
    return intersects;
  }
});