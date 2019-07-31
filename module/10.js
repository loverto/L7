'use strict';
require.d(exports, 'a', function () {
  return Texture;
});
var __WEBPACK_IMPORTED_MODULE_0__core_EventDispatcher_js__ = require('./18');
var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_2__math_Math_js__ = require('./6');
var __WEBPACK_IMPORTED_MODULE_3__math_Vector2_js__ = require('./8');
var __WEBPACK_IMPORTED_MODULE_4__math_Matrix3_js__ = require('./9');
var __WEBPACK_IMPORTED_MODULE_5__extras_ImageUtils_js__ = require('./85');
var textureId = 0;
function Texture(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
  Object.defineProperty(this, 'id', { value: textureId++ });
  this.uuid = __WEBPACK_IMPORTED_MODULE_2__math_Math_js__['a'].generateUUID();
  this.name = '';
  this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;
  this.mipmaps = [];
  this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;
  this.wrapS = wrapS !== undefined ? wrapS : __WEBPACK_IMPORTED_MODULE_1__constants_js__['k'];
  this.wrapT = wrapT !== undefined ? wrapT : __WEBPACK_IMPORTED_MODULE_1__constants_js__['k'];
  this.magFilter = magFilter !== undefined ? magFilter : __WEBPACK_IMPORTED_MODULE_1__constants_js__['T'];
  this.minFilter = minFilter !== undefined ? minFilter : __WEBPACK_IMPORTED_MODULE_1__constants_js__['U'];
  this.anisotropy = anisotropy !== undefined ? anisotropy : 1;
  this.format = format !== undefined ? format : __WEBPACK_IMPORTED_MODULE_1__constants_js__['_29'];
  this.type = type !== undefined ? type : __WEBPACK_IMPORTED_MODULE_1__constants_js__['_76'];
  this.offset = new __WEBPACK_IMPORTED_MODULE_3__math_Vector2_js__['a'](0, 0);
  this.repeat = new __WEBPACK_IMPORTED_MODULE_3__math_Vector2_js__['a'](1, 1);
  this.center = new __WEBPACK_IMPORTED_MODULE_3__math_Vector2_js__['a'](0, 0);
  this.rotation = 0;
  this.matrixAutoUpdate = true;
  this.matrix = new __WEBPACK_IMPORTED_MODULE_4__math_Matrix3_js__['a']();
  this.generateMipmaps = true;
  this.premultiplyAlpha = false;
  this.flipY = true;
  this.unpackAlignment = 4;
  this.encoding = encoding !== undefined ? encoding : __WEBPACK_IMPORTED_MODULE_1__constants_js__['S'];
  this.version = 0;
  this.onUpdate = null;
}
Texture.DEFAULT_IMAGE = undefined;
Texture.DEFAULT_MAPPING = __WEBPACK_IMPORTED_MODULE_1__constants_js__['_74'];
Texture.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__core_EventDispatcher_js__['a'].prototype), {
  constructor: Texture,
  isTexture: true,
  updateMatrix: function () {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  },
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (source) {
    this.name = source.name;
    this.image = source.image;
    this.mipmaps = source.mipmaps.slice(0);
    this.mapping = source.mapping;
    this.wrapS = source.wrapS;
    this.wrapT = source.wrapT;
    this.magFilter = source.magFilter;
    this.minFilter = source.minFilter;
    this.anisotropy = source.anisotropy;
    this.format = source.format;
    this.type = source.type;
    this.offset.copy(source.offset);
    this.repeat.copy(source.repeat);
    this.center.copy(source.center);
    this.rotation = source.rotation;
    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrix.copy(source.matrix);
    this.generateMipmaps = source.generateMipmaps;
    this.premultiplyAlpha = source.premultiplyAlpha;
    this.flipY = source.flipY;
    this.unpackAlignment = source.unpackAlignment;
    this.encoding = source.encoding;
    return this;
  },
  toJSON: function (meta) {
    var isRootObject = meta === undefined || typeof meta === 'string';
    if (!isRootObject && meta.textures[this.uuid] !== undefined) {
      return meta.textures[this.uuid];
    }
    var output = {
      metadata: {
        version: 4.5,
        type: 'Texture',
        generator: 'Texture.toJSON'
      },
      uuid: this.uuid,
      name: this.name,
      mapping: this.mapping,
      repeat: [
        this.repeat.x,
        this.repeat.y
      ],
      offset: [
        this.offset.x,
        this.offset.y
      ],
      center: [
        this.center.x,
        this.center.y
      ],
      rotation: this.rotation,
      wrap: [
        this.wrapS,
        this.wrapT
      ],
      format: this.format,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY
    };
    if (this.image !== undefined) {
      var image = this.image;
      if (image.uuid === undefined) {
        image.uuid = __WEBPACK_IMPORTED_MODULE_2__math_Math_js__['a'].generateUUID();
      }
      if (!isRootObject && meta.images[image.uuid] === undefined) {
        var url;
        if (Array.isArray(image)) {
          url = [];
          for (var i = 0, l = image.length; i < l; i++) {
            url.push(__WEBPACK_IMPORTED_MODULE_5__extras_ImageUtils_js__['a'].getDataURL(image[i]));
          }
        } else {
          url = __WEBPACK_IMPORTED_MODULE_5__extras_ImageUtils_js__['a'].getDataURL(image);
        }
        meta.images[image.uuid] = {
          uuid: image.uuid,
          url: url
        };
      }
      output.image = image.uuid;
    }
    if (!isRootObject) {
      meta.textures[this.uuid] = output;
    }
    return output;
  },
  dispose: function () {
    this.dispatchEvent({ type: 'dispose' });
  },
  transformUv: function (uv) {
    if (this.mapping !== __WEBPACK_IMPORTED_MODULE_1__constants_js__['_74'])
      return uv;
    uv.applyMatrix3(this.matrix);
    if (uv.x < 0 || uv.x > 1) {
      switch (this.wrapS) {
      case __WEBPACK_IMPORTED_MODULE_1__constants_js__['_60']:
        uv.x = uv.x - Math.floor(uv.x);
        break;
      case __WEBPACK_IMPORTED_MODULE_1__constants_js__['k']:
        uv.x = uv.x < 0 ? 0 : 1;
        break;
      case __WEBPACK_IMPORTED_MODULE_1__constants_js__['_6']:
        if (Math.abs(Math.floor(uv.x) % 2) === 1) {
          uv.x = Math.ceil(uv.x) - uv.x;
        } else {
          uv.x = uv.x - Math.floor(uv.x);
        }
        break;
      }
    }
    if (uv.y < 0 || uv.y > 1) {
      switch (this.wrapT) {
      case __WEBPACK_IMPORTED_MODULE_1__constants_js__['_60']:
        uv.y = uv.y - Math.floor(uv.y);
        break;
      case __WEBPACK_IMPORTED_MODULE_1__constants_js__['k']:
        uv.y = uv.y < 0 ? 0 : 1;
        break;
      case __WEBPACK_IMPORTED_MODULE_1__constants_js__['_6']:
        if (Math.abs(Math.floor(uv.y) % 2) === 1) {
          uv.y = Math.ceil(uv.y) - uv.y;
        } else {
          uv.y = uv.y - Math.floor(uv.y);
        }
        break;
      }
    }
    if (this.flipY) {
      uv.y = 1 - uv.y;
    }
    return uv;
  }
});
Object.defineProperty(Texture.prototype, 'needsUpdate', {
  set: function (value) {
    if (value === true)
      this.version++;
  }
});