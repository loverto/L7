'use strict';
require.d(exports, 'a', function () {
  return Engine;
});
var __WEBPACK_IMPORTED_MODULE_0_wolfy87_eventemitter__ = require('./30');
var __WEBPACK_IMPORTED_MODULE_0_wolfy87_eventemitter___default = require.n(__WEBPACK_IMPORTED_MODULE_0_wolfy87_eventemitter__);
var __WEBPACK_IMPORTED_MODULE_1__three__ = require('./three');
var __WEBPACK_IMPORTED_MODULE_2__scene__ = require('./247');
var __WEBPACK_IMPORTED_MODULE_3__camera__ = require('./248');
var __WEBPACK_IMPORTED_MODULE_4__renderer__ = require('./249');
var __WEBPACK_IMPORTED_MODULE_5__picking_picking__ = require('./250');
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
var Engine = function (_EventEmitter) {
  _inherits(Engine, _EventEmitter);
  function Engine(container, world) {
    var _this;
    _classCallCheck(this, Engine);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Engine).call(this));
    _this._scene = __WEBPACK_IMPORTED_MODULE_2__scene__['a'];
    _this._camera = new __WEBPACK_IMPORTED_MODULE_3__camera__['a'](container).camera;
    _this._renderer = new __WEBPACK_IMPORTED_MODULE_4__renderer__['a'](container).renderer;
    _this._world = world;
    _this._picking = Object(__WEBPACK_IMPORTED_MODULE_5__picking_picking__['a'])(_this._world, _this._renderer, _this._camera, _this._scene);
    _this.clock = new __WEBPACK_IMPORTED_MODULE_1__three__['Clock']();
    return _this;
  }
  _createClass(Engine, [
    {
      key: '_initPostProcessing',
      value: function _initPostProcessing() {
      }
    },
    {
      key: 'update',
      value: function update() {
        this._renderer.render(this._scene, this._camera);
      }
    },
    {
      key: 'destroy',
      value: function destroy() {
      }
    },
    {
      key: 'run',
      value: function run() {
        this.update();
        this.engineID = requestAnimationFrame(this.run.bind(this));
      }
    },
    {
      key: 'stop',
      value: function stop() {
        cancelAnimationFrame(this.engineID);
      }
    }
  ]);
  return Engine;
}(__WEBPACK_IMPORTED_MODULE_0_wolfy87_eventemitter___default.a);
