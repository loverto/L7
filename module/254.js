(function webpackUniversalModuleDefinition(root, factory) {
  if (true)
    module.exports = factory();
  else if (typeof define === 'function' && define.amd)
    define([], factory);
  else if (typeof exports === 'object')
    exports['Util'] = factory();
  else
    root['Util'] = factory();
}(this, function () {
  return function (modules) {
    var installedModules = {};
    function require(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, require);
      module.l = true;
      return module.exports;
    }
    require.m = modules;
    require.c = installedModules;
    require.d = function (exports, name, getter) {
      if (!require.o(exports, name)) {
        Object.defineProperty(exports, name, {
          configurable: false,
          enumerable: true,
          get: getter
        });
      }
    };
    require.n = function (module) {
      var getter = module && module.__esModule ? function getDefault() {
        return module['default'];
      } : function getModuleExports() {
        return module;
      };
      require.d(getter, 'a', getter);
      return getter;
    };
    require.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    require.p = '';
    return require;
  }([
    function (module, exports, require) {
      var isObject = require('./Material');
      var isArray = require('./1');
      var each = function each(elements, func) {
        if (!elements) {
          return;
        }
        var rst = void 0;
        if (isArray(elements)) {
          for (var i = 0, len = elements.length; i < len; i++) {
            rst = func(elements[i], i);
            if (rst === false) {
              break;
            }
          }
        } else if (isObject(elements)) {
          for (var k in elements) {
            if (elements.hasOwnProperty(k)) {
              rst = func(elements[k], k);
              if (rst === false) {
                break;
              }
            }
          }
        }
      };
      module.exports = each;
    },
    function (module, exports, require) {
      var isType = require('./4');
      var isArray = Array.isArray ? Array.isArray : function (value) {
        return isType(value, 'Array');
      };
      module.exports = isArray;
    },
    function (module, exports, require) {
      var isType = require('./4');
      var isFunction = function isFunction(value) {
        return isType(value, 'Function');
      };
      module.exports = isFunction;
    },
    function (module, exports) {
      var isArrayLike = function isArrayLike(value) {
        return value !== null && typeof value !== 'function' && isFinite(value.length);
      };
      module.exports = isArrayLike;
    },
    function (module, exports) {
      var toString = {}.toString;
      var isType = function isType(value, type) {
        return toString.call(value) === '[object ' + type + ']';
      };
      module.exports = isType;
    },
    function (module, exports) {
      var isNil = function isNil(value) {
        return value === null || value === undefined;
      };
      module.exports = isNil;
    },
    function (module, exports, require) {
      var isType = require('./4');
      var isNumber = function isNumber(value) {
        return isType(value, 'Number');
      };
      module.exports = isNumber;
    },
    function (module, exports, require) {
      var isObjectLike = require('./13');
      var isType = require('./4');
      var isPlainObject = function isPlainObject(value) {
        if (!isObjectLike(value) || !isType(value, 'Object')) {
          return false;
        }
        if (Object.getPrototypeOf(value) === null) {
          return true;
        }
        var proto = value;
        while (Object.getPrototypeOf(proto) !== null) {
          proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(value) === proto;
      };
      module.exports = isPlainObject;
    },
    function (module, exports, require) {
      var isNil = require('./5');
      function toString(value) {
        if (isNil(value))
          return '';
        return value.toString();
      }
      module.exports = toString;
    },
    function (module, exports, require) {
      var isArrayLike = require('./3');
      var indexOf = Array.prototype.indexOf;
      var contains = function contains(arr, value) {
        if (!isArrayLike(arr)) {
          return false;
        }
        return indexOf.call(arr, value) > -1;
      };
      module.exports = contains;
    },
    function (module, exports, require) {
      var isType = require('./4');
      var isString = function isString(str) {
        return isType(str, 'String');
      };
      module.exports = isString;
    },
    function (module, exports) {
      function _mix(dist, obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
            dist[key] = obj[key];
          }
        }
      }
      var mix = function mix(dist, src1, src2, src3) {
        if (src1)
          _mix(dist, src1);
        if (src2)
          _mix(dist, src2);
        if (src3)
          _mix(dist, src3);
        return dist;
      };
      module.exports = mix;
    },
    function (module, exports, require) {
      var each = require('./0');
      var isArrayLike = require('./3');
      var filter = function filter(arr, func) {
        if (!isArrayLike(arr)) {
          return arr;
        }
        var result = [];
        each(arr, function (value, index) {
          if (func(value, index)) {
            result.push(value);
          }
        });
        return result;
      };
      module.exports = filter;
    },
    function (module, exports) {
      var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
      };
      var isObjectLike = function isObjectLike(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
      };
      module.exports = isObjectLike;
    },
    function (module, exports, require) {
      var isArrayLike = require('./3');
      function toArray(value) {
        return isArrayLike(value) ? Array.prototype.slice.call(value) : [];
      }
      module.exports = toArray;
    },
    function (module, exports) {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.setMatrixArrayType = setMatrixArrayType;
      exports.toRadian = toRadian;
      exports.equals = equals;
      var EPSILON = exports.EPSILON = 0.000001;
      var ARRAY_TYPE = exports.ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
      var RANDOM = exports.RANDOM = Math.random;
      function setMatrixArrayType(type) {
        exports.ARRAY_TYPE = ARRAY_TYPE = type;
      }
      var degree = Math.PI / 180;
      function toRadian(a) {
        return a * degree;
      }
      function equals(a, b) {
        return Math.abs(a - b) <= EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
      }
    },
    function (module, exports) {
      var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
      };
      var isObject = function isObject(value) {
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
        return value !== null && type === 'object' || type === 'function';
      };
      module.exports = isObject;
    },
    function (module, exports, require) {
      var keys = require('./18');
      var isNil = require('./5');
      function isMatch(obj, attrs) {
        var _keys = keys(attrs);
        var length = _keys.length;
        if (isNil(obj))
          return !length;
        for (var i = 0; i < length; i += 1) {
          var key = _keys[i];
          if (attrs[key] !== obj[key] || !(key in obj)) {
            return false;
          }
        }
        return true;
      }
      module.exports = isMatch;
    },
    function (module, exports, require) {
      var each = require('./0');
      var isFunction = require('./three');
      var keys = Object.keys ? function (obj) {
        return Object.keys(obj);
      } : function (obj) {
        var result = [];
        each(obj, function (value, key) {
          if (!(isFunction(obj) && key === 'prototype')) {
            result.push(key);
          }
        });
        return result;
      };
      module.exports = keys;
    },
    function (module, exports, require) {
      var isArrayLike = require('./3');
      var splice = Array.prototype.splice;
      var pullAt = function pullAt(arr, indexes) {
        if (!isArrayLike(arr)) {
          return [];
        }
        var length = arr ? indexes.length : 0;
        var last = length - 1;
        while (length--) {
          var previous = void 0;
          var index = indexes[length];
          if (length === last || index !== previous) {
            previous = index;
            splice.call(arr, index, 1);
          }
        }
        return arr;
      };
      module.exports = pullAt;
    },
    function (module, exports, require) {
      var each = require('./0');
      var contains = require('./9');
      var uniq = function uniq(arr) {
        var resultArr = [];
        each(arr, function (item) {
          if (!contains(resultArr, item)) {
            resultArr.push(item);
          }
        });
        return resultArr;
      };
      module.exports = uniq;
    },
    function (module, exports) {
      var clamp = function clamp(a, min, max) {
        if (a < min) {
          return min;
        } else if (a > max) {
          return max;
        }
        return a;
      };
      module.exports = clamp;
    },
    function (module, exports) {
      module.exports = parseInt;
    },
    function (module, exports, require) {
      var mat3 = require('./89');
      mat3.translate = function (out, a, v) {
        var transMat = new Array(9);
        mat3.fromTranslation(transMat, v);
        return mat3.multiply(out, transMat, a);
      };
      mat3.rotate = function (out, a, rad) {
        var rotateMat = new Array(9);
        mat3.fromRotation(rotateMat, rad);
        return mat3.multiply(out, rotateMat, a);
      };
      mat3.scale = function (out, a, v) {
        var scaleMat = new Array(9);
        mat3.fromScaling(scaleMat, v);
        return mat3.multiply(out, scaleMat, a);
      };
      module.exports = mat3;
    },
    function (module, exports, require) {
      var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
      };
      var isArray = require('./1');
      var clone = function clone(obj) {
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
          return obj;
        }
        var rst = void 0;
        if (isArray(obj)) {
          rst = [];
          for (var i = 0, l = obj.length; i < l; i++) {
            if (_typeof(obj[i]) === 'object' && obj[i] != null) {
              rst[i] = clone(obj[i]);
            } else {
              rst[i] = obj[i];
            }
          }
        } else {
          rst = {};
          for (var k in obj) {
            if (_typeof(obj[k]) === 'object' && obj[k] != null) {
              rst[k] = clone(obj[k]);
            } else {
              rst[k] = obj[k];
            }
          }
        }
        return rst;
      };
      module.exports = clone;
    },
    function (module, exports) {
      module.exports = function (obj, key) {
        return obj.hasOwnProperty(key);
      };
    },
    function (module, exports, require) {
      var each = require('./0');
      var isFunction = require('./three');
      var values = Object.values ? function (obj) {
        return Object.values(obj);
      } : function (obj) {
        var result = [];
        each(obj, function (value, key) {
          if (!(isFunction(obj) && key === 'prototype')) {
            result.push(value);
          }
        });
        return result;
      };
      module.exports = values;
    },
    function (module, exports, require) {
      var parsePathArray = require('./28');
      module.exports = function rectPath(x, y, w, h, r) {
        if (r) {
          return [
            [
              'M',
              +x + +r,
              y
            ],
            [
              'l',
              w - r * 2,
              0
            ],
            [
              'a',
              r,
              r,
              0,
              0,
              1,
              r,
              r
            ],
            [
              'l',
              0,
              h - r * 2
            ],
            [
              'a',
              r,
              r,
              0,
              0,
              1,
              -r,
              r
            ],
            [
              'l',
              r * 2 - w,
              0
            ],
            [
              'a',
              r,
              r,
              0,
              0,
              1,
              -r,
              -r
            ],
            [
              'l',
              0,
              r * 2 - h
            ],
            [
              'a',
              r,
              r,
              0,
              0,
              1,
              r,
              -r
            ],
            ['z']
          ];
        }
        var res = [
          [
            'M',
            x,
            y
          ],
          [
            'l',
            w,
            0
          ],
          [
            'l',
            0,
            h
          ],
          [
            'l',
            -w,
            0
          ],
          ['z']
        ];
        res.parsePathArray = parsePathArray;
        return res;
      };
    },
    function (module, exports) {
      var p2s = /,?([a-z]),?/gi;
      module.exports = function parsePathArray(path) {
        return path.join(',').replace(p2s, '$1');
      };
    },
    function (module, exports, require) {
      var pathToAbsolute = require('./30');
      var a2c = function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
        if (rx === ry) {
          rx += 1;
        }
        var _120 = Math.PI * 120 / 180;
        var rad = Math.PI / 180 * (+angle || 0);
        var res = [];
        var xy = void 0;
        var f1 = void 0;
        var f2 = void 0;
        var cx = void 0;
        var cy = void 0;
        var rotate = function rotate(x, y, rad) {
          var X = x * Math.cos(rad) - y * Math.sin(rad);
          var Y = x * Math.sin(rad) + y * Math.cos(rad);
          return {
            x: X,
            y: Y
          };
        };
        if (!recursive) {
          xy = rotate(x1, y1, -rad);
          x1 = xy.x;
          y1 = xy.y;
          xy = rotate(x2, y2, -rad);
          x2 = xy.x;
          y2 = xy.y;
          if (x1 === x2 && y1 === y2) {
            x2 += 1;
            y2 += 1;
          }
          var x = (x1 - x2) / 2;
          var y = (y1 - y2) / 2;
          var h = x * x / (rx * rx) + y * y / (ry * ry);
          if (h > 1) {
            h = Math.sqrt(h);
            rx = h * rx;
            ry = h * ry;
          }
          var rx2 = rx * rx;
          var ry2 = ry * ry;
          var k = (large_arc_flag === sweep_flag ? -1 : 1) * Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
          cx = k * rx * y / ry + (x1 + x2) / 2;
          cy = k * -ry * x / rx + (y1 + y2) / 2;
          f1 = Math.asin(((y1 - cy) / ry).toFixed(9));
          f2 = Math.asin(((y2 - cy) / ry).toFixed(9));
          f1 = x1 < cx ? Math.PI - f1 : f1;
          f2 = x2 < cx ? Math.PI - f2 : f2;
          f1 < 0 && (f1 = Math.PI * 2 + f1);
          f2 < 0 && (f2 = Math.PI * 2 + f2);
          if (sweep_flag && f1 > f2) {
            f1 = f1 - Math.PI * 2;
          }
          if (!sweep_flag && f2 > f1) {
            f2 = f2 - Math.PI * 2;
          }
        } else {
          f1 = recursive[0];
          f2 = recursive[1];
          cx = recursive[2];
          cy = recursive[3];
        }
        var df = f2 - f1;
        if (Math.abs(df) > _120) {
          var f2old = f2;
          var x2old = x2;
          var y2old = y2;
          f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
          x2 = cx + rx * Math.cos(f2);
          y2 = cy + ry * Math.sin(f2);
          res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [
            f2,
            f2old,
            cx,
            cy
          ]);
        }
        df = f2 - f1;
        var c1 = Math.cos(f1);
        var s1 = Math.sin(f1);
        var c2 = Math.cos(f2);
        var s2 = Math.sin(f2);
        var t = Math.tan(df / 4);
        var hx = 4 / 3 * rx * t;
        var hy = 4 / 3 * ry * t;
        var m1 = [
          x1,
          y1
        ];
        var m2 = [
          x1 + hx * s1,
          y1 - hy * c1
        ];
        var m3 = [
          x2 + hx * s2,
          y2 - hy * c2
        ];
        var m4 = [
          x2,
          y2
        ];
        m2[0] = 2 * m1[0] - m2[0];
        m2[1] = 2 * m1[1] - m2[1];
        if (recursive) {
          return [
            m2,
            m3,
            m4
          ].concat(res);
        }
        res = [
          m2,
          m3,
          m4
        ].concat(res).join().split(',');
        var newres = [];
        for (var i = 0, ii = res.length; i < ii; i++) {
          newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
        }
        return newres;
      };
      var l2c = function l2c(x1, y1, x2, y2) {
        return [
          x1,
          y1,
          x2,
          y2,
          x2,
          y2
        ];
      };
      var q2c = function q2c(x1, y1, ax, ay, x2, y2) {
        var _13 = 1 / 3;
        var _23 = 2 / 3;
        return [
          _13 * x1 + _23 * ax,
          _13 * y1 + _23 * ay,
          _13 * x2 + _23 * ax,
          _13 * y2 + _23 * ay,
          x2,
          y2
        ];
      };
      module.exports = function pathTocurve(path, path2) {
        var p = pathToAbsolute(path);
        var p2 = path2 && pathToAbsolute(path2);
        var attrs = {
          x: 0,
          y: 0,
          bx: 0,
          by: 0,
          X: 0,
          Y: 0,
          qx: null,
          qy: null
        };
        var attrs2 = {
          x: 0,
          y: 0,
          bx: 0,
          by: 0,
          X: 0,
          Y: 0,
          qx: null,
          qy: null
        };
        var pcoms1 = [];
        var pcoms2 = [];
        var pfirst = '';
        var pcom = '';
        var ii = void 0;
        var processPath = function processPath(path, d, pcom) {
          var nx = void 0, ny = void 0;
          if (!path) {
            return [
              'C',
              d.x,
              d.y,
              d.x,
              d.y,
              d.x,
              d.y
            ];
          }
          !(path[0] in {
            T: 1,
            Q: 1
          }) && (d.qx = d.qy = null);
          switch (path[0]) {
          case 'M':
            d.X = path[1];
            d.Y = path[2];
            break;
          case 'A':
            path = ['C'].concat(a2c.apply(0, [
              d.x,
              d.y
            ].concat(path.slice(1))));
            break;
          case 'S':
            if (pcom === 'C' || pcom === 'S') {
              nx = d.x * 2 - d.bx;
              ny = d.y * 2 - d.by;
            } else {
              nx = d.x;
              ny = d.y;
            }
            path = [
              'C',
              nx,
              ny
            ].concat(path.slice(1));
            break;
          case 'T':
            if (pcom === 'Q' || pcom === 'T') {
              d.qx = d.x * 2 - d.qx;
              d.qy = d.y * 2 - d.qy;
            } else {
              d.qx = d.x;
              d.qy = d.y;
            }
            path = ['C'].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
            break;
          case 'Q':
            d.qx = path[1];
            d.qy = path[2];
            path = ['C'].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
            break;
          case 'L':
            path = ['C'].concat(l2c(d.x, d.y, path[1], path[2]));
            break;
          case 'H':
            path = ['C'].concat(l2c(d.x, d.y, path[1], d.y));
            break;
          case 'V':
            path = ['C'].concat(l2c(d.x, d.y, d.x, path[1]));
            break;
          case 'Z':
            path = ['C'].concat(l2c(d.x, d.y, d.X, d.Y));
            break;
          default:
            break;
          }
          return path;
        };
        var fixArc = function fixArc(pp, i) {
          if (pp[i].length > 7) {
            pp[i].shift();
            var pi = pp[i];
            while (pi.length) {
              pcoms1[i] = 'A';
              p2 && (pcoms2[i] = 'A');
              pp.splice(i++, 0, ['C'].concat(pi.splice(0, 6)));
            }
            pp.splice(i, 1);
            ii = Math.max(p.length, p2 && p2.length || 0);
          }
        };
        var fixM = function fixM(path1, path2, a1, a2, i) {
          if (path1 && path2 && path1[i][0] === 'M' && path2[i][0] !== 'M') {
            path2.splice(i, 0, [
              'M',
              a2.x,
              a2.y
            ]);
            a1.bx = 0;
            a1.by = 0;
            a1.x = path1[i][1];
            a1.y = path1[i][2];
            ii = Math.max(p.length, p2 && p2.length || 0);
          }
        };
        ii = Math.max(p.length, p2 && p2.length || 0);
        for (var i = 0; i < ii; i++) {
          p[i] && (pfirst = p[i][0]);
          if (pfirst !== 'C') {
            pcoms1[i] = pfirst;
            i && (pcom = pcoms1[i - 1]);
          }
          p[i] = processPath(p[i], attrs, pcom);
          if (pcoms1[i] !== 'A' && pfirst === 'C')
            pcoms1[i] = 'C';
          fixArc(p, i);
          if (p2) {
            p2[i] && (pfirst = p2[i][0]);
            if (pfirst !== 'C') {
              pcoms2[i] = pfirst;
              i && (pcom = pcoms2[i - 1]);
            }
            p2[i] = processPath(p2[i], attrs2, pcom);
            if (pcoms2[i] !== 'A' && pfirst === 'C') {
              pcoms2[i] = 'C';
            }
            fixArc(p2, i);
          }
          fixM(p, p2, attrs, attrs2, i);
          fixM(p2, p, attrs2, attrs, i);
          var seg = p[i];
          var seg2 = p2 && p2[i];
          var seglen = seg.length;
          var seg2len = p2 && seg2.length;
          attrs.x = seg[seglen - 2];
          attrs.y = seg[seglen - 1];
          attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
          attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
          attrs2.bx = p2 && (parseFloat(seg2[seg2len - 4]) || attrs2.x);
          attrs2.by = p2 && (parseFloat(seg2[seg2len - 3]) || attrs2.y);
          attrs2.x = p2 && seg2[seg2len - 2];
          attrs2.y = p2 && seg2[seg2len - 1];
        }
        return p2 ? [
          p,
          p2
        ] : p;
      };
    },
    function (module, exports, require) {
      var parsePathString = require('./31');
      var catmullRom2bezier = require('./32');
      function ellipsePath(x, y, rx, ry, a) {
        var res = [];
        if (a === null && ry === null) {
          ry = rx;
        }
        x = +x;
        y = +y;
        rx = +rx;
        ry = +ry;
        if (a !== null) {
          var rad = Math.PI / 180;
          var x1 = x + rx * Math.cos(-ry * rad);
          var x2 = x + rx * Math.cos(-a * rad);
          var y1 = y + rx * Math.sin(-ry * rad);
          var y2 = y + rx * Math.sin(-a * rad);
          res = [
            [
              'M',
              x1,
              y1
            ],
            [
              'A',
              rx,
              rx,
              0,
              +(a - ry > 180),
              0,
              x2,
              y2
            ]
          ];
        } else {
          res = [
            [
              'M',
              x,
              y
            ],
            [
              'm',
              0,
              -ry
            ],
            [
              'a',
              rx,
              ry,
              0,
              1,
              1,
              0,
              2 * ry
            ],
            [
              'a',
              rx,
              ry,
              0,
              1,
              1,
              0,
              -2 * ry
            ],
            ['z']
          ];
        }
        return res;
      }
      module.exports = function pathToAbsolute(pathArray) {
        pathArray = parsePathString(pathArray);
        if (!pathArray || !pathArray.length) {
          return [[
              'M',
              0,
              0
            ]];
        }
        var res = [];
        var x = 0;
        var y = 0;
        var mx = 0;
        var my = 0;
        var start = 0;
        var pa0 = void 0;
        var dots = void 0;
        if (pathArray[0][0] === 'M') {
          x = +pathArray[0][1];
          y = +pathArray[0][2];
          mx = x;
          my = y;
          start++;
          res[0] = [
            'M',
            x,
            y
          ];
        }
        var crz = pathArray.length === 3 && pathArray[0][0] === 'M' && pathArray[1][0].toUpperCase() === 'R' && pathArray[2][0].toUpperCase() === 'Z';
        for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
          res.push(r = []);
          pa = pathArray[i];
          pa0 = pa[0];
          if (pa0 !== pa0.toUpperCase()) {
            r[0] = pa0.toUpperCase();
            switch (r[0]) {
            case 'A':
              r[1] = pa[1];
              r[2] = pa[2];
              r[3] = pa[3];
              r[4] = pa[4];
              r[5] = pa[5];
              r[6] = +pa[6] + x;
              r[7] = +pa[7] + y;
              break;
            case 'V':
              r[1] = +pa[1] + y;
              break;
            case 'H':
              r[1] = +pa[1] + x;
              break;
            case 'R':
              dots = [
                x,
                y
              ].concat(pa.slice(1));
              for (var j = 2, jj = dots.length; j < jj; j++) {
                dots[j] = +dots[j] + x;
                dots[++j] = +dots[j] + y;
              }
              res.pop();
              res = res.concat(catmullRom2bezier(dots, crz));
              break;
            case 'O':
              res.pop();
              dots = ellipsePath(x, y, pa[1], pa[2]);
              dots.push(dots[0]);
              res = res.concat(dots);
              break;
            case 'U':
              res.pop();
              res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
              r = ['U'].concat(res[res.length - 1].slice(-2));
              break;
            case 'M':
              mx = +pa[1] + x;
              my = +pa[2] + y;
              break;
            default:
              for (var _j = 1, _jj = pa.length; _j < _jj; _j++) {
                r[_j] = +pa[_j] + (_j % 2 ? x : y);
              }
            }
          } else if (pa0 === 'R') {
            dots = [
              x,
              y
            ].concat(pa.slice(1));
            res.pop();
            res = res.concat(catmullRom2bezier(dots, crz));
            r = ['R'].concat(pa.slice(-2));
          } else if (pa0 === 'O') {
            res.pop();
            dots = ellipsePath(x, y, pa[1], pa[2]);
            dots.push(dots[0]);
            res = res.concat(dots);
          } else if (pa0 === 'U') {
            res.pop();
            res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
            r = ['U'].concat(res[res.length - 1].slice(-2));
          } else {
            for (var k = 0, kk = pa.length; k < kk; k++) {
              r[k] = pa[k];
            }
          }
          pa0 = pa0.toUpperCase();
          if (pa0 !== 'O') {
            switch (r[0]) {
            case 'Z':
              x = +mx;
              y = +my;
              break;
            case 'H':
              x = r[1];
              break;
            case 'V':
              y = r[1];
              break;
            case 'M':
              mx = r[r.length - 2];
              my = r[r.length - 1];
              break;
            default:
              x = r[r.length - 2];
              y = r[r.length - 1];
            }
          }
        }
        return res;
      };
    },
    function (module, exports) {
      var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
      };
      var SPACES = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029';
      var PATH_COMMAND = new RegExp('([a-z])[' + SPACES + ',]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[' + SPACES + ']*,?[' + SPACES + ']*)+)', 'ig');
      var PATH_VALUES = new RegExp('(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[' + SPACES + ']*,?[' + SPACES + ']*', 'ig');
      module.exports = function parsePathString(pathString) {
        if (!pathString) {
          return null;
        }
        if ((typeof pathString === 'undefined' ? 'undefined' : _typeof(pathString)) === _typeof([])) {
          return pathString;
        }
        var paramCounts = {
          a: 7,
          c: 6,
          o: 2,
          h: 1,
          l: 2,
          m: 2,
          r: 4,
          q: 4,
          s: 4,
          t: 2,
          v: 1,
          u: 3,
          z: 0
        };
        var data = [];
        String(pathString).replace(PATH_COMMAND, function (a, b, c) {
          var params = [];
          var name = b.toLowerCase();
          c.replace(PATH_VALUES, function (a, b) {
            b && params.push(+b);
          });
          if (name === 'm' && params.length > 2) {
            data.push([b].concat(params.splice(0, 2)));
            name = 'l';
            b = b === 'm' ? 'l' : 'L';
          }
          if (name === 'o' && params.length === 1) {
            data.push([
              b,
              params[0]
            ]);
          }
          if (name === 'r') {
            data.push([b].concat(params));
          } else {
            while (params.length >= paramCounts[name]) {
              data.push([b].concat(params.splice(0, paramCounts[name])));
              if (!paramCounts[name]) {
                break;
              }
            }
          }
        });
        return data;
      };
    },
    function (module, exports) {
      module.exports = function catmullRom2bezier(crp, z) {
        var d = [];
        for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
          var p = [
            {
              x: +crp[i - 2],
              y: +crp[i - 1]
            },
            {
              x: +crp[i],
              y: +crp[i + 1]
            },
            {
              x: +crp[i + 2],
              y: +crp[i + 3]
            },
            {
              x: +crp[i + 4],
              y: +crp[i + 5]
            }
          ];
          if (z) {
            if (!i) {
              p[0] = {
                x: +crp[iLen - 2],
                y: +crp[iLen - 1]
              };
            } else if (iLen - 4 === i) {
              p[3] = {
                x: +crp[0],
                y: +crp[1]
              };
            } else if (iLen - 2 === i) {
              p[2] = {
                x: +crp[0],
                y: +crp[1]
              };
              p[3] = {
                x: +crp[2],
                y: +crp[3]
              };
            }
          } else {
            if (iLen - 4 === i) {
              p[3] = p[2];
            } else if (!i) {
              p[0] = {
                x: +crp[i],
                y: +crp[i + 1]
              };
            }
          }
          d.push([
            'C',
            (-p[0].x + 6 * p[1].x + p[2].x) / 6,
            (-p[0].y + 6 * p[1].y + p[2].y) / 6,
            (p[1].x + 6 * p[2].x - p[3].x) / 6,
            (p[1].y + 6 * p[2].y - p[3].y) / 6,
            p[2].x,
            p[2].y
          ]);
        }
        return d;
      };
    },
    function (module, exports, require) {
      var toString = require('./8');
      var lowerCase = function lowerCase(str) {
        return toString(str).toLowerCase();
      };
      module.exports = lowerCase;
    },
    function (module, exports, require) {
      var toString = require('./8');
      var upperCase = function upperCase(str) {
        return toString(str).toUpperCase();
      };
      module.exports = upperCase;
    },
    function (module, exports) {
      var toString = {}.toString;
      var getType = function getType(value) {
        return toString.call(value).replace(/^\[object /, '').replace(/\]$/, '');
      };
      module.exports = getType;
    },
    function (module, exports) {
      var objectProto = Object.prototype;
      var isPrototype = function isPrototype(value) {
        var Ctor = value && value.constructor;
        var proto = typeof Ctor === 'function' && Ctor.prototype || objectProto;
        return value === proto;
      };
      module.exports = isPrototype;
    },
    function (module, exports, require) {
      var isFunction = require('./three');
      var isArray = require('./1');
      var groupBy = require('./38');
      var groupToMap = function groupToMap(data, condition) {
        if (!condition) {
          return { 0: data };
        }
        if (!isFunction(condition)) {
          var paramsCondition = isArray(condition) ? condition : condition.replace(/\s+/g, '').split('*');
          condition = function condition(row) {
            var unique = '_';
            for (var i = 0, l = paramsCondition.length; i < l; i++) {
              unique += row[paramsCondition[i]] && row[paramsCondition[i]].toString();
            }
            return unique;
          };
        }
        var groups = groupBy(data, condition);
        return groups;
      };
      module.exports = groupToMap;
    },
    function (module, exports, require) {
      var each = require('./0');
      var isArray = require('./1');
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var groupBy = function groupBy(data, condition) {
        if (!condition || !isArray(data)) {
          return data;
        }
        var result = {};
        var key = null;
        each(data, function (item) {
          key = condition(item);
          if (hasOwnProperty.call(result, key)) {
            result[key].push(item);
          } else {
            result[key] = [item];
          }
        });
        return result;
      };
      module.exports = groupBy;
    },
    function (module, exports, require) {
      var isObjectLike = require('./13');
      var isArrayLike = require('./3');
      var isString = require('./10');
      var isEqual = function isEqual(value, other) {
        if (value === other) {
          return true;
        }
        if (!value || !other) {
          return false;
        }
        if (isString(value) || isString(other)) {
          return false;
        }
        if (isArrayLike(value) || isArrayLike(other)) {
          if (value.length !== other.length) {
            return false;
          }
          var rst = true;
          for (var i = 0; i < value.length; i++) {
            rst = isEqual(value[i], other[i]);
            if (!rst) {
              break;
            }
          }
          return rst;
        }
        if (isObjectLike(value) || isObjectLike(other)) {
          var valueKeys = Object.keys(value);
          var otherKeys = Object.keys(other);
          if (valueKeys.length !== otherKeys.length) {
            return false;
          }
          var _rst = true;
          for (var _i = 0; _i < valueKeys.length; _i++) {
            _rst = isEqual(value[valueKeys[_i]], other[valueKeys[_i]]);
            if (!_rst) {
              break;
            }
          }
          return _rst;
        }
        return false;
      };
      module.exports = isEqual;
    },
    function (module, exports, require) {
      var each = require('./0');
      var mix = require('./11');
      var DOMUtil = require('./41');
      var arrayUtil = require('./53');
      var eventUtil = require('./67');
      var formatUtil = require('./ImageSource');
      var mathUtil = require('./PolygonMaterial');
      var matrixUtil = require('./88');
      var objectUtil = require('./95');
      var pathUtil = require('./99');
      var stringUtil = require('./105');
      var typeUtil = require('./111');
      var util = {
        DOMUtil: DOMUtil,
        DomUtil: DOMUtil,
        MatrixUtil: matrixUtil,
        PathUtil: pathUtil,
        arrayUtil: arrayUtil,
        domUtil: DOMUtil,
        eventUtil: eventUtil,
        formatUtil: formatUtil,
        mathUtil: mathUtil,
        matrixUtil: matrixUtil,
        objectUtil: objectUtil,
        stringUtil: stringUtil,
        pathUtil: pathUtil,
        typeUtil: typeUtil,
        augment: require('./116'),
        clone: require('./24'),
        deepMix: require('./117'),
        each: each,
        extend: require('./118'),
        filter: require('./12'),
        group: require('./119'),
        groupBy: require('./38'),
        groupToMap: require('./37'),
        indexOf: require('./120'),
        isEmpty: require('./121'),
        isEqual: require('./39'),
        isEqualWith: require('./122'),
        map: require('./123'),
        mix: mix,
        pick: require('./124'),
        toArray: require('./14'),
        toString: require('./8'),
        uniqueId: require('./125')
      };
      each([
        DOMUtil,
        arrayUtil,
        eventUtil,
        formatUtil,
        mathUtil,
        matrixUtil,
        objectUtil,
        pathUtil,
        stringUtil,
        typeUtil
      ], function (collection) {
        mix(util, collection);
      });
      module.exports = util;
    },
    function (module, exports, require) {
      module.exports = {
        addEventListener: require('./42'),
        createDom: require('./43'),
        getBoundingClientRect: require('./44'),
        getHeight: require('./45'),
        getOuterHeight: require('./46'),
        getOuterWidth: require('./47'),
        getRatio: require('./48'),
        getStyle: require('./49'),
        getWidth: require('./50'),
        modifyCSS: require('./51'),
        requestAnimationFrame: require('./52')
      };
    },
    function (module, exports) {
      module.exports = function addEventListener(target, eventType, callback) {
        if (target) {
          if (target.addEventListener) {
            target.addEventListener(eventType, callback, false);
            return {
              remove: function remove() {
                target.removeEventListener(eventType, callback, false);
              }
            };
          } else if (target.attachEvent) {
            target.attachEvent('on' + eventType, callback);
            return {
              remove: function remove() {
                target.detachEvent('on' + eventType, callback);
              }
            };
          }
        }
      };
    },
    function (module, exports) {
      var TABLE = document.createElement('table');
      var TABLE_TR = document.createElement('tr');
      var FRAGMENT_REG = /^\s*<(\w+|!)[^>]*>/;
      var CONTAINERS = {
        tr: document.createElement('tbody'),
        tbody: TABLE,
        thead: TABLE,
        tfoot: TABLE,
        td: TABLE_TR,
        th: TABLE_TR,
        '*': document.createElement('div')
      };
      module.exports = function createDom(str) {
        var name = FRAGMENT_REG.test(str) && RegExp.$1;
        if (!(name in CONTAINERS)) {
          name = '*';
        }
        var container = CONTAINERS[name];
        str = str.replace(/(^\s*)|(\s*$)/g, '');
        container.innerHTML = '' + str;
        var dom = container.childNodes[0];
        container.removeChild(dom);
        return dom;
      };
    },
    function (module, exports) {
      module.exports = function getBoundingClientRect(node, defaultValue) {
        if (node && node.getBoundingClientRect) {
          var rect = node.getBoundingClientRect();
          var top = document.documentElement.clientTop;
          var left = document.documentElement.clientLeft;
          return {
            top: rect.top - top,
            bottom: rect.bottom - top,
            left: rect.left - left,
            right: rect.right - left
          };
        }
        return defaultValue || null;
      };
    },
    function (module, exports) {
      module.exports = function getHeight(el, defaultValue) {
        var height = this.getStyle(el, 'height', defaultValue);
        if (height === 'auto') {
          height = el.offsetHeight;
        }
        return parseFloat(height);
      };
    },
    function (module, exports) {
      module.exports = function getOuterHeight(el, defaultValue) {
        var height = this.getHeight(el, defaultValue);
        var bTop = parseFloat(this.getStyle(el, 'borderTopWidth')) || 0;
        var pTop = parseFloat(this.getStyle(el, 'paddingTop')) || 0;
        var pBottom = parseFloat(this.getStyle(el, 'paddingBottom')) || 0;
        var bBottom = parseFloat(this.getStyle(el, 'borderBottomWidth')) || 0;
        return height + bTop + bBottom + pTop + pBottom;
      };
    },
    function (module, exports) {
      module.exports = function getOuterWidth(el, defaultValue) {
        var width = this.getWidth(el, defaultValue);
        var bLeft = parseFloat(this.getStyle(el, 'borderLeftWidth')) || 0;
        var pLeft = parseFloat(this.getStyle(el, 'paddingLeft')) || 0;
        var pRight = parseFloat(this.getStyle(el, 'paddingRight')) || 0;
        var bRight = parseFloat(this.getStyle(el, 'borderRightWidth')) || 0;
        return width + bLeft + bRight + pLeft + pRight;
      };
    },
    function (module, exports) {
      module.exports = function getRatio() {
        return window.devicePixelRatio ? window.devicePixelRatio : 2;
      };
    },
    function (module, exports, require) {
      var isNil = require('./5');
      module.exports = function getStyle(dom, name, defaultValue) {
        try {
          if (window.getComputedStyle) {
            return window.getComputedStyle(dom, null)[name];
          }
          return dom.currentStyle[name];
        } catch (e) {
          if (!isNil(defaultValue)) {
            return defaultValue;
          }
          return null;
        }
      };
    },
    function (module, exports) {
      module.exports = function getWidth(el, defaultValue) {
        var width = this.getStyle(el, 'width', defaultValue);
        if (width === 'auto') {
          width = el.offsetWidth;
        }
        return parseFloat(width);
      };
    },
    function (module, exports) {
      module.exports = function modifyCSS(dom, css) {
        if (dom) {
          for (var key in css) {
            if (css.hasOwnProperty(key)) {
              dom.style[key] = css[key];
            }
          }
        }
        return dom;
      };
    },
    function (module, exports) {
      module.exports = function requestAnimationFrame(fn) {
        var method = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
          return setTimeout(fn, 16);
        };
        return method(fn);
      };
    },
    function (module, exports, require) {
      module.exports = {
        contains: require('./9'),
        difference: require('./54'),
        find: require('./55'),
        firstValue: require('./56'),
        flatten: require('./57'),
        flattenDeep: require('./58'),
        getRange: require('./59'),
        merge: require('./60'),
        pull: require('./61'),
        pullAt: require('./19'),
        reduce: require('./62'),
        remove: require('./63'),
        sortBy: require('./64'),
        union: require('./65'),
        uniq: require('./Global'),
        valuesOfKey: require('./66')
      };
    },
    function (module, exports, require) {
      var filter = require('./12');
      var contains = require('./9');
      var difference = function difference(arr) {
        var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        return filter(arr, function (value) {
          return !contains(values, value);
        });
      };
      module.exports = difference;
    },
    function (module, exports, require) {
      var isFunction = require('./three');
      var isPlainObject = require('./7');
      var isMatch = require('./BufferBase');
      function find(arr, predicate) {
        var _predicate = void 0;
        if (isFunction(predicate)) {
          _predicate = predicate;
        }
        if (isPlainObject(predicate)) {
          _predicate = function _predicate(a) {
            return isMatch(a, predicate);
          };
        }
        if (_predicate) {
          for (var i = 0; i < arr.length; i += 1) {
            if (_predicate(arr[i])) {
              return arr[i];
            }
          }
        }
        return null;
      }
      module.exports = find;
    },
    function (module, exports, require) {
      var isNil = require('./5');
      var isArray = require('./1');
      var firstValue = function firstValue(data, name) {
        var rst = null;
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          var value = obj[name];
          if (!isNil(value)) {
            if (isArray(value)) {
              rst = value[0];
            } else {
              rst = value;
            }
            break;
          }
        }
        return rst;
      };
      module.exports = firstValue;
    },
    function (module, exports, require) {
      var isArray = require('./1');
      var each = require('./0');
      var flatten = function flatten(arr) {
        if (!isArray(arr)) {
          return arr;
        }
        var result = [];
        each(arr, function (item) {
          if (isArray(item)) {
            each(item, function (subItem) {
              result.push(subItem);
            });
          } else {
            result.push(item);
          }
        });
        return result;
      };
      module.exports = flatten;
    },
    function (module, exports, require) {
      var isArray = require('./1');
      var flattenDeep = function flattenDeep(arr) {
        var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        if (!isArray(arr)) {
          result.push(arr);
        } else {
          for (var i = 0; i < arr.length; i += 1) {
            flattenDeep(arr[i], result);
          }
        }
        return result;
      };
      module.exports = flattenDeep;
    },
    function (module, exports, require) {
      var filter = require('./12');
      var isArray = require('./1');
      var getRange = function getRange(values) {
        values = filter(values, function (v) {
          return !isNaN(v);
        });
        if (!values.length) {
          return {
            min: 0,
            max: 0
          };
        }
        if (isArray(values[0])) {
          var tmp = [];
          for (var i = 0; i < values.length; i++) {
            tmp = tmp.concat(values[i]);
          }
          values = tmp;
        }
        var max = Math.max.apply(null, values);
        var min = Math.min.apply(null, values);
        return {
          min: min,
          max: max
        };
      };
      module.exports = getRange;
    },
    function (module, exports) {
      var merge = function merge(dataArray) {
        var rst = [];
        for (var i = 0; i < dataArray.length; i++) {
          rst = rst.concat(dataArray[i]);
        }
        return rst;
      };
      module.exports = merge;
    },
    function (module, exports) {
      var arrPrototype = Array.prototype;
      var splice = arrPrototype.splice;
      var indexOf = arrPrototype.indexOf;
      var slice = arrPrototype.slice;
      var pull = function pull(arr) {
        var values = slice.call(arguments, 1);
        for (var i = 0; i < values.length; i++) {
          var value = values[i];
          var fromIndex = -1;
          while ((fromIndex = indexOf.call(arr, value)) > -1) {
            splice.call(arr, fromIndex, 1);
          }
        }
        return arr;
      };
      module.exports = pull;
    },
    function (module, exports, require) {
      var isArray = require('./1');
      var isPlainObject = require('./7');
      var each = require('./0');
      var reduce = function reduce(arr, fn, init) {
        if (!isArray(arr) && !isPlainObject(arr)) {
          return arr;
        }
        var result = init;
        each(arr, function (data, i) {
          result = fn(result, data, i);
        });
        return result;
      };
      module.exports = reduce;
    },
    function (module, exports, require) {
      var isArrayLike = require('./3');
      var pullAt = require('./19');
      var remove = function remove(arr, predicate) {
        var result = [];
        if (!isArrayLike(arr)) {
          return result;
        }
        var i = -1;
        var indexes = [];
        var length = arr.length;
        while (++i < length) {
          var value = arr[i];
          if (predicate(value, i, arr)) {
            result.push(value);
            indexes.push(i);
          }
        }
        pullAt(arr, indexes);
        return result;
      };
      module.exports = remove;
    },
    function (module, exports, require) {
      var isString = require('./10');
      var isFunction = require('./three');
      var isArray = require('./1');
      function sortBy(arr, key) {
        var comparer = void 0;
        if (isFunction(key)) {
          comparer = function comparer(a, b) {
            return key(a) - key(b);
          };
        } else {
          var keys = [];
          if (isString(key)) {
            keys.push(key);
          } else if (isArray(key)) {
            keys = key;
          }
          comparer = function comparer(a, b) {
            for (var i = 0; i < keys.length; i += 1) {
              var prop = keys[i];
              if (a[prop] > b[prop]) {
                return 1;
              }
              if (a[prop] < b[prop]) {
                return -1;
              }
            }
            return 0;
          };
        }
        arr.sort(comparer);
        return arr;
      }
      module.exports = sortBy;
    },
    function (module, exports, require) {
      var each = require('./0');
      var toArray = require('./14');
      var uniq = require('./Global');
      var union = function union() {
        var result = [];
        var sources = toArray(arguments);
        each(sources, function (arr) {
          result = result.concat(arr);
        });
        return uniq(result);
      };
      module.exports = union;
    },
    function (module, exports, require) {
      var isNil = require('./5');
      var isArray = require('./1');
      var each = require('./0');
      module.exports = function valuesOfKey(data, name) {
        var rst = [];
        var tmpMap = {};
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          var value = obj[name];
          if (!isNil(value)) {
            if (!isArray(value)) {
              value = [value];
            }
            each(value, function (val) {
              if (!tmpMap[val]) {
                rst.push(val);
                tmpMap[val] = true;
              }
            });
          }
        }
        return rst;
      };
    },
    function (module, exports, require) {
      module.exports = {
        getWrapBehavior: require('./68'),
        wrapBehavior: require('./CSVSource')
      };
    },
    function (module, exports) {
      function getWrapBehavior(obj, action) {
        return obj['_wrap_' + action];
      }
      module.exports = getWrapBehavior;
    },
    function (module, exports) {
      function wrapBehavior(obj, action) {
        if (obj['_wrap_' + action]) {
          return obj['_wrap_' + action];
        }
        var method = function method(e) {
          obj[action](e);
        };
        obj['_wrap_' + action] = method;
        return method;
      }
      module.exports = wrapBehavior;
    },
    function (module, exports, require) {
      var number2color = require('./PolygonBuffer');
      module.exports = {
        number2color: number2color,
        numberToColor: number2color,
        parsePath: require('./72'),
        parseRadius: require('./73')
      };
    },
    function (module, exports) {
      var numColorCache = {};
      module.exports = function numberToColor(num) {
        var color = numColorCache[num];
        if (!color) {
          var str = num.toString(16);
          for (var i = str.length; i < 6; i++) {
            str = '0' + str;
          }
          color = '#' + str;
          numColorCache[num] = color;
        }
        return color;
      };
    },
    function (module, exports, require) {
      var isArray = require('./1');
      var isString = require('./10');
      var each = require('./0');
      var regexTags = /[MLHVQTCSAZ]([^MLHVQTCSAZ]*)/ig;
      var regexDot = /[^\s\,]+/ig;
      module.exports = function parsePath(path) {
        path = path || [];
        if (isArray(path)) {
          return path;
        }
        if (isString(path)) {
          path = path.match(regexTags);
          each(path, function (item, index) {
            item = item.match(regexDot);
            if (item[0].length > 1) {
              var tag = item[0].charAt(0);
              item.splice(1, 0, item[0].substr(1));
              item[0] = tag;
            }
            each(item, function (sub, i) {
              if (!isNaN(sub)) {
                item[i] = +sub;
              }
            });
            path[index] = item;
          });
          return path;
        }
      };
    },
    function (module, exports, require) {
      var isArray = require('./1');
      module.exports = function parseRadius(radius) {
        var r1 = 0, r2 = 0, r3 = 0, r4 = 0;
        if (isArray(radius)) {
          if (radius.length === 1) {
            r1 = r2 = r3 = r4 = radius[0];
          } else if (radius.length === 2) {
            r1 = r3 = radius[0];
            r2 = r4 = radius[1];
          } else if (radius.length === 3) {
            r1 = radius[0];
            r2 = r4 = radius[1];
            r3 = radius[2];
          } else {
            r1 = radius[0];
            r2 = radius[1];
            r3 = radius[2];
            r4 = radius[3];
          }
        } else {
          r1 = r2 = r3 = r4 = radius;
        }
        return {
          r1: r1,
          r2: r2,
          r3: r3,
          r4: r4
        };
      };
    },
    function (module, exports, require) {
      var isNumberEqual = require('./75');
      module.exports = {
        clamp: require('./Layer'),
        fixedBase: require('./76'),
        isDecimal: require('./index'),
        isEven: require('./Scene'),
        isInteger: require('./Engine'),
        isNegative: require('./80'),
        isNumberEqual: isNumberEqual,
        isOdd: require('./81'),
        isPositive: require('./82'),
        maxBy: require('./83'),
        minBy: require('./84'),
        mod: require('./85'),
        snapEqual: isNumberEqual,
        toDegree: require('./86'),
        toInt: require('./Base'),
        toInteger: require('./Base'),
        toRadian: require('./87')
      };
    },
    function (module, exports) {
      var PRECISION = 0.00001;
      module.exports = function isNumberEqual(a, b) {
        var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PRECISION;
        return Math.abs(a - b) < precision;
      };
    },
    function (module, exports) {
      var fixedBase = function fixedBase(v, base) {
        var str = base.toString();
        var index = str.indexOf('.');
        if (index === -1) {
          return Math.round(v);
        }
        var length = str.substr(index + 1).length;
        if (length > 20) {
          length = 20;
        }
        return parseFloat(v.toFixed(length));
      };
      module.exports = fixedBase;
    },
    function (module, exports, require) {
      var isNumber = require('./6');
      var isDecimal = function isDecimal(num) {
        return isNumber(num) && num % 1 !== 0;
      };
      module.exports = isDecimal;
    },
    function (module, exports, require) {
      var isNumber = require('./6');
      var isEven = function isEven(num) {
        return isNumber(num) && num % 2 === 0;
      };
      module.exports = isEven;
    },
    function (module, exports, require) {
      var isNumber = require('./6');
      var isInteger = Number.isInteger ? Number.isInteger : function (num) {
        return isNumber(num) && num % 1 === 0;
      };
      module.exports = isInteger;
    },
    function (module, exports, require) {
      var isNumber = require('./6');
      var isNagative = function isNagative(num) {
        return isNumber(num) && num < 0;
      };
      module.exports = isNagative;
    },
    function (module, exports, require) {
      var isNumber = require('./6');
      var isOdd = function isOdd(num) {
        return isNumber(num) && num % 2 !== 0;
      };
      module.exports = isOdd;
    },
    function (module, exports, require) {
      var isNumber = require('./6');
      var isPositive = function isPositive(num) {
        return isNumber(num) && num > 0;
      };
      module.exports = isPositive;
    },
    function (module, exports, require) {
      var isArray = require('./1');
      var isFunction = require('./three');
      var each = require('./0');
      var maxBy = function maxBy(arr, fn) {
        if (!isArray(arr)) {
          return undefined;
        }
        var max = arr[0];
        var maxData = void 0;
        if (isFunction(fn)) {
          maxData = fn(arr[0]);
        } else {
          maxData = arr[0][fn];
        }
        var data = void 0;
        each(arr, function (val) {
          if (isFunction(fn)) {
            data = fn(val);
          } else {
            data = val[fn];
          }
          if (data > maxData) {
            max = val;
            maxData = data;
          }
        });
        return max;
      };
      module.exports = maxBy;
    },
    function (module, exports, require) {
      var isArray = require('./1');
      var isFunction = require('./three');
      var each = require('./0');
      var minBy = function minBy(arr, fn) {
        if (!isArray(arr)) {
          return undefined;
        }
        var min = arr[0];
        var minData = void 0;
        if (isFunction(fn)) {
          minData = fn(arr[0]);
        } else {
          minData = arr[0][fn];
        }
        var data = void 0;
        each(arr, function (val) {
          if (isFunction(fn)) {
            data = fn(val);
          } else {
            data = val[fn];
          }
          if (data < minData) {
            min = val;
            minData = data;
          }
        });
        return min;
      };
      module.exports = minBy;
    },
    function (module, exports) {
      var mod = function mod(n, m) {
        return (n % m + m) % m;
      };
      module.exports = mod;
    },
    function (module, exports) {
      var DEGREE = 180 / Math.PI;
      var toDegree = function toDegree(radian) {
        return DEGREE * radian;
      };
      module.exports = toDegree;
    },
    function (module, exports) {
      var RADIAN = Math.PI / 180;
      var toRadian = function toRadian(degree) {
        return RADIAN * degree;
      };
      module.exports = toRadian;
    },
    function (module, exports, require) {
      module.exports = {
        mat3: require('./Source'),
        vec2: require('./90'),
        vec3: require('./92'),
        transform: require('./94')
      };
    },
    function (module, exports, require) {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.sub = exports.mul = undefined;
      exports.create = create;
      exports.fromMat4 = fromMat4;
      exports.clone = clone;
      exports.copy = copy;
      exports.fromValues = fromValues;
      exports.set = set;
      exports.identity = identity;
      exports.transpose = transpose;
      exports.invert = invert;
      exports.adjoint = adjoint;
      exports.determinant = determinant;
      exports.multiply = multiply;
      exports.translate = translate;
      exports.rotate = rotate;
      exports.scale = scale;
      exports.fromTranslation = fromTranslation;
      exports.fromRotation = fromRotation;
      exports.fromScaling = fromScaling;
      exports.fromMat2d = fromMat2d;
      exports.fromQuat = fromQuat;
      exports.normalFromMat4 = normalFromMat4;
      exports.projection = projection;
      exports.str = str;
      exports.frob = frob;
      exports.add = add;
      exports.subtract = subtract;
      exports.multiplyScalar = multiplyScalar;
      exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
      exports.exactEquals = exactEquals;
      exports.equals = equals;
      var _common = require('./15');
      var glMatrix = _interopRequireWildcard(_common);
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj[key] = obj[key];
            }
          }
          newObj.default = obj;
          return newObj;
        }
      }
      function create() {
        var out = new glMatrix.ARRAY_TYPE(9);
        if (glMatrix.ARRAY_TYPE != Float32Array) {
          out[1] = 0;
          out[2] = 0;
          out[3] = 0;
          out[5] = 0;
          out[6] = 0;
          out[7] = 0;
        }
        out[0] = 1;
        out[4] = 1;
        out[8] = 1;
        return out;
      }
      function fromMat4(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[4];
        out[4] = a[5];
        out[5] = a[6];
        out[6] = a[8];
        out[7] = a[9];
        out[8] = a[10];
        return out;
      }
      function clone(a) {
        var out = new glMatrix.ARRAY_TYPE(9);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
      }
      function copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
      }
      function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        var out = new glMatrix.ARRAY_TYPE(9);
        out[0] = m00;
        out[1] = m01;
        out[2] = m02;
        out[3] = m10;
        out[4] = m11;
        out[5] = m12;
        out[6] = m20;
        out[7] = m21;
        out[8] = m22;
        return out;
      }
      function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        out[0] = m00;
        out[1] = m01;
        out[2] = m02;
        out[3] = m10;
        out[4] = m11;
        out[5] = m12;
        out[6] = m20;
        out[7] = m21;
        out[8] = m22;
        return out;
      }
      function identity(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
      }
      function transpose(out, a) {
        if (out === a) {
          var a01 = a[1], a02 = a[2], a12 = a[5];
          out[1] = a[3];
          out[2] = a[6];
          out[3] = a01;
          out[5] = a[7];
          out[6] = a02;
          out[7] = a12;
        } else {
          out[0] = a[0];
          out[1] = a[3];
          out[2] = a[6];
          out[3] = a[1];
          out[4] = a[4];
          out[5] = a[7];
          out[6] = a[2];
          out[7] = a[5];
          out[8] = a[8];
        }
        return out;
      }
      function invert(out, a) {
        var a00 = a[0], a01 = a[1], a02 = a[2];
        var a10 = a[3], a11 = a[4], a12 = a[5];
        var a20 = a[6], a21 = a[7], a22 = a[8];
        var b01 = a22 * a11 - a12 * a21;
        var b11 = -a22 * a10 + a12 * a20;
        var b21 = a21 * a10 - a11 * a20;
        var det = a00 * b01 + a01 * b11 + a02 * b21;
        if (!det) {
          return null;
        }
        det = 1 / det;
        out[0] = b01 * det;
        out[1] = (-a22 * a01 + a02 * a21) * det;
        out[2] = (a12 * a01 - a02 * a11) * det;
        out[3] = b11 * det;
        out[4] = (a22 * a00 - a02 * a20) * det;
        out[5] = (-a12 * a00 + a02 * a10) * det;
        out[6] = b21 * det;
        out[7] = (-a21 * a00 + a01 * a20) * det;
        out[8] = (a11 * a00 - a01 * a10) * det;
        return out;
      }
      function adjoint(out, a) {
        var a00 = a[0], a01 = a[1], a02 = a[2];
        var a10 = a[3], a11 = a[4], a12 = a[5];
        var a20 = a[6], a21 = a[7], a22 = a[8];
        out[0] = a11 * a22 - a12 * a21;
        out[1] = a02 * a21 - a01 * a22;
        out[2] = a01 * a12 - a02 * a11;
        out[3] = a12 * a20 - a10 * a22;
        out[4] = a00 * a22 - a02 * a20;
        out[5] = a02 * a10 - a00 * a12;
        out[6] = a10 * a21 - a11 * a20;
        out[7] = a01 * a20 - a00 * a21;
        out[8] = a00 * a11 - a01 * a10;
        return out;
      }
      function determinant(a) {
        var a00 = a[0], a01 = a[1], a02 = a[2];
        var a10 = a[3], a11 = a[4], a12 = a[5];
        var a20 = a[6], a21 = a[7], a22 = a[8];
        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
      }
      function multiply(out, a, b) {
        var a00 = a[0], a01 = a[1], a02 = a[2];
        var a10 = a[3], a11 = a[4], a12 = a[5];
        var a20 = a[6], a21 = a[7], a22 = a[8];
        var b00 = b[0], b01 = b[1], b02 = b[2];
        var b10 = b[3], b11 = b[4], b12 = b[5];
        var b20 = b[6], b21 = b[7], b22 = b[8];
        out[0] = b00 * a00 + b01 * a10 + b02 * a20;
        out[1] = b00 * a01 + b01 * a11 + b02 * a21;
        out[2] = b00 * a02 + b01 * a12 + b02 * a22;
        out[3] = b10 * a00 + b11 * a10 + b12 * a20;
        out[4] = b10 * a01 + b11 * a11 + b12 * a21;
        out[5] = b10 * a02 + b11 * a12 + b12 * a22;
        out[6] = b20 * a00 + b21 * a10 + b22 * a20;
        out[7] = b20 * a01 + b21 * a11 + b22 * a21;
        out[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return out;
      }
      function translate(out, a, v) {
        var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a10;
        out[4] = a11;
        out[5] = a12;
        out[6] = x * a00 + y * a10 + a20;
        out[7] = x * a01 + y * a11 + a21;
        out[8] = x * a02 + y * a12 + a22;
        return out;
      }
      function rotate(out, a, rad) {
        var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
        out[0] = c * a00 + s * a10;
        out[1] = c * a01 + s * a11;
        out[2] = c * a02 + s * a12;
        out[3] = c * a10 - s * a00;
        out[4] = c * a11 - s * a01;
        out[5] = c * a12 - s * a02;
        out[6] = a20;
        out[7] = a21;
        out[8] = a22;
        return out;
      }
      ;
      function scale(out, a, v) {
        var x = v[0], y = v[1];
        out[0] = x * a[0];
        out[1] = x * a[1];
        out[2] = x * a[2];
        out[3] = y * a[3];
        out[4] = y * a[4];
        out[5] = y * a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
      }
      function fromTranslation(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = v[0];
        out[7] = v[1];
        out[8] = 1;
        return out;
      }
      function fromRotation(out, rad) {
        var s = Math.sin(rad), c = Math.cos(rad);
        out[0] = c;
        out[1] = s;
        out[2] = 0;
        out[3] = -s;
        out[4] = c;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
      }
      function fromScaling(out, v) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = v[1];
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
      }
      function fromMat2d(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = 0;
        out[3] = a[2];
        out[4] = a[3];
        out[5] = 0;
        out[6] = a[4];
        out[7] = a[5];
        out[8] = 1;
        return out;
      }
      function fromQuat(out, q) {
        var x = q[0], y = q[1], z = q[2], w = q[3];
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var yx = y * x2;
        var yy = y * y2;
        var zx = z * x2;
        var zy = z * y2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
        out[0] = 1 - yy - zz;
        out[3] = yx - wz;
        out[6] = zx + wy;
        out[1] = yx + wz;
        out[4] = 1 - xx - zz;
        out[7] = zy - wx;
        out[2] = zx - wy;
        out[5] = zy + wx;
        out[8] = 1 - xx - yy;
        return out;
      }
      function normalFromMat4(out, a) {
        var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        var b00 = a00 * a11 - a01 * a10;
        var b01 = a00 * a12 - a02 * a10;
        var b02 = a00 * a13 - a03 * a10;
        var b03 = a01 * a12 - a02 * a11;
        var b04 = a01 * a13 - a03 * a11;
        var b05 = a02 * a13 - a03 * a12;
        var b06 = a20 * a31 - a21 * a30;
        var b07 = a20 * a32 - a22 * a30;
        var b08 = a20 * a33 - a23 * a30;
        var b09 = a21 * a32 - a22 * a31;
        var b10 = a21 * a33 - a23 * a31;
        var b11 = a22 * a33 - a23 * a32;
        var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
          return null;
        }
        det = 1 / det;
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        return out;
      }
      function projection(out, width, height) {
        out[0] = 2 / width;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = -2 / height;
        out[5] = 0;
        out[6] = -1;
        out[7] = 1;
        out[8] = 1;
        return out;
      }
      function str(a) {
        return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
      }
      function frob(a) {
        return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
      }
      function add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        out[4] = a[4] + b[4];
        out[5] = a[5] + b[5];
        out[6] = a[6] + b[6];
        out[7] = a[7] + b[7];
        out[8] = a[8] + b[8];
        return out;
      }
      function subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];
        out[4] = a[4] - b[4];
        out[5] = a[5] - b[5];
        out[6] = a[6] - b[6];
        out[7] = a[7] - b[7];
        out[8] = a[8] - b[8];
        return out;
      }
      function multiplyScalar(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        out[4] = a[4] * b;
        out[5] = a[5] * b;
        out[6] = a[6] * b;
        out[7] = a[7] * b;
        out[8] = a[8] * b;
        return out;
      }
      function multiplyScalarAndAdd(out, a, b, scale) {
        out[0] = a[0] + b[0] * scale;
        out[1] = a[1] + b[1] * scale;
        out[2] = a[2] + b[2] * scale;
        out[3] = a[3] + b[3] * scale;
        out[4] = a[4] + b[4] * scale;
        out[5] = a[5] + b[5] * scale;
        out[6] = a[6] + b[6] * scale;
        out[7] = a[7] + b[7] * scale;
        out[8] = a[8] + b[8] * scale;
        return out;
      }
      function exactEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
      }
      function equals(a, b) {
        var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
        return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
      }
      var mul = exports.mul = multiply;
      var sub = exports.sub = subtract;
    },
    function (module, exports, require) {
      var vec2 = require('./91');
      var clamp = require('./Layer');
      vec2.angle = function (v1, v2) {
        var theta = vec2.dot(v1, v2) / (vec2.length(v1) * vec2.length(v2));
        return Math.acos(clamp(theta, -1, 1));
      };
      vec2.direction = function (v1, v2) {
        return v1[0] * v2[1] - v2[0] * v1[1];
      };
      vec2.angleTo = function (v1, v2, direct) {
        var angle = vec2.angle(v1, v2);
        var angleLargeThanPI = vec2.direction(v1, v2) >= 0;
        if (direct) {
          if (angleLargeThanPI) {
            return Math.PI * 2 - angle;
          }
          return angle;
        }
        if (angleLargeThanPI) {
          return angle;
        }
        return Math.PI * 2 - angle;
      };
      vec2.vertical = function (out, v, flag) {
        if (flag) {
          out[0] = v[1];
          out[1] = -1 * v[0];
        } else {
          out[0] = -1 * v[1];
          out[1] = v[0];
        }
        return out;
      };
      module.exports = vec2;
    },
    function (module, exports, require) {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.forEach = exports.sqrLen = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = exports.len = undefined;
      exports.create = create;
      exports.clone = clone;
      exports.fromValues = fromValues;
      exports.copy = copy;
      exports.set = set;
      exports.add = add;
      exports.subtract = subtract;
      exports.multiply = multiply;
      exports.divide = divide;
      exports.ceil = ceil;
      exports.floor = floor;
      exports.min = min;
      exports.max = max;
      exports.round = round;
      exports.scale = scale;
      exports.scaleAndAdd = scaleAndAdd;
      exports.distance = distance;
      exports.squaredDistance = squaredDistance;
      exports.length = length;
      exports.squaredLength = squaredLength;
      exports.negate = negate;
      exports.inverse = inverse;
      exports.normalize = normalize;
      exports.dot = dot;
      exports.cross = cross;
      exports.lerp = lerp;
      exports.random = random;
      exports.transformMat2 = transformMat2;
      exports.transformMat2d = transformMat2d;
      exports.transformMat3 = transformMat3;
      exports.transformMat4 = transformMat4;
      exports.rotate = rotate;
      exports.angle = angle;
      exports.str = str;
      exports.exactEquals = exactEquals;
      exports.equals = equals;
      var _common = require('./15');
      var glMatrix = _interopRequireWildcard(_common);
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj[key] = obj[key];
            }
          }
          newObj.default = obj;
          return newObj;
        }
      }
      function create() {
        var out = new glMatrix.ARRAY_TYPE(2);
        if (glMatrix.ARRAY_TYPE != Float32Array) {
          out[0] = 0;
          out[1] = 0;
        }
        return out;
      }
      function clone(a) {
        var out = new glMatrix.ARRAY_TYPE(2);
        out[0] = a[0];
        out[1] = a[1];
        return out;
      }
      function fromValues(x, y) {
        var out = new glMatrix.ARRAY_TYPE(2);
        out[0] = x;
        out[1] = y;
        return out;
      }
      function copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        return out;
      }
      function set(out, x, y) {
        out[0] = x;
        out[1] = y;
        return out;
      }
      function add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        return out;
      }
      function subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        return out;
      }
      function multiply(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        return out;
      }
      function divide(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        return out;
      }
      function ceil(out, a) {
        out[0] = Math.ceil(a[0]);
        out[1] = Math.ceil(a[1]);
        return out;
      }
      function floor(out, a) {
        out[0] = Math.floor(a[0]);
        out[1] = Math.floor(a[1]);
        return out;
      }
      function min(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        return out;
      }
      function max(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        return out;
      }
      function round(out, a) {
        out[0] = Math.round(a[0]);
        out[1] = Math.round(a[1]);
        return out;
      }
      function scale(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        return out;
      }
      function scaleAndAdd(out, a, b, scale) {
        out[0] = a[0] + b[0] * scale;
        out[1] = a[1] + b[1] * scale;
        return out;
      }
      function distance(a, b) {
        var x = b[0] - a[0], y = b[1] - a[1];
        return Math.sqrt(x * x + y * y);
      }
      function squaredDistance(a, b) {
        var x = b[0] - a[0], y = b[1] - a[1];
        return x * x + y * y;
      }
      function length(a) {
        var x = a[0], y = a[1];
        return Math.sqrt(x * x + y * y);
      }
      function squaredLength(a) {
        var x = a[0], y = a[1];
        return x * x + y * y;
      }
      function negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        return out;
      }
      function inverse(out, a) {
        out[0] = 1 / a[0];
        out[1] = 1 / a[1];
        return out;
      }
      function normalize(out, a) {
        var x = a[0], y = a[1];
        var len = x * x + y * y;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = a[0] * len;
          out[1] = a[1] * len;
        }
        return out;
      }
      function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
      }
      function cross(out, a, b) {
        var z = a[0] * b[1] - a[1] * b[0];
        out[0] = out[1] = 0;
        out[2] = z;
        return out;
      }
      function lerp(out, a, b, t) {
        var ax = a[0], ay = a[1];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        return out;
      }
      function random(out, scale) {
        scale = scale || 1;
        var r = glMatrix.RANDOM() * 2 * Math.PI;
        out[0] = Math.cos(r) * scale;
        out[1] = Math.sin(r) * scale;
        return out;
      }
      function transformMat2(out, a, m) {
        var x = a[0], y = a[1];
        out[0] = m[0] * x + m[2] * y;
        out[1] = m[1] * x + m[3] * y;
        return out;
      }
      function transformMat2d(out, a, m) {
        var x = a[0], y = a[1];
        out[0] = m[0] * x + m[2] * y + m[4];
        out[1] = m[1] * x + m[3] * y + m[5];
        return out;
      }
      function transformMat3(out, a, m) {
        var x = a[0], y = a[1];
        out[0] = m[0] * x + m[3] * y + m[6];
        out[1] = m[1] * x + m[4] * y + m[7];
        return out;
      }
      function transformMat4(out, a, m) {
        var x = a[0];
        var y = a[1];
        out[0] = m[0] * x + m[4] * y + m[12];
        out[1] = m[1] * x + m[5] * y + m[13];
        return out;
      }
      function rotate(out, a, b, c) {
        var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(c), cosC = Math.cos(c);
        out[0] = p0 * cosC - p1 * sinC + b[0];
        out[1] = p0 * sinC + p1 * cosC + b[1];
        return out;
      }
      function angle(a, b) {
        var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1];
        var len1 = x1 * x1 + y1 * y1;
        if (len1 > 0) {
          len1 = 1 / Math.sqrt(len1);
        }
        var len2 = x2 * x2 + y2 * y2;
        if (len2 > 0) {
          len2 = 1 / Math.sqrt(len2);
        }
        var cosine = (x1 * x2 + y1 * y2) * len1 * len2;
        if (cosine > 1) {
          return 0;
        } else if (cosine < -1) {
          return Math.PI;
        } else {
          return Math.acos(cosine);
        }
      }
      function str(a) {
        return 'vec2(' + a[0] + ', ' + a[1] + ')';
      }
      function exactEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1];
      }
      function equals(a, b) {
        var a0 = a[0], a1 = a[1];
        var b0 = b[0], b1 = b[1];
        return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
      }
      var len = exports.len = length;
      var sub = exports.sub = subtract;
      var mul = exports.mul = multiply;
      var div = exports.div = divide;
      var dist = exports.dist = distance;
      var sqrDist = exports.sqrDist = squaredDistance;
      var sqrLen = exports.sqrLen = squaredLength;
      var forEach = exports.forEach = function () {
        var vec = create();
        return function (a, stride, offset, count, fn, arg) {
          var i = void 0, l = void 0;
          if (!stride) {
            stride = 2;
          }
          if (!offset) {
            offset = 0;
          }
          if (count) {
            l = Math.min(count * stride + offset, a.length);
          } else {
            l = a.length;
          }
          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
          }
          return a;
        };
      }();
    },
    function (module, exports, require) {
      var vec3 = require('./93');
      module.exports = vec3;
    },
    function (module, exports, require) {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = undefined;
      exports.create = create;
      exports.clone = clone;
      exports.length = length;
      exports.fromValues = fromValues;
      exports.copy = copy;
      exports.set = set;
      exports.add = add;
      exports.subtract = subtract;
      exports.multiply = multiply;
      exports.divide = divide;
      exports.ceil = ceil;
      exports.floor = floor;
      exports.min = min;
      exports.max = max;
      exports.round = round;
      exports.scale = scale;
      exports.scaleAndAdd = scaleAndAdd;
      exports.distance = distance;
      exports.squaredDistance = squaredDistance;
      exports.squaredLength = squaredLength;
      exports.negate = negate;
      exports.inverse = inverse;
      exports.normalize = normalize;
      exports.dot = dot;
      exports.cross = cross;
      exports.lerp = lerp;
      exports.hermite = hermite;
      exports.bezier = bezier;
      exports.random = random;
      exports.transformMat4 = transformMat4;
      exports.transformMat3 = transformMat3;
      exports.transformQuat = transformQuat;
      exports.rotateX = rotateX;
      exports.rotateY = rotateY;
      exports.rotateZ = rotateZ;
      exports.angle = angle;
      exports.str = str;
      exports.exactEquals = exactEquals;
      exports.equals = equals;
      var _common = require('./15');
      var glMatrix = _interopRequireWildcard(_common);
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj[key] = obj[key];
            }
          }
          newObj.default = obj;
          return newObj;
        }
      }
      function create() {
        var out = new glMatrix.ARRAY_TYPE(3);
        if (glMatrix.ARRAY_TYPE != Float32Array) {
          out[0] = 0;
          out[1] = 0;
          out[2] = 0;
        }
        return out;
      }
      function clone(a) {
        var out = new glMatrix.ARRAY_TYPE(3);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
      }
      function length(a) {
        var x = a[0];
        var y = a[1];
        var z = a[2];
        return Math.sqrt(x * x + y * y + z * z);
      }
      function fromValues(x, y, z) {
        var out = new glMatrix.ARRAY_TYPE(3);
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
      }
      function copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
      }
      function set(out, x, y, z) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
      }
      function add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        return out;
      }
      function subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        return out;
      }
      function multiply(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        return out;
      }
      function divide(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        return out;
      }
      function ceil(out, a) {
        out[0] = Math.ceil(a[0]);
        out[1] = Math.ceil(a[1]);
        out[2] = Math.ceil(a[2]);
        return out;
      }
      function floor(out, a) {
        out[0] = Math.floor(a[0]);
        out[1] = Math.floor(a[1]);
        out[2] = Math.floor(a[2]);
        return out;
      }
      function min(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        out[2] = Math.min(a[2], b[2]);
        return out;
      }
      function max(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        out[2] = Math.max(a[2], b[2]);
        return out;
      }
      function round(out, a) {
        out[0] = Math.round(a[0]);
        out[1] = Math.round(a[1]);
        out[2] = Math.round(a[2]);
        return out;
      }
      function scale(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        return out;
      }
      function scaleAndAdd(out, a, b, scale) {
        out[0] = a[0] + b[0] * scale;
        out[1] = a[1] + b[1] * scale;
        out[2] = a[2] + b[2] * scale;
        return out;
      }
      function distance(a, b) {
        var x = b[0] - a[0];
        var y = b[1] - a[1];
        var z = b[2] - a[2];
        return Math.sqrt(x * x + y * y + z * z);
      }
      function squaredDistance(a, b) {
        var x = b[0] - a[0];
        var y = b[1] - a[1];
        var z = b[2] - a[2];
        return x * x + y * y + z * z;
      }
      function squaredLength(a) {
        var x = a[0];
        var y = a[1];
        var z = a[2];
        return x * x + y * y + z * z;
      }
      function negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        return out;
      }
      function inverse(out, a) {
        out[0] = 1 / a[0];
        out[1] = 1 / a[1];
        out[2] = 1 / a[2];
        return out;
      }
      function normalize(out, a) {
        var x = a[0];
        var y = a[1];
        var z = a[2];
        var len = x * x + y * y + z * z;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = a[0] * len;
          out[1] = a[1] * len;
          out[2] = a[2] * len;
        }
        return out;
      }
      function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      }
      function cross(out, a, b) {
        var ax = a[0], ay = a[1], az = a[2];
        var bx = b[0], by = b[1], bz = b[2];
        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
      }
      function lerp(out, a, b, t) {
        var ax = a[0];
        var ay = a[1];
        var az = a[2];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        return out;
      }
      function hermite(out, a, b, c, d, t) {
        var factorTimes2 = t * t;
        var factor1 = factorTimes2 * (2 * t - 3) + 1;
        var factor2 = factorTimes2 * (t - 2) + t;
        var factor3 = factorTimes2 * (t - 1);
        var factor4 = factorTimes2 * (3 - 2 * t);
        out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
        out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
        out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
        return out;
      }
      function bezier(out, a, b, c, d, t) {
        var inverseFactor = 1 - t;
        var inverseFactorTimesTwo = inverseFactor * inverseFactor;
        var factorTimes2 = t * t;
        var factor1 = inverseFactorTimesTwo * inverseFactor;
        var factor2 = 3 * t * inverseFactorTimesTwo;
        var factor3 = 3 * factorTimes2 * inverseFactor;
        var factor4 = factorTimes2 * t;
        out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
        out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
        out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
        return out;
      }
      function random(out, scale) {
        scale = scale || 1;
        var r = glMatrix.RANDOM() * 2 * Math.PI;
        var z = glMatrix.RANDOM() * 2 - 1;
        var zScale = Math.sqrt(1 - z * z) * scale;
        out[0] = Math.cos(r) * zScale;
        out[1] = Math.sin(r) * zScale;
        out[2] = z * scale;
        return out;
      }
      function transformMat4(out, a, m) {
        var x = a[0], y = a[1], z = a[2];
        var w = m[3] * x + m[7] * y + m[11] * z + m[15];
        w = w || 1;
        out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        return out;
      }
      function transformMat3(out, a, m) {
        var x = a[0], y = a[1], z = a[2];
        out[0] = x * m[0] + y * m[3] + z * m[6];
        out[1] = x * m[1] + y * m[4] + z * m[7];
        out[2] = x * m[2] + y * m[5] + z * m[8];
        return out;
      }
      function transformQuat(out, a, q) {
        var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
        var x = a[0], y = a[1], z = a[2];
        var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
        var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
        var w2 = qw * 2;
        uvx *= w2;
        uvy *= w2;
        uvz *= w2;
        uuvx *= 2;
        uuvy *= 2;
        uuvz *= 2;
        out[0] = x + uvx + uuvx;
        out[1] = y + uvy + uuvy;
        out[2] = z + uvz + uuvz;
        return out;
      }
      function rotateX(out, a, b, c) {
        var p = [], r = [];
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];
        r[0] = p[0];
        r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
        r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);
        out[0] = r[0] + b[0];
        out[1] = r[1] + b[1];
        out[2] = r[2] + b[2];
        return out;
      }
      function rotateY(out, a, b, c) {
        var p = [], r = [];
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];
        r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
        r[1] = p[1];
        r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);
        out[0] = r[0] + b[0];
        out[1] = r[1] + b[1];
        out[2] = r[2] + b[2];
        return out;
      }
      function rotateZ(out, a, b, c) {
        var p = [], r = [];
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];
        r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
        r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
        r[2] = p[2];
        out[0] = r[0] + b[0];
        out[1] = r[1] + b[1];
        out[2] = r[2] + b[2];
        return out;
      }
      function angle(a, b) {
        var tempA = fromValues(a[0], a[1], a[2]);
        var tempB = fromValues(b[0], b[1], b[2]);
        normalize(tempA, tempA);
        normalize(tempB, tempB);
        var cosine = dot(tempA, tempB);
        if (cosine > 1) {
          return 0;
        } else if (cosine < -1) {
          return Math.PI;
        } else {
          return Math.acos(cosine);
        }
      }
      function str(a) {
        return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
      }
      function exactEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
      }
      function equals(a, b) {
        var a0 = a[0], a1 = a[1], a2 = a[2];
        var b0 = b[0], b1 = b[1], b2 = b[2];
        return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
      }
      var sub = exports.sub = subtract;
      var mul = exports.mul = multiply;
      var div = exports.div = divide;
      var dist = exports.dist = distance;
      var sqrDist = exports.sqrDist = squaredDistance;
      var len = exports.len = length;
      var sqrLen = exports.sqrLen = squaredLength;
      var forEach = exports.forEach = function () {
        var vec = create();
        return function (a, stride, offset, count, fn, arg) {
          var i = void 0, l = void 0;
          if (!stride) {
            stride = 3;
          }
          if (!offset) {
            offset = 0;
          }
          if (count) {
            l = Math.min(count * stride + offset, a.length);
          } else {
            l = a.length;
          }
          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            vec[2] = a[i + 2];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
            a[i + 2] = vec[2];
          }
          return a;
        };
      }();
    },
    function (module, exports, require) {
      var clone = require('./24');
      var each = require('./0');
      var mat3 = require('./Source');
      module.exports = function transform(m, ts) {
        m = clone(m);
        each(ts, function (t) {
          switch (t[0]) {
          case 't':
            mat3.translate(m, m, [
              t[1],
              t[2]
            ]);
            break;
          case 's':
            mat3.scale(m, m, [
              t[1],
              t[2]
            ]);
            break;
          case 'r':
            mat3.rotate(m, m, t[1]);
            break;
          case 'm':
            mat3.multiply(m, m, t[1]);
            break;
          default:
            return false;
          }
        });
        return m;
      };
    },
    function (module, exports, require) {
      module.exports = {
        forIn: require('./96'),
        has: require('./25'),
        hasKey: require('./97'),
        hasValue: require('./98'),
        keys: require('./18'),
        isMatch: require('./BufferBase'),
        values: require('./26')
      };
    },
    function (module, exports, require) {
      module.exports = require('./0');
    },
    function (module, exports, require) {
      module.exports = require('./25');
    },
    function (module, exports, require) {
      var contains = require('./9');
      var values = require('./26');
      module.exports = function (obj, value) {
        return contains(values(obj), value);
      };
    },
    function (module, exports, require) {
      var pathIntersection = require('./100');
      var path2absolute = require('./30');
      var path2curve = require('./29');
      var catmullRom2Bezier = require('./32');
      module.exports = {
        catmullRom2Bezier: catmullRom2Bezier,
        catmullRomToBezier: catmullRom2Bezier,
        fillPath: require('./101'),
        fillPathByDiff: require('./102'),
        formatPath: require('./104'),
        intersection: pathIntersection,
        pathIntersection: pathIntersection,
        parsePathArray: require('./28'),
        parsePathString: require('./31'),
        pathToAbsolute: path2absolute,
        path2absolute: path2absolute,
        pathTocurve: path2curve,
        path2curve: path2curve,
        rectPath: require('./27')
      };
    },
    function (module, exports, require) {
      var isArray = require('./1');
      var rectPath = require('./27');
      var pathTocurve = require('./29');
      var base3 = function base3(t, p1, p2, p3, p4) {
        var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4;
        var t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
        return t * t2 - 3 * p1 + 3 * p2;
      };
      var bezlen = function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
        if (z === null) {
          z = 1;
        }
        z = z > 1 ? 1 : z < 0 ? 0 : z;
        var z2 = z / 2;
        var n = 12;
        var Tvalues = [
          -0.1252,
          0.1252,
          -0.3678,
          0.3678,
          -0.5873,
          0.5873,
          -0.7699,
          0.7699,
          -0.9041,
          0.9041,
          -0.9816,
          0.9816
        ];
        var Cvalues = [
          0.2491,
          0.2491,
          0.2335,
          0.2335,
          0.2032,
          0.2032,
          0.1601,
          0.1601,
          0.1069,
          0.1069,
          0.0472,
          0.0472
        ];
        var sum = 0;
        for (var i = 0; i < n; i++) {
          var ct = z2 * Tvalues[i] + z2;
          var xbase = base3(ct, x1, x2, x3, x4);
          var ybase = base3(ct, y1, y2, y3, y4);
          var comb = xbase * xbase + ybase * ybase;
          sum += Cvalues[i] * Math.sqrt(comb);
        }
        return z2 * sum;
      };
      var curveDim = function curveDim(x0, y0, x1, y1, x2, y2, x3, y3) {
        var tvalues = [];
        var bounds = [
          [],
          []
        ];
        var a = void 0;
        var b = void 0;
        var c = void 0;
        var t = void 0;
        for (var i = 0; i < 2; ++i) {
          if (i === 0) {
            b = 6 * x0 - 12 * x1 + 6 * x2;
            a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
            c = 3 * x1 - 3 * x0;
          } else {
            b = 6 * y0 - 12 * y1 + 6 * y2;
            a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
            c = 3 * y1 - 3 * y0;
          }
          if (Math.abs(a) < 1e-12) {
            if (Math.abs(b) < 1e-12) {
              continue;
            }
            t = -c / b;
            if (t > 0 && t < 1) {
              tvalues.push(t);
            }
            continue;
          }
          var b2ac = b * b - 4 * c * a;
          var sqrtb2ac = Math.sqrt(b2ac);
          if (b2ac < 0) {
            continue;
          }
          var t1 = (-b + sqrtb2ac) / (2 * a);
          if (t1 > 0 && t1 < 1) {
            tvalues.push(t1);
          }
          var t2 = (-b - sqrtb2ac) / (2 * a);
          if (t2 > 0 && t2 < 1) {
            tvalues.push(t2);
          }
        }
        var j = tvalues.length;
        var jlen = j;
        var mt = void 0;
        while (j--) {
          t = tvalues[j];
          mt = 1 - t;
          bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
          bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
        }
        bounds[0][jlen] = x0;
        bounds[1][jlen] = y0;
        bounds[0][jlen + 1] = x3;
        bounds[1][jlen + 1] = y3;
        bounds[0].length = bounds[1].length = jlen + 2;
        return {
          min: {
            x: Math.min.apply(0, bounds[0]),
            y: Math.min.apply(0, bounds[1])
          },
          max: {
            x: Math.max.apply(0, bounds[0]),
            y: Math.max.apply(0, bounds[1])
          }
        };
      };
      var intersect = function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        if (Math.max(x1, x2) < Math.min(x3, x4) || Math.min(x1, x2) > Math.max(x3, x4) || Math.max(y1, y2) < Math.min(y3, y4) || Math.min(y1, y2) > Math.max(y3, y4)) {
          return;
        }
        var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
        var ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);
        var denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (!denominator) {
          return;
        }
        var px = nx / denominator;
        var py = ny / denominator;
        var px2 = +px.toFixed(2);
        var py2 = +py.toFixed(2);
        if (px2 < +Math.min(x1, x2).toFixed(2) || px2 > +Math.max(x1, x2).toFixed(2) || px2 < +Math.min(x3, x4).toFixed(2) || px2 > +Math.max(x3, x4).toFixed(2) || py2 < +Math.min(y1, y2).toFixed(2) || py2 > +Math.max(y1, y2).toFixed(2) || py2 < +Math.min(y3, y4).toFixed(2) || py2 > +Math.max(y3, y4).toFixed(2)) {
          return;
        }
        return {
          x: px,
          y: py
        };
      };
      var isPointInsideBBox = function isPointInsideBBox(bbox, x, y) {
        return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
      };
      var box = function box(x, y, width, height) {
        if (x === null) {
          x = y = width = height = 0;
        }
        if (y === null) {
          y = x.y;
          width = x.width;
          height = x.height;
          x = x.x;
        }
        return {
          x: x,
          y: y,
          width: width,
          w: width,
          height: height,
          h: height,
          x2: x + width,
          y2: y + height,
          cx: x + width / 2,
          cy: y + height / 2,
          r1: Math.min(width, height) / 2,
          r2: Math.max(width, height) / 2,
          r0: Math.sqrt(width * width + height * height) / 2,
          path: rectPath(x, y, width, height),
          vb: [
            x,
            y,
            width,
            height
          ].join(' ')
        };
      };
      var isBBoxIntersect = function isBBoxIntersect(bbox1, bbox2) {
        bbox1 = box(bbox1);
        bbox2 = box(bbox2);
        return isPointInsideBBox(bbox2, bbox1.x, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
      };
      var bezierBBox = function bezierBBox(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        if (!isArray(p1x)) {
          p1x = [
            p1x,
            p1y,
            c1x,
            c1y,
            c2x,
            c2y,
            p2x,
            p2y
          ];
        }
        var bbox = curveDim.apply(null, p1x);
        return box(bbox.min.x, bbox.min.y, bbox.max.x - bbox.min.x, bbox.max.y - bbox.min.y);
      };
      var findDotsAtSegment = function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t;
        var t13 = Math.pow(t1, 3);
        var t12 = Math.pow(t1, 2);
        var t2 = t * t;
        var t3 = t2 * t;
        var x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x;
        var y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y;
        var mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x);
        var my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y);
        var nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x);
        var ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y);
        var ax = t1 * p1x + t * c1x;
        var ay = t1 * p1y + t * c1y;
        var cx = t1 * c2x + t * p2x;
        var cy = t1 * c2y + t * p2y;
        var alpha = 90 - Math.atan2(mx - nx, my - ny) * 180 / Math.PI;
        return {
          x: x,
          y: y,
          m: {
            x: mx,
            y: my
          },
          n: {
            x: nx,
            y: ny
          },
          start: {
            x: ax,
            y: ay
          },
          end: {
            x: cx,
            y: cy
          },
          alpha: alpha
        };
      };
      var interHelper = function interHelper(bez1, bez2, justCount) {
        var bbox1 = bezierBBox(bez1);
        var bbox2 = bezierBBox(bez2);
        if (!isBBoxIntersect(bbox1, bbox2)) {
          return justCount ? 0 : [];
        }
        var l1 = bezlen.apply(0, bez1);
        var l2 = bezlen.apply(0, bez2);
        var n1 = ~~(l1 / 8);
        var n2 = ~~(l2 / 8);
        var dots1 = [];
        var dots2 = [];
        var xy = {};
        var res = justCount ? 0 : [];
        for (var i = 0; i < n1 + 1; i++) {
          var d = findDotsAtSegment.apply(0, bez1.concat(i / n1));
          dots1.push({
            x: d.x,
            y: d.y,
            t: i / n1
          });
        }
        for (var _i = 0; _i < n2 + 1; _i++) {
          var _d = findDotsAtSegment.apply(0, bez2.concat(_i / n2));
          dots2.push({
            x: _d.x,
            y: _d.y,
            t: _i / n2
          });
        }
        for (var _i2 = 0; _i2 < n1; _i2++) {
          for (var j = 0; j < n2; j++) {
            var di = dots1[_i2];
            var di1 = dots1[_i2 + 1];
            var dj = dots2[j];
            var dj1 = dots2[j + 1];
            var ci = Math.abs(di1.x - di.x) < 0.001 ? 'y' : 'x';
            var cj = Math.abs(dj1.x - dj.x) < 0.001 ? 'y' : 'x';
            var is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
            if (is) {
              if (xy[is.x.toFixed(4)] === is.y.toFixed(4)) {
                continue;
              }
              xy[is.x.toFixed(4)] = is.y.toFixed(4);
              var t1 = di.t + Math.abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t);
              var t2 = dj.t + Math.abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
              if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
                if (justCount) {
                  res++;
                } else {
                  res.push({
                    x: is.x,
                    y: is.y,
                    t1: t1,
                    t2: t2
                  });
                }
              }
            }
          }
        }
        return res;
      };
      var interPathHelper = function interPathHelper(path1, path2, justCount) {
        path1 = pathTocurve(path1);
        path2 = pathTocurve(path2);
        var x1 = void 0;
        var y1 = void 0;
        var x2 = void 0;
        var y2 = void 0;
        var x1m = void 0;
        var y1m = void 0;
        var x2m = void 0;
        var y2m = void 0;
        var bez1 = void 0;
        var bez2 = void 0;
        var res = justCount ? 0 : [];
        for (var i = 0, ii = path1.length; i < ii; i++) {
          var pi = path1[i];
          if (pi[0] === 'M') {
            x1 = x1m = pi[1];
            y1 = y1m = pi[2];
          } else {
            if (pi[0] === 'C') {
              bez1 = [
                x1,
                y1
              ].concat(pi.slice(1));
              x1 = bez1[6];
              y1 = bez1[7];
            } else {
              bez1 = [
                x1,
                y1,
                x1,
                y1,
                x1m,
                y1m,
                x1m,
                y1m
              ];
              x1 = x1m;
              y1 = y1m;
            }
            for (var j = 0, jj = path2.length; j < jj; j++) {
              var pj = path2[j];
              if (pj[0] === 'M') {
                x2 = x2m = pj[1];
                y2 = y2m = pj[2];
              } else {
                if (pj[0] === 'C') {
                  bez2 = [
                    x2,
                    y2
                  ].concat(pj.slice(1));
                  x2 = bez2[6];
                  y2 = bez2[7];
                } else {
                  bez2 = [
                    x2,
                    y2,
                    x2,
                    y2,
                    x2m,
                    y2m,
                    x2m,
                    y2m
                  ];
                  x2 = x2m;
                  y2 = y2m;
                }
                var intr = interHelper(bez1, bez2, justCount);
                if (justCount) {
                  res += intr;
                } else {
                  for (var k = 0, kk = intr.length; k < kk; k++) {
                    intr[k].segment1 = i;
                    intr[k].segment2 = j;
                    intr[k].bez1 = bez1;
                    intr[k].bez2 = bez2;
                  }
                  res = res.concat(intr);
                }
              }
            }
          }
        }
        return res;
      };
      module.exports = function pathIntersection(path1, path2) {
        return interPathHelper(path1, path2);
      };
    },
    function (module, exports) {
      function decasteljau(points, t) {
        var left = [];
        var right = [];
        function recurse(points, t) {
          if (points.length === 1) {
            left.push(points[0]);
            right.push(points[0]);
          } else {
            var middlePoints = [];
            for (var i = 0; i < points.length - 1; i++) {
              if (i === 0) {
                left.push(points[0]);
              }
              if (i === points.length - 2) {
                right.push(points[i + 1]);
              }
              middlePoints[i] = [
                (1 - t) * points[i][0] + t * points[i + 1][0],
                (1 - t) * points[i][1] + t * points[i + 1][1]
              ];
            }
            recurse(middlePoints, t);
          }
        }
        if (points.length) {
          recurse(points, t);
        }
        return {
          left: left,
          right: right.reverse()
        };
      }
      function splitCurve(start, end, count) {
        var points = [[
            start[1],
            start[2]
          ]];
        count = count || 2;
        var segments = [];
        if (end[0] === 'A') {
          points.push(end[6]);
          points.push(end[7]);
        } else if (end[0] === 'C') {
          points.push([
            end[1],
            end[2]
          ]);
          points.push([
            end[3],
            end[4]
          ]);
          points.push([
            end[5],
            end[6]
          ]);
        } else if (end[0] === 'S' || end[0] === 'Q') {
          points.push([
            end[1],
            end[2]
          ]);
          points.push([
            end[3],
            end[4]
          ]);
        } else {
          points.push([
            end[1],
            end[2]
          ]);
        }
        var leftSegments = points;
        var t = 1 / count;
        for (var i = 0; i < count - 1; i++) {
          var rt = t / (1 - t * i);
          var split = decasteljau(leftSegments, rt);
          segments.push(split.left);
          leftSegments = split.right;
        }
        segments.push(leftSegments);
        var result = segments.map(function (segment) {
          var cmd = [];
          if (segment.length === 4) {
            cmd.push('C');
            cmd = cmd.concat(segment[2]);
          }
          if (segment.length >= 3) {
            if (segment.length === 3) {
              cmd.push('Q');
            }
            cmd = cmd.concat(segment[1]);
          }
          if (segment.length === 2) {
            cmd.push('L');
          }
          cmd = cmd.concat(segment[segment.length - 1]);
          return cmd;
        });
        return result;
      }
      function splitSegment(start, end, count) {
        if (count === 1) {
          return [[].concat(start)];
        }
        var segments = [];
        if (end[0] === 'L' || end[0] === 'C' || end[0] === 'Q') {
          segments = segments.concat(splitCurve(start, end, count));
        } else {
          var temp = [].concat(start);
          if (temp[0] === 'M') {
            temp[0] = 'L';
          }
          for (var i = 0; i <= count - 1; i++) {
            segments.push(temp);
          }
        }
        return segments;
      }
      module.exports = function fillPath(source, target) {
        if (source.length === 1) {
          return source;
        }
        var sourceLen = source.length - 1;
        var targetLen = target.length - 1;
        var ratio = sourceLen / targetLen;
        var segmentsToFill = [];
        if (source.length === 1 && source[0][0] === 'M') {
          for (var i = 0; i < targetLen - sourceLen; i++) {
            source.push(source[0]);
          }
          return source;
        }
        for (var _i = 0; _i < targetLen; _i++) {
          var index = Math.floor(ratio * _i);
          segmentsToFill[index] = (segmentsToFill[index] || 0) + 1;
        }
        var filled = segmentsToFill.reduce(function (filled, count, i) {
          if (i === sourceLen) {
            return filled.concat(source[sourceLen]);
          }
          return filled.concat(splitSegment(source[i], source[i + 1], count));
        }, []);
        filled.unshift(source[0]);
        if (target[targetLen] === 'Z' || target[targetLen] === 'z') {
          filled.push('Z');
        }
        return filled;
      };
    },
    function (module, exports, require) {
      var isEqual = require('./103');
      function getMinDiff(del, add, modify) {
        var type = null;
        var min = modify;
        if (add < min) {
          min = add;
          type = 'add';
        }
        if (del < min) {
          min = del;
          type = 'del';
        }
        return {
          type: type,
          min: min
        };
      }
      var levenshteinDistance = function levenshteinDistance(source, target) {
        var sourceLen = source.length;
        var targetLen = target.length;
        var sourceSegment = void 0, targetSegment = void 0;
        var temp = 0;
        if (sourceLen === 0 || targetLen === 0) {
          return null;
        }
        var dist = [];
        for (var i = 0; i <= sourceLen; i++) {
          dist[i] = [];
          dist[i][0] = { min: i };
        }
        for (var j = 0; j <= targetLen; j++) {
          dist[0][j] = { min: j };
        }
        for (var _i = 1; _i <= sourceLen; _i++) {
          sourceSegment = source[_i - 1];
          for (var _j = 1; _j <= targetLen; _j++) {
            targetSegment = target[_j - 1];
            if (isEqual(sourceSegment, targetSegment)) {
              temp = 0;
            } else {
              temp = 1;
            }
            var del = dist[_i - 1][_j].min + 1;
            var add = dist[_i][_j - 1].min + 1;
            var modify = dist[_i - 1][_j - 1].min + temp;
            dist[_i][_j] = getMinDiff(del, add, modify);
          }
        }
        return dist;
      };
      module.exports = function fillPathByDiff(source, target) {
        var diffMatrix = levenshteinDistance(source, target);
        var sourceLen = source.length;
        var targetLen = target.length;
        var changes = [];
        var index = 1;
        var minPos = 1;
        if (diffMatrix[sourceLen][targetLen] !== sourceLen) {
          for (var i = 1; i <= sourceLen; i++) {
            var min = diffMatrix[i][i].min;
            minPos = i;
            for (var j = index; j <= targetLen; j++) {
              if (diffMatrix[i][j].min < min) {
                min = diffMatrix[i][j].min;
                minPos = j;
              }
            }
            index = minPos;
            if (diffMatrix[i][index].type) {
              changes.push({
                index: i - 1,
                type: diffMatrix[i][index].type
              });
            }
          }
          for (var _i2 = changes.length - 1; _i2 >= 0; _i2--) {
            index = changes[_i2].index;
            if (changes[_i2].type === 'add') {
              source.splice(index, 0, [].concat(source[index]));
            } else {
              source.splice(index, 1);
            }
          }
        }
        sourceLen = source.length;
        if (sourceLen < targetLen) {
          for (var _i3 = 0; _i3 < targetLen - sourceLen; _i3++) {
            if (source[sourceLen - 1][0] === 'z' || source[sourceLen - 1][0] === 'Z') {
              source.splice(sourceLen - 2, 0, source[sourceLen - 2]);
            } else {
              source.push(source[sourceLen - 1]);
            }
          }
        }
        return source;
      };
    },
    function (module, exports, require) {
      var each = require('./0');
      module.exports = function isEqual(obj1, obj2) {
        if (obj1.length !== obj2.length) {
          return false;
        }
        var result = true;
        each(obj1, function (item, i) {
          if (item !== obj2[i]) {
            result = false;
            return false;
          }
        });
        return result;
      };
    },
    function (module, exports) {
      function _getSegmentPoints(segment) {
        var points = [];
        switch (segment[0]) {
        case 'M':
          points.push([
            segment[1],
            segment[2]
          ]);
          break;
        case 'L':
          points.push([
            segment[1],
            segment[2]
          ]);
          break;
        case 'A':
          points.push([
            segment[6],
            segment[7]
          ]);
          break;
        case 'Q':
          points.push([
            segment[3],
            segment[4]
          ]);
          points.push([
            segment[1],
            segment[2]
          ]);
          break;
        case 'T':
          points.push([
            segment[1],
            segment[2]
          ]);
          break;
        case 'C':
          points.push([
            segment[5],
            segment[6]
          ]);
          points.push([
            segment[1],
            segment[2]
          ]);
          points.push([
            segment[3],
            segment[4]
          ]);
          break;
        case 'S':
          points.push([
            segment[3],
            segment[4]
          ]);
          points.push([
            segment[1],
            segment[2]
          ]);
          break;
        case 'H':
          points.push([
            segment[1],
            segment[1]
          ]);
          break;
        case 'V':
          points.push([
            segment[1],
            segment[1]
          ]);
          break;
        default:
        }
        return points;
      }
      function _splitPoints(points, former, count) {
        var result = [].concat(points);
        var index = void 0;
        var t = 1 / (count + 1);
        var formerEnd = _getSegmentPoints(former)[0];
        for (var i = 1; i <= count; i++) {
          t *= i;
          index = Math.floor(points.length * t);
          if (index === 0) {
            result.unshift([
              formerEnd[0] * t + points[index][0] * (1 - t),
              formerEnd[1] * t + points[index][1] * (1 - t)
            ]);
          } else {
            result.splice(index, 0, [
              formerEnd[0] * t + points[index][0] * (1 - t),
              formerEnd[1] * t + points[index][1] * (1 - t)
            ]);
          }
        }
        return result;
      }
      module.exports = function formatPath(fromPath, toPath) {
        if (fromPath.length <= 1) {
          return fromPath;
        }
        var points = void 0;
        for (var i = 0; i < toPath.length; i++) {
          if (fromPath[i][0] !== toPath[i][0]) {
            points = _getSegmentPoints(fromPath[i]);
            switch (toPath[i][0]) {
            case 'M':
              fromPath[i] = ['M'].concat(points[0]);
              break;
            case 'L':
              fromPath[i] = ['L'].concat(points[0]);
              break;
            case 'A':
              fromPath[i] = [].concat(toPath[i]);
              fromPath[i][6] = points[0][0];
              fromPath[i][7] = points[0][1];
              break;
            case 'Q':
              if (points.length < 2) {
                if (i > 0) {
                  points = _splitPoints(points, fromPath[i - 1], 1);
                } else {
                  fromPath[i] = toPath[i];
                  break;
                }
              }
              fromPath[i] = ['Q'].concat(points.reduce(function (arr, i) {
                return arr.concat(i);
              }, []));
              break;
            case 'T':
              fromPath[i] = ['T'].concat(points[0]);
              break;
            case 'C':
              if (points.length < 3) {
                if (i > 0) {
                  points = _splitPoints(points, fromPath[i - 1], 2);
                } else {
                  fromPath[i] = toPath[i];
                  break;
                }
              }
              fromPath[i] = ['C'].concat(points.reduce(function (arr, i) {
                return arr.concat(i);
              }, []));
              break;
            case 'S':
              if (points.length < 2) {
                if (i > 0) {
                  points = _splitPoints(points, fromPath[i - 1], 1);
                } else {
                  fromPath[i] = toPath[i];
                  break;
                }
              }
              fromPath[i] = ['S'].concat(points.reduce(function (arr, i) {
                return arr.concat(i);
              }, []));
              break;
            default:
              fromPath[i] = toPath[i];
            }
          }
        }
        return fromPath;
      };
    },
    function (module, exports, require) {
      var strUtil = {
        lc: require('./106'),
        lowerCase: require('./33'),
        lowerFirst: require('./107'),
        substitute: require('./108'),
        uc: require('./109'),
        upperCase: require('./34'),
        upperFirst: require('./110')
      };
      module.exports = strUtil;
    },
    function (module, exports, require) {
      module.exports = require('./33');
    },
    function (module, exports, require) {
      var toString = require('./8');
      var lowerFirst = function lowerFirst(value) {
        var str = toString(value);
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      module.exports = lowerFirst;
    },
    function (module, exports) {
      var substitute = function substitute(str, o) {
        if (!str || !o) {
          return str;
        }
        return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
          if (match.charAt(0) === '\\') {
            return match.slice(1);
          }
          return o[name] === undefined ? '' : o[name];
        });
      };
      module.exports = substitute;
    },
    function (module, exports, require) {
      module.exports = require('./34');
    },
    function (module, exports, require) {
      var toString = require('./8');
      var upperFirst = function upperFirst(value) {
        var str = toString(value);
        return str.charAt(0).toUpperCase() + str.substring(1);
      };
      module.exports = upperFirst;
    },
    function (module, exports, require) {
      var isType = require('./4');
      var checkType = {
        getType: require('./35'),
        isArray: require('./1'),
        isArrayLike: require('./3'),
        isBoolean: require('./112'),
        isFunction: require('./three'),
        isNil: require('./5'),
        isNull: require('./113'),
        isNumber: require('./6'),
        isObject: require('./Material'),
        isObjectLike: require('./13'),
        isPlainObject: require('./7'),
        isPrototype: require('./36'),
        isType: isType,
        isUndefined: require('./114'),
        isString: require('./10'),
        isRegExp: require('./115')
      };
      [
        'Arguments',
        'Date',
        'Error'
      ].forEach(function (type) {
        checkType['is' + type] = function (value) {
          return isType(value, type);
        };
      });
      module.exports = checkType;
    },
    function (module, exports, require) {
      var isType = require('./4');
      var isBoolean = function isBoolean(value) {
        return isType(value, 'Boolean');
      };
      module.exports = isBoolean;
    },
    function (module, exports) {
      var isNull = function isNull(value) {
        return value === null;
      };
      module.exports = isNull;
    },
    function (module, exports) {
      var isUndefined = function isUndefined(value) {
        return value === undefined;
      };
      module.exports = isUndefined;
    },
    function (module, exports, require) {
      var isType = require('./4');
      var isRegExp = function isRegExp(str) {
        return isType(str, 'RegExp');
      };
      module.exports = isRegExp;
    },
    function (module, exports, require) {
      var isFunction = require('./three');
      var toArray = require('./14');
      var mix = require('./11');
      var augment = function augment(c) {
        var args = toArray(arguments);
        for (var i = 1; i < args.length; i++) {
          var obj = args[i];
          if (isFunction(obj)) {
            obj = obj.prototype;
          }
          mix(c.prototype, obj);
        }
      };
      module.exports = augment;
    },
    function (module, exports, require) {
      var isPlainObject = require('./7');
      var isArray = require('./1');
      var MAX_MIX_LEVEL = 5;
      function _deepMix(dist, src, level, maxLevel) {
        level = level || 0;
        maxLevel = maxLevel || MAX_MIX_LEVEL;
        for (var key in src) {
          if (src.hasOwnProperty(key)) {
            var value = src[key];
            if (value !== null && isPlainObject(value)) {
              if (!isPlainObject(dist[key])) {
                dist[key] = {};
              }
              if (level < maxLevel) {
                _deepMix(dist[key], value, level + 1, maxLevel);
              } else {
                dist[key] = src[key];
              }
            } else if (isArray(value)) {
              dist[key] = [];
              dist[key] = dist[key].concat(value);
            } else if (value !== undefined) {
              dist[key] = value;
            }
          }
        }
      }
      var deepMix = function deepMix() {
        var args = new Array(arguments.length);
        var length = args.length;
        for (var i = 0; i < length; i++) {
          args[i] = arguments[i];
        }
        var rst = args[0];
        for (var _i = 1; _i < length; _i++) {
          _deepMix(rst, args[_i]);
        }
        return rst;
      };
      module.exports = deepMix;
    },
    function (module, exports, require) {
      var isFunction = require('./three');
      var mix = require('./11');
      var extend = function extend(subclass, superclass, overrides, staticOverrides) {
        if (!isFunction(superclass)) {
          overrides = superclass;
          superclass = subclass;
          subclass = function subclass() {
          };
        }
        var create = Object.create ? function (proto, c) {
          return Object.create(proto, { constructor: { value: c } });
        } : function (proto, c) {
          function Tmp() {
          }
          Tmp.prototype = proto;
          var o = new Tmp();
          o.constructor = c;
          return o;
        };
        var superObj = create(superclass.prototype, subclass);
        subclass.prototype = mix(superObj, subclass.prototype);
        subclass.superclass = create(superclass.prototype, superclass);
        mix(superObj, overrides);
        mix(subclass, staticOverrides);
        return subclass;
      };
      module.exports = extend;
    },
    function (module, exports, require) {
      var groupToMap = require('./37');
      var group = function group(data, condition) {
        if (!condition) {
          return [data];
        }
        var groups = groupToMap(data, condition);
        var array = [];
        for (var i in groups) {
          array.push(groups[i]);
        }
        return array;
      };
      module.exports = group;
    },
    function (module, exports, require) {
      var isArrayLike = require('./3');
      var indexOf = function indexOf(arr, obj) {
        if (!isArrayLike(arr)) {
          return -1;
        }
        var m = Array.prototype.indexOf;
        if (m) {
          return m.call(arr, obj);
        }
        var index = -1;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === obj) {
            index = i;
            break;
          }
        }
        return index;
      };
      module.exports = indexOf;
    },
    function (module, exports, require) {
      var isNil = require('./5');
      var isArrayLike = require('./3');
      var getType = require('./35');
      var isPrototype = require('./36');
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function isEmpty(value) {
        if (isNil(value)) {
          return true;
        }
        if (isArrayLike(value)) {
          return !value.length;
        }
        var type = getType(value);
        if (type === 'Map' || type === 'Set') {
          return !value.size;
        }
        if (isPrototype(value)) {
          return !Object.keys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      module.exports = isEmpty;
    },
    function (module, exports, require) {
      var isFunction = require('./three');
      var isEqual = require('./39');
      var isEqualWith = function isEqualWith(value, other, fn) {
        if (!isFunction(fn)) {
          return isEqual(value, other);
        }
        return !!fn(value, other);
      };
      module.exports = isEqualWith;
    },
    function (module, exports, require) {
      var each = require('./0');
      var isArrayLike = require('./3');
      var map = function map(arr, func) {
        if (!isArrayLike(arr)) {
          return arr;
        }
        var result = [];
        each(arr, function (value, index) {
          result.push(func(value, index));
        });
        return result;
      };
      module.exports = map;
    },
    function (module, exports, require) {
      var each = require('./0');
      var isPlaineObject = require('./7');
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var pick = function pick(object, keys) {
        if (object === null || !isPlaineObject(object)) {
          return {};
        }
        var result = {};
        each(keys, function (key) {
          if (hasOwnProperty.call(object, key)) {
            result[key] = object[key];
          }
        });
        return result;
      };
      module.exports = pick;
    },
    function (module, exports) {
      var uniqueId = function () {
        var map = {};
        return function (prefix) {
          prefix = prefix || 'g';
          if (!map[prefix]) {
            map[prefix] = 1;
          } else {
            map[prefix] += 1;
          }
          return prefix + map[prefix];
        };
      }();
      module.exports = uniqueId;
    }
  ]);
}));
