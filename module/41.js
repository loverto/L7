'use strict';
require.d(exports, 'a', function () {
  return Plane;
});
var __WEBPACK_IMPORTED_MODULE_0__Matrix3_js__ = require('./9');
var __WEBPACK_IMPORTED_MODULE_1__Vector3_js__ = require('./0');
function Plane(normal, constant) {
  this.normal = normal !== undefined ? normal : new __WEBPACK_IMPORTED_MODULE_1__Vector3_js__['a'](1, 0, 0);
  this.constant = constant !== undefined ? constant : 0;
}
Object.assign(Plane.prototype, {
  set: function (normal, constant) {
    this.normal.copy(normal);
    this.constant = constant;
    return this;
  },
  setComponents: function (x, y, z, w) {
    this.normal.set(x, y, z);
    this.constant = w;
    return this;
  },
  setFromNormalAndCoplanarPoint: function (normal, point) {
    this.normal.copy(normal);
    this.constant = -point.dot(this.normal);
    return this;
  },
  setFromCoplanarPoints: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_1__Vector3_js__['a']();
    var v2 = new __WEBPACK_IMPORTED_MODULE_1__Vector3_js__['a']();
    return function setFromCoplanarPoints(a, b, c) {
      var normal = v1.subVectors(c, b).cross(v2.subVectors(a, b)).normalize();
      this.setFromNormalAndCoplanarPoint(normal, a);
      return this;
    };
  }(),
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (plane) {
    this.normal.copy(plane.normal);
    this.constant = plane.constant;
    return this;
  },
  normalize: function () {
    var inverseNormalLength = 1 / this.normal.length();
    this.normal.multiplyScalar(inverseNormalLength);
    this.constant *= inverseNormalLength;
    return this;
  },
  negate: function () {
    this.constant *= -1;
    this.normal.negate();
    return this;
  },
  distanceToPoint: function (point) {
    return this.normal.dot(point) + this.constant;
  },
  distanceToSphere: function (sphere) {
    return this.distanceToPoint(sphere.center) - sphere.radius;
  },
  projectPoint: function (point, target) {
    if (target === undefined) {
      console.warn('THREE.Plane: .projectPoint() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_1__Vector3_js__['a']();
    }
    return target.copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point);
  },
  intersectLine: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_1__Vector3_js__['a']();
    return function intersectLine(line, target) {
      if (target === undefined) {
        console.warn('THREE.Plane: .intersectLine() target is now required');
        target = new __WEBPACK_IMPORTED_MODULE_1__Vector3_js__['a']();
      }
      var direction = line.delta(v1);
      var denominator = this.normal.dot(direction);
      if (denominator === 0) {
        if (this.distanceToPoint(line.start) === 0) {
          return target.copy(line.start);
        }
        return undefined;
      }
      var t = -(line.start.dot(this.normal) + this.constant) / denominator;
      if (t < 0 || t > 1) {
        return undefined;
      }
      return target.copy(direction).multiplyScalar(t).add(line.start);
    };
  }(),
  intersectsLine: function (line) {
    var startSign = this.distanceToPoint(line.start);
    var endSign = this.distanceToPoint(line.end);
    return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
  },
  intersectsBox: function (box) {
    return box.intersectsPlane(this);
  },
  intersectsSphere: function (sphere) {
    return sphere.intersectsPlane(this);
  },
  coplanarPoint: function (target) {
    if (target === undefined) {
      console.warn('THREE.Plane: .coplanarPoint() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_1__Vector3_js__['a']();
    }
    return target.copy(this.normal).multiplyScalar(-this.constant);
  },
  applyMatrix4: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_1__Vector3_js__['a']();
    var m1 = new __WEBPACK_IMPORTED_MODULE_0__Matrix3_js__['a']();
    return function applyMatrix4(matrix, optionalNormalMatrix) {
      var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix(matrix);
      var referencePoint = this.coplanarPoint(v1).applyMatrix4(matrix);
      var normal = this.normal.applyMatrix3(normalMatrix).normalize();
      this.constant = -referencePoint.dot(normal);
      return this;
    };
  }(),
  translate: function (offset) {
    this.constant -= offset.dot(this.normal);
    return this;
  },
  equals: function (plane) {
    return plane.normal.equals(this.normal) && plane.constant === this.constant;
  }
});