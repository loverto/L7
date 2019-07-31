'use strict';
require.d(exports, 'a', function () {
  return Layer;
});
var __WEBPACK_IMPORTED_MODULE_0__base__ = require('./22');
var __WEBPACK_IMPORTED_MODULE_1__three__ = require('./2');
var __WEBPACK_IMPORTED_MODULE_2__attr_color_util__ = require('./35');
var __WEBPACK_IMPORTED_MODULE_2__attr_color_util___default = require.n(__WEBPACK_IMPORTED_MODULE_2__attr_color_util__);
var __WEBPACK_IMPORTED_MODULE_3__source_index__ = require('./255');
var __WEBPACK_IMPORTED_MODULE_4__core_engine_picking_pickingMaterial__ = require('./275');
var __WEBPACK_IMPORTED_MODULE_5__attr_index__ = require('./278');
var __WEBPACK_IMPORTED_MODULE_5__attr_index___default = require.n(__WEBPACK_IMPORTED_MODULE_5__attr_index__);
var __WEBPACK_IMPORTED_MODULE_6__util__ = require('./1');
var __WEBPACK_IMPORTED_MODULE_6__util___default = require.n(__WEBPACK_IMPORTED_MODULE_6__util__);
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
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]')
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
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
var Global = require('./20');
var id = 1;
function parseFields(field) {
  if (__WEBPACK_IMPORTED_MODULE_6__util___default.a.isArray(field)) {
    return field;
  }
  if (__WEBPACK_IMPORTED_MODULE_6__util___default.a.isString(field)) {
    return field.split('*');
  }
  return [field];
}
var Layer = function (_Base) {
  _inherits(Layer, _Base);
  _createClass(Layer, [{
      key: 'getDefaultCfg',
      value: function getDefaultCfg() {
        return {
          visible: true,
          zIndex: 0,
          type: '',
          minZoom: 0,
          maxZoom: 22,
          rotation: 0,
          attrOptions: {},
          scales: {},
          attrs: {},
          styleOptions: {
            stroke: [
              1,
              1,
              1,
              1
            ],
            strokeWidth: 1,
            opacity: 1,
            texture: false
          },
          selectedOptions: null,
          activedOptions: null,
          animateOptions: { enable: false }
        };
      }
    }]);
  function Layer(scene, cfg) {
    var _this;
    _classCallCheck(this, Layer);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Layer).call(this, cfg));
    _this.scene = scene;
    _this.map = scene.map;
    _this._object3D = new __WEBPACK_IMPORTED_MODULE_1__three__['Object3D']();
    _this._pickObject3D = new __WEBPACK_IMPORTED_MODULE_1__three__['Object3D']();
    _this._object3D.visible = _this.get('visible');
    _this._object3D.renderOrder = _this.get('zIndex') || 0;
    var layerId = _this._getUniqueId();
    _this.layerId = layerId;
    _this._activeIds = null;
    scene._engine._scene.add(_this._object3D);
    _this.layerMesh = null;
    return _this;
  }
  _createClass(Layer, [
    {
      key: 'add',
      value: function add(object) {
        var _this2 = this;
        this.layerMesh = object;
        this._visibleWithZoom();
        this.scene.on('zoomchange', function () {
          _this2._visibleWithZoom();
        });
        this.layerMesh.onBeforeRender = function () {
          var zoom = _this2.scene.getZoom();
          _this2.layerMesh.material.setUniformsValue('u_time', _this2.scene._engine.clock.getElapsedTime());
          _this2.layerMesh.material.setUniformsValue('u_zoom', zoom);
        };
        if (this._needUpdateFilter) {
          this._updateFilter();
        }
        this._object3D.add(object);
        this._addPickMesh(object);
      }
    },
    {
      key: 'remove',
      value: function remove(object) {
        this._object3D.remove(object);
      }
    },
    {
      key: '_getUniqueId',
      value: function _getUniqueId() {
        return id++;
      }
    },
    {
      key: '_visible',
      value: function _visible(visible) {
        this.set('visible', visible);
        this._object3D.visible = this.get('visible');
      }
    },
    {
      key: 'source',
      value: function source(data) {
        var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var dataType = this._getDataType(data);
        var _cfg$type = cfg.type, type = _cfg$type === void 0 ? dataType : _cfg$type;
        cfg.data = data;
        cfg.mapType = this.get('mapType');
        this.layerSource = new __WEBPACK_IMPORTED_MODULE_3__source_index__[type](cfg);
        return this;
      }
    },
    {
      key: 'color',
      value: function color(field, values) {
        this._needUpdateColor = true;
        this._createAttrOption('color', field, values, Global.colors);
        return this;
      }
    },
    {
      key: 'size',
      value: function size(field, values) {
        var fields = parseFields(field);
        if (fields.indexOf('zoom') !== -1) {
          this._zoomScale = true;
        }
        if (__WEBPACK_IMPORTED_MODULE_6__util___default.a.isArray(fields) && !values)
          values = fields;
        this._createAttrOption('size', field, values, Global.size);
        return this;
      }
    },
    {
      key: 'shape',
      value: function shape(field, values) {
        if (field.split(':').length === 2) {
          this.shapeType = field.split(':')[0];
          field = field.split(':')[1];
        }
        values === 'text' ? this.shapeType = values : null;
        this._createAttrOption('shape', field, values, Global.sizes);
        return this;
      }
    },
    {
      key: 'active',
      value: function active(enable, cfg) {
        if (enable === false) {
          this.set('allowActive', false);
        } else if (__WEBPACK_IMPORTED_MODULE_6__util___default.a.isObject(enable)) {
          this.set('allowActive', true);
          this.set('activedOptions', enable);
        } else {
          this.set('allowActive', true);
          this.set('activedOptions', cfg || { fill: Global.activeColor });
        }
        return this;
      }
    },
    {
      key: 'style',
      value: function style(field, cfg) {
        var colorItem = [
          'fill',
          'stroke',
          'color',
          'baseColor',
          'brightColor',
          'windowColor'
        ];
        var styleOptions = this.get('styleOptions');
        if (!styleOptions) {
          styleOptions = {};
          this.set('styleOptions', styleOptions);
        }
        if (__WEBPACK_IMPORTED_MODULE_6__util___default.a.isObject(field)) {
          cfg = field;
          field = null;
        }
        var fields;
        if (field) {
          fields = parseFields(field);
        }
        styleOptions.fields = fields;
        __WEBPACK_IMPORTED_MODULE_6__util___default.a.assign(styleOptions, cfg);
        for (var item in cfg) {
          if (colorItem.indexOf(item) !== -1) {
            styleOptions[item] = __WEBPACK_IMPORTED_MODULE_2__attr_color_util___default.a.color2RGBA(styleOptions[item]);
          }
          styleOptions[item] = styleOptions[item];
        }
        this.set('styleOptions', styleOptions);
        return this;
      }
    },
    {
      key: 'filter',
      value: function filter(field, values) {
        this._needUpdateFilter = true;
        this._createAttrOption('filter', field, values, true);
        return this;
      }
    },
    {
      key: 'animate',
      value: function animate(field, cfg) {
        var animateOptions = this.get('animateOptions');
        if (!animateOptions) {
          animateOptions = {};
          this.set('animateOptions', animateOptions);
        }
        if (__WEBPACK_IMPORTED_MODULE_6__util___default.a.isObject(field)) {
          cfg = field;
          field = null;
        }
        var fields;
        if (field) {
          fields = parseFields(field);
        }
        animateOptions.fields = fields;
        __WEBPACK_IMPORTED_MODULE_6__util___default.a.assign(animateOptions, cfg);
        this.set('animateOptions', animateOptions);
        return this;
      }
    },
    {
      key: 'texture',
      value: function texture() {
      }
    },
    {
      key: 'hide',
      value: function hide() {
        this._visible(false);
        return this;
      }
    },
    {
      key: 'show',
      value: function show() {
        this._visible(true);
        return this;
      }
    },
    {
      key: '_createScale',
      value: function _createScale(field) {
        var scales = this.get('scales');
        var scale = scales[field];
        if (!scale) {
          scale = this.layerSource.createScale(field);
          scales[field] = scale;
        }
        return scale;
      }
    },
    {
      key: '_setAttrOptions',
      value: function _setAttrOptions(attrName, attrCfg) {
        var options = this.get('attrOptions');
        if (attrName === 'size' && this._zoomScale) {
          attrCfg.zoom = this.map.getZoom();
        }
        options[attrName] = attrCfg;
      }
    },
    {
      key: '_createAttrOption',
      value: function _createAttrOption(attrName, field, cfg, defaultValues) {
        var attrCfg = {};
        attrCfg.field = field;
        if (cfg) {
          if (__WEBPACK_IMPORTED_MODULE_6__util___default.a.isFunction(cfg)) {
            attrCfg.callback = cfg;
          } else {
            attrCfg.values = cfg;
          }
        } else if (attrName !== 'color') {
          attrCfg.values = defaultValues;
        }
        this._setAttrOptions(attrName, attrCfg);
      }
    },
    {
      key: 'init',
      value: function init() {
        this._initAttrs();
        this._scaleByZoom();
        this._mapping();
        var activeHander = this._addActiveFeature.bind(this);
        if (this.get('allowActive')) {
          this.scene.on('pick', activeHander);
        } else {
          this.scene.off('pick', activeHander);
        }
      }
    },
    {
      key: '_addActiveFeature',
      value: function _addActiveFeature(e) {
        var featureId = e.featureId;
        var activeStyle = this.get('activedOptions');
        var selectFeatureIds = this.layerSource.getSelectFeatureId(featureId);
        if (this.StyleData[selectFeatureIds[0]].hasOwnProperty('filter') && this.StyleData[selectFeatureIds[0]].filter === false) {
          return;
        }
        var style = __WEBPACK_IMPORTED_MODULE_6__util___default.a.assign({}, this.StyleData[featureId]);
        style.color = __WEBPACK_IMPORTED_MODULE_2__attr_color_util___default.a.toRGB(activeStyle.fill).map(function (e) {
          return e / 255;
        });
        this.updateStyle([featureId], style);
      }
    },
    {
      key: '_initAttrs',
      value: function _initAttrs() {
        var attrOptions = this.get('attrOptions');
        for (var type in attrOptions) {
          if (attrOptions.hasOwnProperty(type)) {
            this._updateAttr(type);
          }
        }
      }
    },
    {
      key: '_updateAttr',
      value: function _updateAttr(type) {
        var self = this;
        var attrs = this.get('attrs');
        var attrOptions = this.get('attrOptions');
        var option = attrOptions[type];
        option.neadUpdate = true;
        var className = __WEBPACK_IMPORTED_MODULE_6__util___default.a.upperFirst(type);
        var fields = parseFields(option.field);
        var scales = [];
        for (var i = 0; i < fields.length; i++) {
          var field = fields[i];
          var scale = self._createScale(field);
          if (type === 'color' && __WEBPACK_IMPORTED_MODULE_6__util___default.a.isNil(option.values)) {
            option.values = Global.colors;
          }
          scales.push(scale);
        }
        option.scales = scales;
        var attr = new __WEBPACK_IMPORTED_MODULE_5__attr_index___default.a[className](option);
        attrs[type] = attr;
      }
    },
    {
      key: '_updateSize',
      value: function _updateSize(zoom) {
        var _this3 = this;
        var sizeOption = this.get('attrOptions').size;
        var fields = parseFields(sizeOption.field);
        var data = this.layerSource.propertiesData;
        if (!this.zoomSizeCache)
          this.zoomSizeCache = {};
        if (!this.zoomSizeCache[zoom]) {
          this.zoomSizeCache[zoom] = [];
          var _loop = function _loop(i) {
            var params = fields.map(function (field) {
              return data[i][field];
            });
            var indexZoom = fields.indexOf('zoom');
            indexZoom !== -1 ? params[indexZoom] = zoom : null;
            _this3.zoomSizeCache[zoom].push(sizeOption.callback.apply(sizeOption, _toConsumableArray(params)));
          };
          for (var i = 0; i < data.length; i++) {
            _loop(i);
          }
        }
        this.emit('sizeUpdated', this.zoomSizeCache[zoom]);
      }
    },
    {
      key: '_mapping',
      value: function _mapping() {
        var self = this;
        var attrs = self.get('attrs');
        var mappedData = [];
        var data = this.layerSource.propertiesData;
        for (var i = 0; i < data.length; i++) {
          var record = data[i];
          var newRecord = {};
          newRecord.id = data[i]._id;
          for (var k in attrs) {
            if (attrs.hasOwnProperty(k)) {
              var attr = attrs[k];
              attr.needUpdate = false;
              var names = attr.names;
              var values = self._getAttrValues(attr, record);
              if (names.length > 1) {
                for (var j = 0; j < values.length; j++) {
                  var val = values[j];
                  var name = names[j];
                  newRecord[name] = __WEBPACK_IMPORTED_MODULE_6__util___default.a.isArray(val) && val.length === 1 ? val[0] : val;
                }
              } else {
                newRecord[names[0]] = values.length === 1 ? values[0] : values;
              }
            }
          }
          mappedData.push(newRecord);
        }
        this.StyleData = mappedData;
        return mappedData;
      }
    },
    {
      key: '_updateMaping',
      value: function _updateMaping() {
        var self = this;
        var attrs = self.get('attrs');
        var data = this.layerSource.propertiesData;
        for (var i = 0; i < data.length; i++) {
          var record = data[i];
          for (var attrName in attrs) {
            if (attrs.hasOwnProperty(attrName) && attrs[attrName].neadUpdate) {
              var attr = attrs[attrName];
              var names = attr.names;
              var values = self._getAttrValues(attr, record);
              if (names.length > 1) {
                for (var j = 0; j < values.length; j++) {
                  var val = values[j];
                  var name = names[j];
                  this.StyleData[i][name] = __WEBPACK_IMPORTED_MODULE_6__util___default.a.isArray(val) && val.length === 1 ? val[0] : val;
                }
              } else {
                this.StyleData[i][names[0]] = values.length === 1 ? values[0] : values;
              }
              attr.neadUpdate = true;
            }
          }
        }
      }
    },
    {
      key: '_getAttrValues',
      value: function _getAttrValues(attr, record) {
        var scales = attr.scales;
        var params = [];
        for (var i = 0; i < scales.length; i++) {
          var scale = scales[i];
          var field = scale.field;
          if (scale.type === 'identity') {
            params.push(scale.value);
          } else {
            params.push(record[field]);
          }
        }
        var indexZoom = params.indexOf('zoom');
        indexZoom !== -1 ? params[indexZoom] = attr.zoom : null;
        var values = attr.mapping.apply(attr, params);
        return values;
      }
    },
    {
      key: '_getDataType',
      value: function _getDataType(data) {
        if (data.hasOwnProperty('type')) {
          var type = data.type;
          if (type === 'FeatureCollection') {
            return 'geojson';
          }
        }
        return 'basic';
      }
    },
    {
      key: '_scaleByZoom',
      value: function _scaleByZoom() {
        var _this4 = this;
        if (this._zoomScale) {
          this.map.on('zoomend', function () {
            var zoom = _this4.map.getZoom();
            _this4._updateSize(Math.floor(zoom));
          });
        }
      }
    },
    {
      key: 'on',
      value: function on(type, callback) {
        this._addPickingEvents();
        _get(_getPrototypeOf(Layer.prototype), 'on', this).call(this, type, callback);
      }
    },
    {
      key: 'getPickingId',
      value: function getPickingId() {
        return this.scene._engine._picking.getNextId();
      }
    },
    {
      key: 'addToPicking',
      value: function addToPicking(object) {
        this.scene._engine._picking.add(object);
      }
    },
    {
      key: 'removeFromPicking',
      value: function removeFromPicking(object) {
        this.scene._engine._picking.remove(object);
      }
    },
    {
      key: '_addPickMesh',
      value: function _addPickMesh(mesh) {
        var _this5 = this;
        this._pickingMesh = new __WEBPACK_IMPORTED_MODULE_1__three__['Object3D']();
        this._visibleWithZoom();
        this.scene.on('zoomchange', function () {
          _this5._visibleWithZoom();
        });
        this.addToPicking(this._pickingMesh);
        var pickmaterial = new __WEBPACK_IMPORTED_MODULE_4__core_engine_picking_pickingMaterial__['a']({ u_zoom: this.scene.getZoom() });
        var pickingMesh = new __WEBPACK_IMPORTED_MODULE_1__three__[mesh.type](mesh.geometry, pickmaterial);
        pickmaterial.setDefinesvalue(this.type, true);
        pickingMesh.onBeforeRender = function () {
          var zoom = _this5.scene.getZoom();
          pickingMesh.material.setUniformsValue('u_zoom', zoom);
        };
        this._pickingMesh.add(pickingMesh);
      }
    },
    {
      key: '_setPickingId',
      value: function _setPickingId() {
        this._pickingId = this.getPickingId();
      }
    },
    {
      key: '_addPickingEvents',
      value: function _addPickingEvents() {
        var _this6 = this;
        this.scene.on('pick', function (e) {
          var featureId = e.featureId, point2d = e.point2d, intersects = e.intersects;
          if (intersects.length === 0) {
            return;
          }
          var source = _this6.layerSource.get('data');
          var feature = source.features[featureId];
          var lnglat = _this6.scene.containerToLngLat(point2d);
          var target = {
            feature: feature,
            pixel: point2d,
            lnglat: {
              lng: lnglat.lng,
              lat: lnglat.lat
            }
          };
          _this6.emit('click', target);
        });
      }
    },
    {
      key: 'updateStyle',
      value: function updateStyle(featureStyleId, style) {
        if (this._activeIds) {
          this.resetStyle();
        }
        this._activeIds = featureStyleId;
        var pickingId = this.layerMesh.geometry.attributes.pickingId.array;
        var color = style.color;
        var colorAttr = this.layerMesh.geometry.attributes.a_color;
        var firstId = pickingId.indexOf(featureStyleId[0] + 1);
        for (var i = firstId; i < pickingId.length; i++) {
          if (pickingId[i] === featureStyleId[0] + 1) {
            colorAttr.array[i * 4 + 0] = color[0];
            colorAttr.array[i * 4 + 1] = color[1];
            colorAttr.array[i * 4 + 2] = color[2];
            colorAttr.array[i * 4 + 3] = color[3];
          } else {
            break;
          }
        }
        colorAttr.needsUpdate = true;
        return;
      }
    },
    {
      key: '_updateColor',
      value: function _updateColor() {
        this._updateMaping();
      }
    },
    {
      key: '_updateFilter',
      value: function _updateFilter() {
        var _this7 = this;
        this._updateMaping();
        var filterData = this.StyleData;
        this._activeIds = null;
        var colorAttr = this.layerMesh.geometry.attributes.a_color;
        var pickAttr = this.layerMesh.geometry.attributes.pickingId;
        pickAttr.array.forEach(function (id, index) {
          id = Math.abs(id);
          var color = _toConsumableArray(_this7.StyleData[id - 1].color);
          id = Math.abs(id);
          var item = filterData[id - 1];
          if (item.hasOwnProperty('filter') && item.filter === false) {
            colorAttr.array[index * 4 + 0] = 0;
            colorAttr.array[index * 4 + 1] = 0;
            colorAttr.array[index * 4 + 2] = 0;
            colorAttr.array[index * 4 + 3] = 0;
            pickAttr.array[index] = -id;
          } else {
            colorAttr.array[index * 4 + 0] = color[0];
            colorAttr.array[index * 4 + 1] = color[1];
            colorAttr.array[index * 4 + 2] = color[2];
            colorAttr.array[index * 4 + 3] = color[3];
            pickAttr.array[index] = id;
          }
        });
        colorAttr.needsUpdate = true;
        pickAttr.needsUpdate = true;
        this._needUpdateFilter = false;
        this._needUpdateColor = false;
      }
    },
    {
      key: '_visibleWithZoom',
      value: function _visibleWithZoom() {
        var zoom = this.scene.getZoom();
        var minZoom = this.get('minZoom');
        var maxZoom = this.get('maxZoom');
        var offset = 0;
        if (this.type === 'point') {
          offset = 5;
        } else if (this.type === 'polyline') {
          offset = 2;
        }
        this._object3D.position.z = offset * Math.pow(2, 20 - zoom);
        if (zoom < minZoom || zoom > maxZoom) {
          this._object3D.visible = false;
        } else if (this.get('visible')) {
          this._object3D.visible = true;
        }
      }
    },
    {
      key: 'resetStyle',
      value: function resetStyle() {
        var _this8 = this;
        var pickingId = this.layerMesh.geometry.attributes.pickingId.array;
        var colorAttr = this.layerMesh.geometry.attributes.a_color;
        this._activeIds.forEach(function (index) {
          var color = _this8.StyleData[index].color;
          var firstId = pickingId.indexOf(index + 1);
          for (var i = firstId; i < pickingId.length; i++) {
            if (pickingId[i] === index + 1) {
              colorAttr.array[i * 4 + 0] = color[0];
              colorAttr.array[i * 4 + 1] = color[1];
              colorAttr.array[i * 4 + 2] = color[2];
              colorAttr.array[i * 4 + 3] = color[3];
            }
          }
        });
        colorAttr.needsUpdate = true;
      }
    },
    {
      key: 'despose',
      value: function despose() {
        this.destroy();
        if (this._object3D && this._object3D.children) {
          var child;
          for (var i = 0; i < this._object3D.children.length; i++) {
            child = this._object3D.children[i];
            if (!child) {
              continue;
            }
            this.remove(child);
            if (child.geometry) {
              child.geometry.dispose();
              child.geometry = null;
            }
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
        this._object3D = null;
        this.scene = null;
      }
    }
  ]);
  return Layer;
}(__WEBPACK_IMPORTED_MODULE_0__base__['a']);