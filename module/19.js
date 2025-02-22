'use strict';
require.d(exports, 'a', function () {
  return Material;
});
var __WEBPACK_IMPORTED_MODULE_0__core_EventDispatcher_js__ = require('./18');
var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_2__math_Math_js__ = require('./6');
var materialId = 0;
function Material() {
  Object.defineProperty(this, 'id', { value: materialId++ });
  this.uuid = __WEBPACK_IMPORTED_MODULE_2__math_Math_js__['a'].generateUUID();
  this.name = '';
  this.type = 'Material';
  this.fog = true;
  this.lights = true;
  this.blending = __WEBPACK_IMPORTED_MODULE_1__constants_js__['_17'];
  this.side = __WEBPACK_IMPORTED_MODULE_1__constants_js__['H'];
  this.flatShading = false;
  this.vertexColors = __WEBPACK_IMPORTED_MODULE_1__constants_js__['_15'];
  this.opacity = 1;
  this.transparent = false;
  this.blendSrc = __WEBPACK_IMPORTED_MODULE_1__constants_js__['_65'];
  this.blendDst = __WEBPACK_IMPORTED_MODULE_1__constants_js__['_23'];
  this.blendEquation = __WEBPACK_IMPORTED_MODULE_1__constants_js__['a'];
  this.blendSrcAlpha = null;
  this.blendDstAlpha = null;
  this.blendEquationAlpha = null;
  this.depthFunc = __WEBPACK_IMPORTED_MODULE_1__constants_js__['R'];
  this.depthTest = true;
  this.depthWrite = true;
  this.clippingPlanes = null;
  this.clipIntersection = false;
  this.clipShadows = false;
  this.shadowSide = null;
  this.colorWrite = true;
  this.precision = null;
  this.polygonOffset = false;
  this.polygonOffsetFactor = 0;
  this.polygonOffsetUnits = 0;
  this.dithering = false;
  this.alphaTest = 0;
  this.premultipliedAlpha = false;
  this.overdraw = 0;
  this.visible = true;
  this.userData = {};
  this.needsUpdate = true;
}
Material.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__core_EventDispatcher_js__['a'].prototype), {
  constructor: Material,
  isMaterial: true,
  onBeforeCompile: function () {
  },
  setValues: function (values) {
    if (values === undefined)
      return;
    for (var key in values) {
      var newValue = values[key];
      if (newValue === undefined) {
        console.warn('THREE.Material: \'' + key + '\' parameter is undefined.');
        continue;
      }
      if (key === 'shading') {
        console.warn('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
        this.flatShading = newValue === __WEBPACK_IMPORTED_MODULE_1__constants_js__['D'] ? true : false;
        continue;
      }
      var currentValue = this[key];
      if (currentValue === undefined) {
        console.warn('THREE.' + this.type + ': \'' + key + '\' is not a property of this material.');
        continue;
      }
      if (currentValue && currentValue.isColor) {
        currentValue.set(newValue);
      } else if (currentValue && currentValue.isVector3 && newValue && newValue.isVector3) {
        currentValue.copy(newValue);
      } else if (key === 'overdraw') {
        this[key] = Number(newValue);
      } else {
        this[key] = newValue;
      }
    }
  },
  toJSON: function (meta) {
    var isRoot = meta === undefined || typeof meta === 'string';
    if (isRoot) {
      meta = {
        textures: {},
        images: {}
      };
    }
    var data = {
      metadata: {
        version: 4.5,
        type: 'Material',
        generator: 'Material.toJSON'
      }
    };
    data.uuid = this.uuid;
    data.type = this.type;
    if (this.name !== '')
      data.name = this.name;
    if (this.color && this.color.isColor)
      data.color = this.color.getHex();
    if (this.roughness !== undefined)
      data.roughness = this.roughness;
    if (this.metalness !== undefined)
      data.metalness = this.metalness;
    if (this.emissive && this.emissive.isColor)
      data.emissive = this.emissive.getHex();
    if (this.emissiveIntensity !== 1)
      data.emissiveIntensity = this.emissiveIntensity;
    if (this.specular && this.specular.isColor)
      data.specular = this.specular.getHex();
    if (this.shininess !== undefined)
      data.shininess = this.shininess;
    if (this.clearCoat !== undefined)
      data.clearCoat = this.clearCoat;
    if (this.clearCoatRoughness !== undefined)
      data.clearCoatRoughness = this.clearCoatRoughness;
    if (this.map && this.map.isTexture)
      data.map = this.map.toJSON(meta).uuid;
    if (this.alphaMap && this.alphaMap.isTexture)
      data.alphaMap = this.alphaMap.toJSON(meta).uuid;
    if (this.lightMap && this.lightMap.isTexture)
      data.lightMap = this.lightMap.toJSON(meta).uuid;
    if (this.aoMap && this.aoMap.isTexture) {
      data.aoMap = this.aoMap.toJSON(meta).uuid;
      data.aoMapIntensity = this.aoMapIntensity;
    }
    if (this.bumpMap && this.bumpMap.isTexture) {
      data.bumpMap = this.bumpMap.toJSON(meta).uuid;
      data.bumpScale = this.bumpScale;
    }
    if (this.normalMap && this.normalMap.isTexture) {
      data.normalMap = this.normalMap.toJSON(meta).uuid;
      data.normalMapType = this.normalMapType;
      data.normalScale = this.normalScale.toArray();
    }
    if (this.displacementMap && this.displacementMap.isTexture) {
      data.displacementMap = this.displacementMap.toJSON(meta).uuid;
      data.displacementScale = this.displacementScale;
      data.displacementBias = this.displacementBias;
    }
    if (this.roughnessMap && this.roughnessMap.isTexture)
      data.roughnessMap = this.roughnessMap.toJSON(meta).uuid;
    if (this.metalnessMap && this.metalnessMap.isTexture)
      data.metalnessMap = this.metalnessMap.toJSON(meta).uuid;
    if (this.emissiveMap && this.emissiveMap.isTexture)
      data.emissiveMap = this.emissiveMap.toJSON(meta).uuid;
    if (this.specularMap && this.specularMap.isTexture)
      data.specularMap = this.specularMap.toJSON(meta).uuid;
    if (this.envMap && this.envMap.isTexture) {
      data.envMap = this.envMap.toJSON(meta).uuid;
      data.reflectivity = this.reflectivity;
    }
    if (this.gradientMap && this.gradientMap.isTexture) {
      data.gradientMap = this.gradientMap.toJSON(meta).uuid;
    }
    if (this.size !== undefined)
      data.size = this.size;
    if (this.sizeAttenuation !== undefined)
      data.sizeAttenuation = this.sizeAttenuation;
    if (this.blending !== __WEBPACK_IMPORTED_MODULE_1__constants_js__['_17'])
      data.blending = this.blending;
    if (this.flatShading === true)
      data.flatShading = this.flatShading;
    if (this.side !== __WEBPACK_IMPORTED_MODULE_1__constants_js__['H'])
      data.side = this.side;
    if (this.vertexColors !== __WEBPACK_IMPORTED_MODULE_1__constants_js__['_15'])
      data.vertexColors = this.vertexColors;
    if (this.opacity < 1)
      data.opacity = this.opacity;
    if (this.transparent === true)
      data.transparent = this.transparent;
    data.depthFunc = this.depthFunc;
    data.depthTest = this.depthTest;
    data.depthWrite = this.depthWrite;
    if (this.rotation !== 0)
      data.rotation = this.rotation;
    if (this.polygonOffset === true)
      data.polygonOffset = true;
    if (this.polygonOffsetFactor !== 0)
      data.polygonOffsetFactor = this.polygonOffsetFactor;
    if (this.polygonOffsetUnits !== 0)
      data.polygonOffsetUnits = this.polygonOffsetUnits;
    if (this.linewidth !== 1)
      data.linewidth = this.linewidth;
    if (this.dashSize !== undefined)
      data.dashSize = this.dashSize;
    if (this.gapSize !== undefined)
      data.gapSize = this.gapSize;
    if (this.scale !== undefined)
      data.scale = this.scale;
    if (this.dithering === true)
      data.dithering = true;
    if (this.alphaTest > 0)
      data.alphaTest = this.alphaTest;
    if (this.premultipliedAlpha === true)
      data.premultipliedAlpha = this.premultipliedAlpha;
    if (this.wireframe === true)
      data.wireframe = this.wireframe;
    if (this.wireframeLinewidth > 1)
      data.wireframeLinewidth = this.wireframeLinewidth;
    if (this.wireframeLinecap !== 'round')
      data.wireframeLinecap = this.wireframeLinecap;
    if (this.wireframeLinejoin !== 'round')
      data.wireframeLinejoin = this.wireframeLinejoin;
    if (this.morphTargets === true)
      data.morphTargets = true;
    if (this.skinning === true)
      data.skinning = true;
    if (this.visible === false)
      data.visible = false;
    if (JSON.stringify(this.userData) !== '{}')
      data.userData = this.userData;
    function extractFromCache(cache) {
      var values = [];
      for (var key in cache) {
        var data = cache[key];
        delete data.metadata;
        values.push(data);
      }
      return values;
    }
    if (isRoot) {
      var textures = extractFromCache(meta.textures);
      var images = extractFromCache(meta.images);
      if (textures.length > 0)
        data.textures = textures;
      if (images.length > 0)
        data.images = images;
    }
    return data;
  },
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (source) {
    this.name = source.name;
    this.fog = source.fog;
    this.lights = source.lights;
    this.blending = source.blending;
    this.side = source.side;
    this.flatShading = source.flatShading;
    this.vertexColors = source.vertexColors;
    this.opacity = source.opacity;
    this.transparent = source.transparent;
    this.blendSrc = source.blendSrc;
    this.blendDst = source.blendDst;
    this.blendEquation = source.blendEquation;
    this.blendSrcAlpha = source.blendSrcAlpha;
    this.blendDstAlpha = source.blendDstAlpha;
    this.blendEquationAlpha = source.blendEquationAlpha;
    this.depthFunc = source.depthFunc;
    this.depthTest = source.depthTest;
    this.depthWrite = source.depthWrite;
    this.colorWrite = source.colorWrite;
    this.precision = source.precision;
    this.polygonOffset = source.polygonOffset;
    this.polygonOffsetFactor = source.polygonOffsetFactor;
    this.polygonOffsetUnits = source.polygonOffsetUnits;
    this.dithering = source.dithering;
    this.alphaTest = source.alphaTest;
    this.premultipliedAlpha = source.premultipliedAlpha;
    this.overdraw = source.overdraw;
    this.visible = source.visible;
    this.userData = JSON.parse(JSON.stringify(source.userData));
    this.clipShadows = source.clipShadows;
    this.clipIntersection = source.clipIntersection;
    var srcPlanes = source.clippingPlanes, dstPlanes = null;
    if (srcPlanes !== null) {
      var n = srcPlanes.length;
      dstPlanes = new Array(n);
      for (var i = 0; i !== n; ++i)
        dstPlanes[i] = srcPlanes[i].clone();
    }
    this.clippingPlanes = dstPlanes;
    this.shadowSide = source.shadowSide;
    return this;
  },
  dispose: function () {
    this.dispatchEvent({ type: 'dispose' });
  }
});