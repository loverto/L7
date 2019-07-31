'use strict';
var __WEBPACK_IMPORTED_MODULE_0_wolfy87_eventemitter__ = require('./30');
var __WEBPACK_IMPORTED_MODULE_0_wolfy87_eventemitter___default = require.n(__WEBPACK_IMPORTED_MODULE_0_wolfy87_eventemitter__);
var __WEBPACK_IMPORTED_MODULE_1__util__ = require('./1');
var __WEBPACK_IMPORTED_MODULE_1__util___default = require.n(__WEBPACK_IMPORTED_MODULE_1__util__);
function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  }
  return self;
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
var Base = function (_EventEmitter) {
  _inherits(Base, _EventEmitter);
  _createClass(Base, [{
      key: 'getDefaultCfg',
      value: function getDefaultCfg() {
        return {};
      }
    }]);
  function Base(cfg) {
    var _this;
    _classCallCheck(this, Base);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
    var attrs = { visible: true };
    var defaultCfg = _this.getDefaultCfg();
    _this._attrs = attrs;
    __WEBPACK_IMPORTED_MODULE_1__util___default.a.assign(attrs, defaultCfg, cfg);
    return _this;
  }
  _createClass(Base, [
    {
      key: 'get',
      value: function get(name) {
        return this._attrs[name];
      }
    },
    {
      key: 'set',
      value: function set(name, value) {
        this._attrs[name] = value;
      }
    },
    {
      key: 'destroy',
      value: function destroy() {
        this._attrs = {};
        this.removeAllListeners();
        this.destroyed = true;
      }
    }
  ]);
  return Base;
}(__WEBPACK_IMPORTED_MODULE_0_wolfy87_eventemitter___default.a);
exports['a'] = Base;