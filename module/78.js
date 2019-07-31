'use strict';
require.d(exports, 'a', function () {
  return Scene;
});
var __WEBPACK_IMPORTED_MODULE_0__engine__ = require('./79');
var __WEBPACK_IMPORTED_MODULE_1__three__ = require('./2');
var __WEBPACK_IMPORTED_MODULE_2__layer__ = require('./252');
var __WEBPACK_IMPORTED_MODULE_3__base__ = require('./22');
var __WEBPACK_IMPORTED_MODULE_4__image__ = require('./333');
var __WEBPACK_IMPORTED_MODULE_5__map_provider__ = require('./334');
var __WEBPACK_IMPORTED_MODULE_6__map_gaodeMap__ = require('./338');
var __WEBPACK_IMPORTED_MODULE_7__global__ = require('./20');
var __WEBPACK_IMPORTED_MODULE_7__global___default = require.n(__WEBPACK_IMPORTED_MODULE_7__global__);
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
function _get(target, property, receiver) {
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base)
        return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null)
      break;
  }
  return object;
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
var Scene = function (_Base) {
  _inherits(Scene, _Base);
  _createClass(Scene, [{
      key: 'getDefaultCfg',
      value: function getDefaultCfg() {
        return __WEBPACK_IMPORTED_MODULE_7__global___default.a.scene;
      }
    }]);
  function Scene(cfg) {
    var _this;
    _classCallCheck(this, Scene);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scene).call(this, cfg));
    _this._initMap();
    _this._initAttribution();
    _this.addImage();
    _this._layers = [];
    return _this;
  }
  _createClass(Scene, [
    {
      key: '_initEngine',
      value: function _initEngine(mapContainer) {
        this._engine = new __WEBPACK_IMPORTED_MODULE_0__engine__['a'](mapContainer, this);
        this._engine.run();
      }
    },
    {
      key: 'addPickMesh',
      value: function addPickMesh(object) {
        this._engine._picking.add(object);
      }
    },
    {
      key: '_initMap',
      value: function _initMap() {
        var _this2 = this;
        this.mapContainer = this.get('id');
        this._container = document.getElementById(this.mapContainer);
        var Map = new __WEBPACK_IMPORTED_MODULE_5__map_provider__['a'](this.mapContainer, this._attrs);
        Map.on('mapLoad', function () {
          _this2._initEngine(Map.renderDom);
          var sceneMap = new __WEBPACK_IMPORTED_MODULE_6__map_gaodeMap__['a'](Map.map);
          Object.getOwnPropertyNames(sceneMap.__proto__).forEach(function (key) {
            if (true) {
              _this2.__proto__[key] = sceneMap.__proto__[key];
            }
          });
          _this2.map = Map.map;
          Map.asyncCamera(_this2._engine);
          _this2.initLayer();
          _this2.emit('loaded');
        });
      }
    },
    {
      key: 'initLayer',
      value: function initLayer() {
        var _this3 = this;
        var _loop = function _loop(methodName) {
          _this3[methodName] = function (cfg) {
            cfg ? cfg.mapType = _this3.mapType : cfg = { mapType: _this3.mapType };
            var layer = new __WEBPACK_IMPORTED_MODULE_2__layer__[methodName](_this3, cfg);
            _this3._layers.push(layer);
            return layer;
          };
        };
        for (var methodName in __WEBPACK_IMPORTED_MODULE_2__layer__) {
          _loop(methodName);
        }
      }
    },
    {
      key: 'on',
      value: function on(type, hander) {
        if (this.map) {
          this.map.on(type, hander);
        }
        _get(_getPrototypeOf(Scene.prototype), 'on', this).call(this, type, hander);
      }
    },
    {
      key: '_initAttribution',
      value: function _initAttribution() {
        var message = '<a href="http://antv.alipay.com/zh-cn/index.html title="Large-scale WebGL-powered Geospatial Data Visualization">AntV | L7  </a>';
        var element = document.createElement('div');
        element.innerHTML = message;
        element.style.cssText += 'position: absolute; pointer-events:none;background: rgba(255, 255, 255, 0.7);font-size: 11px;z-index:100; padding:4px;bottom: 0;right:0px;';
        this._container.appendChild(element);
      }
    },
    {
      key: 'addImage',
      value: function addImage() {
        this.image = new __WEBPACK_IMPORTED_MODULE_4__image__['a']();
      }
    },
    {
      key: '_initEvent',
      value: function _initEvent() {
      }
    },
    {
      key: 'getLayers',
      value: function getLayers() {
        return this._layers;
      }
    },
    {
      key: '_addLight',
      value: function _addLight() {
        var scene = this._engine._scene;
        var ambientLight = new __WEBPACK_IMPORTED_MODULE_1__three__['AmbientLight'](11184810);
        scene.add(ambientLight);
        var directionalLight = new __WEBPACK_IMPORTED_MODULE_1__three__['DirectionalLight'](16777215, 0.5);
        scene.add(directionalLight);
      }
    },
    {
      key: '_addLayer',
      value: function _addLayer() {
      }
    },
    {
      key: 'removeLayer',
      value: function removeLayer(layer) {
        var layerIndex = this._layers.indexOf(layer);
        if (layerIndex > -1) {
          this._layers.splice(layerIndex, 1);
        }
        layer.destroy();
      }
    }
  ]);
  return Scene;
}(__WEBPACK_IMPORTED_MODULE_3__base__['a']);