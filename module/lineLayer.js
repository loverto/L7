'use strict';
require.d(exports, 'a', function () {
  return LineLayer;
});
var core_layer = require('./Layer');
var core_three = require('./three');
var geom_buffer_index = require('./GeomBufferIndex');
var geom_material_lineMaterial = require('./geom.material.LineMaterial');
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
    // '#F08D41'
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
var LineLayer = function (_Layer) {
  _inherits(LineLayer, _Layer);
  function LineLayer() {
    _classCallCheck(this, LineLayer);
    return _possibleConstructorReturn(this, _getPrototypeOf(LineLayer).apply(this, arguments));
  }
  _createClass(LineLayer, [
    {
      key: 'shape',
      value: function shape(type) {
        this.shapeType = type;
        return this;
      }
    },
    {
      key: 'render',
      value: function render() {
        // 折线
        this.type = 'polyline';
        // 初始化
        this.init();
        // 数据源
        var source = this.layerSource;
        // 获取样式数据
        var StyleData = this.StyleData;
        // 获取样式选项
        var style = this.get('styleOptions');
        // 创建buffer
        var buffer = this._buffer = new geom_buffer_index['a']({
          coordinates: source.geoData,
          properties: StyleData,
          shapeType: this.shapeType,
          style: style
        });
        var _this$get = this.get('styleOptions'), opacity = _this$get.opacity;
        // 获取动画选项
        var animateOptions = this.get('animateOptions');
        // 准备生成几何体
        var geometry = new core_three['BufferGeometry']();
        // 设置几何体属性
        var attributes = buffer.attributes;
        // 弧线
        if (this.shapeType === 'arc') {
          geometry.setIndex(attributes.indexArray);
          geometry.addAttribute('position', new core_three['Float32BufferAttribute'](attributes.positions, 3));
          geometry.addAttribute('a_color', new core_three['Float32BufferAttribute'](attributes.colors, 4));
          geometry.addAttribute('a_instance', new core_three['Float32BufferAttribute'](attributes.instances, 4));
          geometry.addAttribute('a_size', new core_three['Float32BufferAttribute'](attributes.sizes, 1));
          var material = new geom_material_lineMaterial['a']({
            u_opacity: opacity,
            u_zoom: this.scene.getZoom()
          });
          var mesh = new core_three['Mesh'](geometry, material);
          this.add(mesh);
          // 线
        } else if (this.shapeType === 'line') {
          geometry.setIndex(attributes.indexArray);
          geometry.addAttribute('pickingId', new core_three['Float32BufferAttribute'](attributes.pickingIds, 1));
          // 添加顶点位置
          geometry.addAttribute('position', new core_three['Float32BufferAttribute'](attributes.positions, 3));
          // 添加带透明颜色
          geometry.addAttribute('a_color', new core_three['Float32BufferAttribute'](attributes.colors, 4));
          // 添加大小
          geometry.addAttribute('a_size', new core_three['Float32BufferAttribute'](attributes.sizes, 1));
          geometry.addAttribute('normal', new core_three['Float32BufferAttribute'](attributes.normal, 3));
          geometry.addAttribute('a_miter', new core_three['Float32BufferAttribute'](attributes.miter, 1));
          var lineType = style.lineType;
          var _material;
          // 不是虚线
          if (lineType !== 'dash') {
            //网格线材料
            _material = new geom_material_lineMaterial['d']({
              u_opacity: opacity,
              u_zoom: this.scene.getZoom()
            });
          } else {
            geometry.addAttribute('a_distance', new core_three['Float32BufferAttribute'](attributes.attrDistance, 1));
            // 虚线材料
            _material = new geom_material_lineMaterial['b']({
              u_opacity: opacity,
              u_zoom: this.scene.getZoom()
            });
          }
          var _mesh = new core_three['Mesh'](geometry, _material);
          this.add(_mesh);
        } else {
          // 如果都不是，那就用默认的
          geometry.addAttribute('position', new core_three['Float32BufferAttribute'](attributes.vertices, 3));
          // 设置线的颜色
          geometry.addAttribute('a_color', new core_three['Float32BufferAttribute'](attributes.colors, 4));
          // 线材料
          var _material2 = new geom_material_lineMaterial['c']({
            u_opacity: opacity,
            u_time: 0
          });
          // 判断动画是否启动
          if (animateOptions.enable) {
            // 设置动画启动，通过glsl 高级用法来渲染动画
            _material2.setDefinesvalue('ANIMATE', true);
          }
          // 通过线段来创建线
          var _mesh2 = new core_three['LineSegments'](geometry, _material2);
          this.add(_mesh2);
        }
        return this;
      }
    }
  ]);
  return LineLayer;
}(core_layer['a']);
