'use strict';
require.d(exports, 'a', function () {
  return Box3;
});
var __WEBPACK_IMPORTED_MODULE_0__Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_1__Sphere_js__ = require('./13');
function Box3(min, max) {
  this.min = min !== undefined ? min : new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a'](+Infinity, +Infinity, +Infinity);
  this.max = max !== undefined ? max : new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a'](-Infinity, -Infinity, -Infinity);
}
Object.assign(Box3.prototype, {
  isBox3: true,
  set: function (min, max) {
    this.min.copy(min);
    this.max.copy(max);
    return this;
  },
  setFromArray: function (array) {
    var minX = +Infinity;
    var minY = +Infinity;
    var minZ = +Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var maxZ = -Infinity;
    for (var i = 0, l = array.length; i < l; i += 3) {
      var x = array[i];
      var y = array[i + 1];
      var z = array[i + 2];
      if (x < minX)
        minX = x;
      if (y < minY)
        minY = y;
      if (z < minZ)
        minZ = z;
      if (x > maxX)
        maxX = x;
      if (y > maxY)
        maxY = y;
      if (z > maxZ)
        maxZ = z;
    }
    this.min.set(minX, minY, minZ);
    this.max.set(maxX, maxY, maxZ);
    return this;
  },
  setFromBufferAttribute: function (attribute) {
    var minX = +Infinity;
    var minY = +Infinity;
    var minZ = +Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var maxZ = -Infinity;
    for (var i = 0, l = attribute.count; i < l; i++) {
      var x = attribute.getX(i);
      var y = attribute.getY(i);
      var z = attribute.getZ(i);
      if (x < minX)
        minX = x;
      if (y < minY)
        minY = y;
      if (z < minZ)
        minZ = z;
      if (x > maxX)
        maxX = x;
      if (y > maxY)
        maxY = y;
      if (z > maxZ)
        maxZ = z;
    }
    this.min.set(minX, minY, minZ);
    this.max.set(maxX, maxY, maxZ);
    return this;
  },
  setFromPoints: function (points) {
    this.makeEmpty();
    for (var i = 0, il = points.length; i < il; i++) {
      this.expandByPoint(points[i]);
    }
    return this;
  },
  setFromCenterAndSize: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function setFromCenterAndSize(center, size) {
      var halfSize = v1.copy(size).multiplyScalar(0.5);
      this.min.copy(center).sub(halfSize);
      this.max.copy(center).add(halfSize);
      return this;
    };
  }(),
  setFromObject: function (object) {
    this.makeEmpty();
    return this.expandByObject(object);
  },
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (box) {
    this.min.copy(box.min);
    this.max.copy(box.max);
    return this;
  },
  makeEmpty: function () {
    this.min.x = this.min.y = this.min.z = +Infinity;
    this.max.x = this.max.y = this.max.z = -Infinity;
    return this;
  },
  isEmpty: function () {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  },
  getCenter: function (target) {
    if (target === undefined) {
      console.warn('THREE.Box3: .getCenter() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    }
    return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
  },
  getSize: function (target) {
    if (target === undefined) {
      console.warn('THREE.Box3: .getSize() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    }
    return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
  },
  expandByPoint: function (point) {
    this.min.min(point);
    this.max.max(point);
    return this;
  },
  expandByVector: function (vector) {
    this.min.sub(vector);
    this.max.add(vector);
    return this;
  },
  expandByScalar: function (scalar) {
    this.min.addScalar(-scalar);
    this.max.addScalar(scalar);
    return this;
  },
  expandByObject: function () {
    var scope, i, l;
    var v1 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    function traverse(node) {
      var geometry = node.geometry;
      if (geometry !== undefined) {
        if (geometry.isGeometry) {
          var vertices = geometry.vertices;
          for (i = 0, l = vertices.length; i < l; i++) {
            v1.copy(vertices[i]);
            v1.applyMatrix4(node.matrixWorld);
            scope.expandByPoint(v1);
          }
        } else if (geometry.isBufferGeometry) {
          var attribute = geometry.attributes.position;
          if (attribute !== undefined) {
            for (i = 0, l = attribute.count; i < l; i++) {
              v1.fromBufferAttribute(attribute, i).applyMatrix4(node.matrixWorld);
              scope.expandByPoint(v1);
            }
          }
        }
      }
    }
    return function expandByObject(object) {
      scope = this;
      object.updateMatrixWorld(true);
      object.traverse(traverse);
      return this;
    };
  }(),
  containsPoint: function (point) {
    return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z ? false : true;
  },
  containsBox: function (box) {
    return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
  },
  getParameter: function (point, target) {
    if (target === undefined) {
      console.warn('THREE.Box3: .getParameter() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    }
    return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
  },
  intersectsBox: function (box) {
    return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
  },
  intersectsSphere: function () {
    var closestPoint = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function intersectsSphere(sphere) {
      this.clampPoint(sphere.center, closestPoint);
      return closestPoint.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
    };
  }(),
  intersectsPlane: function (plane) {
    var min, max;
    if (plane.normal.x > 0) {
      min = plane.normal.x * this.min.x;
      max = plane.normal.x * this.max.x;
    } else {
      min = plane.normal.x * this.max.x;
      max = plane.normal.x * this.min.x;
    }
    if (plane.normal.y > 0) {
      min += plane.normal.y * this.min.y;
      max += plane.normal.y * this.max.y;
    } else {
      min += plane.normal.y * this.max.y;
      max += plane.normal.y * this.min.y;
    }
    if (plane.normal.z > 0) {
      min += plane.normal.z * this.min.z;
      max += plane.normal.z * this.max.z;
    } else {
      min += plane.normal.z * this.max.z;
      max += plane.normal.z * this.min.z;
    }
    return min <= plane.constant && max >= plane.constant;
  },
  intersectsTriangle: function () {
    var v0 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var v1 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var v2 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var f0 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var f1 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var f2 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var testAxis = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var center = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var extents = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var triangleNormal = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    function satForAxes(axes) {
      var i, j;
      for (i = 0, j = axes.length - 3; i <= j; i += 3) {
        testAxis.fromArray(axes, i);
        var r = extents.x * Math.abs(testAxis.x) + extents.y * Math.abs(testAxis.y) + extents.z * Math.abs(testAxis.z);
        var p0 = v0.dot(testAxis);
        var p1 = v1.dot(testAxis);
        var p2 = v2.dot(testAxis);
        if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
          return false;
        }
      }
      return true;
    }
    return function intersectsTriangle(triangle) {
      if (this.isEmpty()) {
        return false;
      }
      this.getCenter(center);
      extents.subVectors(this.max, center);
      v0.subVectors(triangle.a, center);
      v1.subVectors(triangle.b, center);
      v2.subVectors(triangle.c, center);
      f0.subVectors(v1, v0);
      f1.subVectors(v2, v1);
      f2.subVectors(v0, v2);
      var axes = [
        0,
        -f0.z,
        f0.y,
        0,
        -f1.z,
        f1.y,
        0,
        -f2.z,
        f2.y,
        f0.z,
        0,
        -f0.x,
        f1.z,
        0,
        -f1.x,
        f2.z,
        0,
        -f2.x,
        -f0.y,
        f0.x,
        0,
        -f1.y,
        f1.x,
        0,
        -f2.y,
        f2.x,
        0
      ];
      if (!satForAxes(axes)) {
        return false;
      }
      axes = [
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ];
      if (!satForAxes(axes)) {
        return false;
      }
      triangleNormal.crossVectors(f0, f1);
      axes = [
        triangleNormal.x,
        triangleNormal.y,
        triangleNormal.z
      ];
      return satForAxes(axes);
    };
  }(),
  clampPoint: function (point, target) {
    if (target === undefined) {
      console.warn('THREE.Box3: .clampPoint() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    }
    return target.copy(point).clamp(this.min, this.max);
  },
  distanceToPoint: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function distanceToPoint(point) {
      var clampedPoint = v1.copy(point).clamp(this.min, this.max);
      return clampedPoint.sub(point).length();
    };
  }(),
  getBoundingSphere: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function getBoundingSphere(target) {
      if (target === undefined) {
        console.warn('THREE.Box3: .getBoundingSphere() target is now required');
        target = new __WEBPACK_IMPORTED_MODULE_1__Sphere_js__['a']();
      }
      this.getCenter(target.center);
      target.radius = this.getSize(v1).length() * 0.5;
      return target;
    };
  }(),
  intersect: function (box) {
    this.min.max(box.min);
    this.max.min(box.max);
    if (this.isEmpty())
      this.makeEmpty();
    return this;
  },
  union: function (box) {
    this.min.min(box.min);
    this.max.max(box.max);
    return this;
  },
  applyMatrix4: function () {
    var points = [
      new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a'](),
      new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a'](),
      new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a'](),
      new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a'](),
      new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a'](),
      new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a'](),
      new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a'](),
      new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']()
    ];
    return function applyMatrix4(matrix) {
      if (this.isEmpty())
        return this;
      points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);
      points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);
      points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);
      points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);
      points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);
      points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);
      points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);
      points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);
      this.setFromPoints(points);
      return this;
    };
  }(),
  translate: function (offset) {
    this.min.add(offset);
    this.max.add(offset);
    return this;
  },
  equals: function (box) {
    return box.min.equals(this.min) && box.max.equals(this.max);
  }
});