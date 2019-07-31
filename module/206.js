'use strict';
require.d(exports, 'a', function () {
  return Triangle;
});
var __WEBPACK_IMPORTED_MODULE_0__Vector3_js__ = require('./0');
function Triangle(a, b, c) {
  this.a = a !== undefined ? a : new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
  this.b = b !== undefined ? b : new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
  this.c = c !== undefined ? c : new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
}
Object.assign(Triangle, {
  getNormal: function () {
    var v0 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function getNormal(a, b, c, target) {
      if (target === undefined) {
        console.warn('THREE.Triangle: .getNormal() target is now required');
        target = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
      }
      target.subVectors(c, b);
      v0.subVectors(a, b);
      target.cross(v0);
      var targetLengthSq = target.lengthSq();
      if (targetLengthSq > 0) {
        return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));
      }
      return target.set(0, 0, 0);
    };
  }(),
  getBarycoord: function () {
    var v0 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var v1 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var v2 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function getBarycoord(point, a, b, c, target) {
      v0.subVectors(c, a);
      v1.subVectors(b, a);
      v2.subVectors(point, a);
      var dot00 = v0.dot(v0);
      var dot01 = v0.dot(v1);
      var dot02 = v0.dot(v2);
      var dot11 = v1.dot(v1);
      var dot12 = v1.dot(v2);
      var denom = dot00 * dot11 - dot01 * dot01;
      if (target === undefined) {
        console.warn('THREE.Triangle: .getBarycoord() target is now required');
        target = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
      }
      if (denom === 0) {
        return target.set(-2, -1, -1);
      }
      var invDenom = 1 / denom;
      var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
      var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
      return target.set(1 - u - v, v, u);
    };
  }(),
  containsPoint: function () {
    var v1 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function containsPoint(point, a, b, c) {
      Triangle.getBarycoord(point, a, b, c, v1);
      return v1.x >= 0 && v1.y >= 0 && v1.x + v1.y <= 1;
    };
  }(),
  getUV: function () {
    var barycoord = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function getUV(point, p1, p2, p3, uv1, uv2, uv3, target) {
      this.getBarycoord(point, p1, p2, p3, barycoord);
      target.set(0, 0);
      target.addScaledVector(uv1, barycoord.x);
      target.addScaledVector(uv2, barycoord.y);
      target.addScaledVector(uv3, barycoord.z);
      return target;
    };
  }()
});
Object.assign(Triangle.prototype, {
  set: function (a, b, c) {
    this.a.copy(a);
    this.b.copy(b);
    this.c.copy(c);
    return this;
  },
  setFromPointsAndIndices: function (points, i0, i1, i2) {
    this.a.copy(points[i0]);
    this.b.copy(points[i1]);
    this.c.copy(points[i2]);
    return this;
  },
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (triangle) {
    this.a.copy(triangle.a);
    this.b.copy(triangle.b);
    this.c.copy(triangle.c);
    return this;
  },
  getArea: function () {
    var v0 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var v1 = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function getArea() {
      v0.subVectors(this.c, this.b);
      v1.subVectors(this.a, this.b);
      return v0.cross(v1).length() * 0.5;
    };
  }(),
  getMidpoint: function (target) {
    if (target === undefined) {
      console.warn('THREE.Triangle: .getMidpoint() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    }
    return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  },
  getNormal: function (target) {
    return Triangle.getNormal(this.a, this.b, this.c, target);
  },
  getPlane: function (target) {
    if (target === undefined) {
      console.warn('THREE.Triangle: .getPlane() target is now required');
      target = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    }
    return target.setFromCoplanarPoints(this.a, this.b, this.c);
  },
  getBarycoord: function (point, target) {
    return Triangle.getBarycoord(point, this.a, this.b, this.c, target);
  },
  containsPoint: function (point) {
    return Triangle.containsPoint(point, this.a, this.b, this.c);
  },
  getUV: function (point, uv1, uv2, uv3, result) {
    return Triangle.getUV(point, this.a, this.b, this.c, uv1, uv2, uv3, result);
  },
  intersectsBox: function (box) {
    return box.intersectsTriangle(this);
  },
  closestPointToPoint: function () {
    var vab = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var vac = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var vbc = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var vap = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var vbp = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    var vcp = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
    return function closestPointToPoint(p, target) {
      if (target === undefined) {
        console.warn('THREE.Triangle: .closestPointToPoint() target is now required');
        target = new __WEBPACK_IMPORTED_MODULE_0__Vector3_js__['a']();
      }
      var a = this.a, b = this.b, c = this.c;
      var v, w;
      vab.subVectors(b, a);
      vac.subVectors(c, a);
      vap.subVectors(p, a);
      var d1 = vab.dot(vap);
      var d2 = vac.dot(vap);
      if (d1 <= 0 && d2 <= 0) {
        return target.copy(a);
      }
      vbp.subVectors(p, b);
      var d3 = vab.dot(vbp);
      var d4 = vac.dot(vbp);
      if (d3 >= 0 && d4 <= d3) {
        return target.copy(b);
      }
      var vc = d1 * d4 - d3 * d2;
      if (vc <= 0 && d1 >= 0 && d3 <= 0) {
        v = d1 / (d1 - d3);
        return target.copy(a).addScaledVector(vab, v);
      }
      vcp.subVectors(p, c);
      var d5 = vab.dot(vcp);
      var d6 = vac.dot(vcp);
      if (d6 >= 0 && d5 <= d6) {
        return target.copy(c);
      }
      var vb = d5 * d2 - d1 * d6;
      if (vb <= 0 && d2 >= 0 && d6 <= 0) {
        w = d2 / (d2 - d6);
        return target.copy(a).addScaledVector(vac, w);
      }
      var va = d3 * d6 - d5 * d4;
      if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
        vbc.subVectors(c, b);
        w = (d4 - d3) / (d4 - d3 + (d5 - d6));
        return target.copy(b).addScaledVector(vbc, w);
      }
      var denom = 1 / (va + vb + vc);
      v = vb * denom;
      w = vc * denom;
      return target.copy(a).addScaledVector(vab, v).addScaledVector(vac, w);
    };
  }(),
  equals: function (triangle) {
    return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
  }
});