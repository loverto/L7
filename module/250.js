'use strict';
var __WEBPACK_IMPORTED_MODULE_0__pickingScene__ = require('./251');
var __WEBPACK_IMPORTED_MODULE_1__three__ = require('./three');
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
var nextId = 1;
var Picking = function () {
  function Picking(world, renderer, camera, scene) {
    _classCallCheck(this, Picking);
    this._world = world;
    this._renderer = renderer;
    this._camera = camera;
    this._raycaster = new __WEBPACK_IMPORTED_MODULE_1__three__['Raycaster']();
    this.scene = scene;
    this._envents = [];
    this._raycaster.linePrecision = 3;
    this._pickingScene = __WEBPACK_IMPORTED_MODULE_0__pickingScene__['a'];
    var size = this._renderer.getSize();
    this._width = size.width;
    this._height = size.height;
    var parameters = {
      minFilter: __WEBPACK_IMPORTED_MODULE_1__three__['LinearFilter'],
      magFilter: __WEBPACK_IMPORTED_MODULE_1__three__['LinearFilter'],
      format: __WEBPACK_IMPORTED_MODULE_1__three__['RGBAFormat'],
      stencilBuffer: false,
      depthBuffer: false
    };
    this._pickingTexture = new __WEBPACK_IMPORTED_MODULE_1__three__['WebGLRenderTarget'](this._width, this._height, parameters);
    this._nextId = 1;
    this._resizeTexture();
    this._initEvents();
  }
  _createClass(Picking, [
    {
      key: '_initEvents',
      value: function _initEvents() {
        this._resizeHandler = this._resizeTexture.bind(this);
        window.addEventListener('resize', this._resizeHandler, false);
        this._mouseUpHandler = this._onMouseUp.bind(this);
        this._world._container.addEventListener('mouseup', this._mouseUpHandler, false);
        this._world._container.addEventListener('mousemove', this._mouseUpHandler, false);
        this._world._container.addEventListener('mousemove', this._onWorldMove.bind(this), false);
      }
    },
    {
      key: '_onMouseUp',
      value: function _onMouseUp(event) {
        var point = {
          x: event.clientX,
          y: event.clientY
        };
        var normalisedPoint = {
          x: 0,
          y: 0
        };
        normalisedPoint.x = point.x / this._width * 2 - 1;
        normalisedPoint.y = -(point.y / this._height) * 2 + 1;
        this._pick(point, normalisedPoint);
      }
    },
    {
      key: '_onWorldMove',
      value: function _onWorldMove() {
        this._needUpdate = true;
      }
    },
    {
      key: '_resizeTexture',
      value: function _resizeTexture() {
        var size = this._renderer.getSize();
        this._width = size.width;
        this._height = size.height;
        this._pickingTexture.setSize(this._width, this._height);
        this._pixelBuffer = new Uint8Array(4 * this._width * this._height);
        this._needUpdate = true;
      }
    },
    {
      key: '_update',
      value: function _update(point) {
        var texture = this._pickingTexture;
        if (this._needUpdate) {
          this._renderer.render(this._pickingScene, this._camera, this._pickingTexture);
          this._needUpdate = false;
        }
        this.pixelBuffer = new Uint8Array(4);
        this._renderer.readRenderTargetPixels(texture, point.x, this._height - point.y, 1, 1, this.pixelBuffer);
      }
    },
    {
      key: 'on',
      value: function on(type) {
        this._mouseUpHandler = this._onMouseUp.bind(this);
        this._world._container.addEventListener(type, this._mouseUpHandler, false);
        this._envents.push([
          type,
          this._mouseUpHandler
        ]);
      }
    },
    {
      key: 'off',
      value: function off(type, hander) {
        this._world._container.removeEventListener(type, this._mouseUpHandler, false);
        this._envents = this._envents.filter(function (item) {
          return item[0] === 'type' && hander === item[1];
        });
      }
    },
    {
      key: '_updateRender',
      value: function _updateRender() {
        this._renderer.render(this._pickingScene, this._camera, this._pickingTexture);
      }
    },
    {
      key: '_pick',
      value: function _pick(point, normalisedPoint) {
        this._update(point);
        var id = this.pixelBuffer[2] * 255 * 255 + this.pixelBuffer[1] * 255 + this.pixelBuffer[0];
        if (id === 16646655 || this.pixelBuffer[3] === 0) {
          return;
        }
        this._raycaster.setFromCamera(normalisedPoint, this._camera);
        var intersects = this._raycaster.intersectObjects(this._pickingScene.children, true);
        var _point2d = {
          x: point.x,
          y: point.y
        };
        var _point3d;
        if (intersects.length > 0) {
          _point3d = intersects[0].point;
        }
        var item = {
          featureId: id - 1,
          point2d: _point2d,
          point3d: _point3d,
          intersects: intersects
        };
        this._world.emit('pick', item);
      }
    },
    {
      key: 'add',
      value: function add(mesh) {
        this._pickingScene.add(mesh);
        this._needUpdate = true;
      }
    },
    {
      key: 'remove',
      value: function remove(mesh) {
        this._pickingScene.remove(mesh);
        this._needUpdate = true;
      }
    },
    {
      key: 'getNextId',
      value: function getNextId() {
        return nextId++;
      }
    },
    {
      key: 'destroy',
      value: function destroy() {
        var _this = this;
        window.removeEventListener('resize', this._resizeHandler, false);
        this._envents.forEach(function (event) {
          _this._world._container.removeEventListener(event[0], event[1], false);
        });
        this._world.off('move', this._onWorldMove);
        if (this._pickingScene.children) {
          var child;
          for (var i = this._pickingScene.children.length - 1; i >= 0; i--) {
            child = this._pickingScene.children[i];
            if (!child) {
              continue;
            }
            this._pickingScene.remove(child);
            if (child.material) {
              if (child.material.map) {
                child.material.map.dispose();
                child.material.map = null;
              }
              child.material.dispose();
              child.material = null;
            }
          }
        }
        this._pickingScene = null;
        this._pickingTexture = null;
        this._pixelBuffer = null;
        this._world = null;
        this._renderer = null;
        this._camera = null;
      }
    }
  ]);
  return Picking;
}();
exports['a'] = function (world, renderer, camera, scene) {
  return new Picking(world, renderer, camera, scene);
};
