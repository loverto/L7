'use strict';
require.d(exports, 'a', function () {
  return Euler;
});
var __WEBPACK_IMPORTED_MODULE_0__Quaternion_js__ = require('./24');
var __WEBPACK_IMPORTED_MODULE_1__Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_2__Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_3__Math_js__ = require('./6');
function Euler(x, y, z, order) {
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._order = order || Euler.DefaultOrder;
}
Euler.RotationOrders = [
  'XYZ',
  'YZX',
  'ZXY',
  'XZY',
  'YXZ',
  'ZYX'
];
Euler.DefaultOrder = 'XYZ';
Object.defineProperties(Euler.prototype, {
  x: {
    get: function () {
      return this._x;
    },
    set: function (value) {
      this._x = value;
      this.onChangeCallback();
    }
  },
  y: {
    get: function () {
      return this._y;
    },
    set: function (value) {
      this._y = value;
      this.onChangeCallback();
    }
  },
  z: {
    get: function () {
      return this._z;
    },
    set: function (value) {
      this._z = value;
      this.onChangeCallback();
    }
  },
  order: {
    get: function () {
      return this._order;
    },
    set: function (value) {
      this._order = value;
      this.onChangeCallback();
    }
  }
});
Object.assign(Euler.prototype, {
  isEuler: true,
  set: function (x, y, z, order) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order || this._order;
    this.onChangeCallback();
    return this;
  },
  clone: function () {
    return new this.constructor(this._x, this._y, this._z, this._order);
  },
  copy: function (euler) {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;
    this.onChangeCallback();
    return this;
  },
  setFromRotationMatrix: function (m, order, update) {
    var clamp = __WEBPACK_IMPORTED_MODULE_3__Math_js__['a'].clamp;
    var te = m.elements;
    var m11 = te[0], m12 = te[4], m13 = te[8];
    var m21 = te[1], m22 = te[5], m23 = te[9];
    var m31 = te[2], m32 = te[6], m33 = te[10];
    order = order || this._order;
    if (order === 'XYZ') {
      this._y = Math.asin(clamp(m13, -1, 1));
      if (Math.abs(m13) < 0.99999) {
        this._x = Math.atan2(-m23, m33);
        this._z = Math.atan2(-m12, m11);
      } else {
        this._x = Math.atan2(m32, m22);
        this._z = 0;
      }
    } else if (order === 'YXZ') {
      this._x = Math.asin(-clamp(m23, -1, 1));
      if (Math.abs(m23) < 0.99999) {
        this._y = Math.atan2(m13, m33);
        this._z = Math.atan2(m21, m22);
      } else {
        this._y = Math.atan2(-m31, m11);
        this._z = 0;
      }
    } else if (order === 'ZXY') {
      this._x = Math.asin(clamp(m32, -1, 1));
      if (Math.abs(m32) < 0.99999) {
        this._y = Math.atan2(-m31, m33);
        this._z = Math.atan2(-m12, m22);
      } else {
        this._y = 0;
        this._z = Math.atan2(m21, m11);
      }
    } else if (order === 'ZYX') {
      this._y = Math.asin(-clamp(m31, -1, 1));
      if (Math.abs(m31) < 0.99999) {
        this._x = Math.atan2(m32, m33);
        this._z = Math.atan2(m21, m11);
      } else {
        this._x = 0;
        this._z = Math.atan2(-m12, m22);
      }
    } else if (order === 'YZX') {
      this._z = Math.asin(clamp(m21, -1, 1));
      if (Math.abs(m21) < 0.99999) {
        this._x = Math.atan2(-m23, m22);
        this._y = Math.atan2(-m31, m11);
      } else {
        this._x = 0;
        this._y = Math.atan2(m13, m33);
      }
    } else if (order === 'XZY') {
      this._z = Math.asin(-clamp(m12, -1, 1));
      if (Math.abs(m12) < 0.99999) {
        this._x = Math.atan2(m32, m22);
        this._y = Math.atan2(m13, m11);
      } else {
        this._x = Math.atan2(-m23, m33);
        this._y = 0;
      }
    } else {
      console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
    }
    this._order = order;
    if (update !== false)
      this.onChangeCallback();
    return this;
  },
  setFromQuaternion: function () {
    var matrix = new __WEBPACK_IMPORTED_MODULE_2__Matrix4_js__['a']();
    return function setFromQuaternion(q, order, update) {
      matrix.makeRotationFromQuaternion(q);
      return this.setFromRotationMatrix(matrix, order, update);
    };
  }(),
  setFromVector3: function (v, order) {
    return this.set(v.x, v.y, v.z, order || this._order);
  },
  reorder: function () {
    var q = new __WEBPACK_IMPORTED_MODULE_0__Quaternion_js__['a']();
    return function reorder(newOrder) {
      q.setFromEuler(this);
      return this.setFromQuaternion(q, newOrder);
    };
  }(),
  equals: function (euler) {
    return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
  },
  fromArray: function (array) {
    this._x = array[0];
    this._y = array[1];
    this._z = array[2];
    if (array[3] !== undefined)
      this._order = array[3];
    this.onChangeCallback();
    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined)
      array = [];
    if (offset === undefined)
      offset = 0;
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._order;
    return array;
  },
  toVector3: function (optionalResult) {
    if (optionalResult) {
      return optionalResult.set(this._x, this._y, this._z);
    } else {
      return new __WEBPACK_IMPORTED_MODULE_1__Vector3_js__['a'](this._x, this._y, this._z);
    }
  },
  onChange: function (callback) {
    this.onChangeCallback = callback;
    return this;
  },
  onChangeCallback: function () {
  }
});