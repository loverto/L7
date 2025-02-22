'use strict';
require.d(exports, 'a', function () {
  return Frustum;
});
var __WEBPACK_IMPORTED_MODULE_0__Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_1__Sphere_js__ = require('./13');
var __WEBPACK_IMPORTED_MODULE_2__Plane_js__ = require('./41');
function Frustum(p0, p1, p2, p3, p4, p5) {
  this.planes = [
    p0 !== undefined ? p0 : new __WEBPACK_IMPORTED_MODULE_2__Plane_js__['a'](),
    p1 !== undefined ? p1 : new __WEBPACK_IMPORTED_MODULE_2__Plane_js__['a'](),
    p2 !== undefined ? p2 : new __WEBPACK_IMPORTED_MODULE_2__Plane_js__['a'](),
    p3 !== undefined ? p3 : new __WEBPACK_IMPORTED_MODULE_2__Plane_js__['a'](),
    p4 !== undefined ? p4 : new __WEBPACK_IMPORTED_MODULE_2__Plane_js__['a'](),
    p5 !== undefined ? p5 : new __WEBPACK_IMPORTED_MODULE_2__Plane_js__['a']()
  ];
}
Object.assign(Frustum.prototype, {
  set: function (p0, p1, p2, p3, p4, p5) {
    var planes = this.planes;
    planes[0].copy(p0);
    planes[1].copy(p1);
    planes[2].copy(p2);
    planes[3].copy(p3);
    planes[4].copy(p4);
    planes[5].copy(p5);
    return this;
  },
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (frustum) {
    var planes = this.planes;
    for (var i = 0; i < 6; i++) {
      planes[i].copy(frustum.planes[i]);
    }
    return this;
  },
  setFromMatrix: function (m) {
    var planes = this.planes;
    var me = m.elements;
    var me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
    var me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
    var me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
    var me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];
    planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
    planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
    planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
    planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
    planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
    planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();
    return this;
  },
  intersectsObject: function () {
    var sphere = new __WEBPACK_IMPORTED_MODULE_1__Sphere_js__['a']();
    return function intersectsObject(object) {
      var geometry = object.geometry;
      if (geometry.boundingSphere === null)
        geometry.computeBoundingSphere();
      sphere.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);
      return this.intersectsSphere(sphere);
    };
  }(),
  intersectsSprite: function () {
    var sphere = new __WEBPACK_IMPORTED_MODULE_1__Sphere_js__['a']();
    return function intersectsSprite(sprite) {
      sphere.center.set(0, 0, 0);
      sphere.radius = 0.7071067811865476;
      sphere.applyMatrix4(sprite.matrixWorld);
      return this.intersectsSphere(sphere);
    };
  }(),
  intersectsSphere: function (sphere) {
    var planes = this.planes;
    var center = sphere.center;
    var negRadius = -sphere.radius;
    for (var i = 0; i < 6; i++) {
      var distance = planes[i].distanceToPoint(center);
      if (distance < negRadius) {
        return false;
      }
    }
    return true;
  },
  intersectsBox: function () {
    var p = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function intersectsBox(box) {
      var planes = this.planes;
      for (var i = 0; i < 6; i++) {
        var plane = planes[i];
        p.x = plane.normal.x > 0 ? box.max.x : box.min.x;
        p.y = plane.normal.y > 0 ? box.max.y : box.min.y;
        p.z = plane.normal.z > 0 ? box.max.z : box.min.z;
        if (plane.distanceToPoint(p) < 0) {
          return false;
        }
      }
      return true;
    };
  }(),
  containsPoint: function (point) {
    var planes = this.planes;
    for (var i = 0; i < 6; i++) {
      if (planes[i].distanceToPoint(point) < 0) {
        return false;
      }
    }
    return true;
  }
});