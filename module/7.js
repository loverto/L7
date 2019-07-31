'use strict';
require.d(exports, 'a', function () {
  return Color;
});
var __WEBPACK_IMPORTED_MODULE_0__Math_js__ = require('./6');
var ColorKeywords = {
  'aliceblue': 15792383,
  'antiquewhite': 16444375,
  'aqua': 65535,
  'aquamarine': 8388564,
  'azure': 15794175,
  'beige': 16119260,
  'bisque': 16770244,
  'black': 0,
  'blanchedalmond': 16772045,
  'blue': 255,
  'blueviolet': 9055202,
  'brown': 10824234,
  'burlywood': 14596231,
  'cadetblue': 6266528,
  'chartreuse': 8388352,
  'chocolate': 13789470,
  'coral': 16744272,
  'cornflowerblue': 6591981,
  'cornsilk': 16775388,
  'crimson': 14423100,
  'cyan': 65535,
  'darkblue': 139,
  'darkcyan': 35723,
  'darkgoldenrod': 12092939,
  'darkgray': 11119017,
  'darkgreen': 25600,
  'darkgrey': 11119017,
  'darkkhaki': 12433259,
  'darkmagenta': 9109643,
  'darkolivegreen': 5597999,
  'darkorange': 16747520,
  'darkorchid': 10040012,
  'darkred': 9109504,
  'darksalmon': 15308410,
  'darkseagreen': 9419919,
  'darkslateblue': 4734347,
  'darkslategray': 3100495,
  'darkslategrey': 3100495,
  'darkturquoise': 52945,
  'darkviolet': 9699539,
  'deeppink': 16716947,
  'deepskyblue': 49151,
  'dimgray': 6908265,
  'dimgrey': 6908265,
  'dodgerblue': 2003199,
  'firebrick': 11674146,
  'floralwhite': 16775920,
  'forestgreen': 2263842,
  'fuchsia': 16711935,
  'gainsboro': 14474460,
  'ghostwhite': 16316671,
  'gold': 16766720,
  'goldenrod': 14329120,
  'gray': 8421504,
  'green': 32768,
  'greenyellow': 11403055,
  'grey': 8421504,
  'honeydew': 15794160,
  'hotpink': 16738740,
  'indianred': 13458524,
  'indigo': 4915330,
  'ivory': 16777200,
  'khaki': 15787660,
  'lavender': 15132410,
  'lavenderblush': 16773365,
  'lawngreen': 8190976,
  'lemonchiffon': 16775885,
  'lightblue': 11393254,
  'lightcoral': 15761536,
  'lightcyan': 14745599,
  'lightgoldenrodyellow': 16448210,
  'lightgray': 13882323,
  'lightgreen': 9498256,
  'lightgrey': 13882323,
  'lightpink': 16758465,
  'lightsalmon': 16752762,
  'lightseagreen': 2142890,
  'lightskyblue': 8900346,
  'lightslategray': 7833753,
  'lightslategrey': 7833753,
  'lightsteelblue': 11584734,
  'lightyellow': 16777184,
  'lime': 65280,
  'limegreen': 3329330,
  'linen': 16445670,
  'magenta': 16711935,
  'maroon': 8388608,
  'mediumaquamarine': 6737322,
  'mediumblue': 205,
  'mediumorchid': 12211667,
  'mediumpurple': 9662683,
  'mediumseagreen': 3978097,
  'mediumslateblue': 8087790,
  'mediumspringgreen': 64154,
  'mediumturquoise': 4772300,
  'mediumvioletred': 13047173,
  'midnightblue': 1644912,
  'mintcream': 16121850,
  'mistyrose': 16770273,
  'moccasin': 16770229,
  'navajowhite': 16768685,
  'navy': 128,
  'oldlace': 16643558,
  'olive': 8421376,
  'olivedrab': 7048739,
  'orange': 16753920,
  'orangered': 16729344,
  'orchid': 14315734,
  'palegoldenrod': 15657130,
  'palegreen': 10025880,
  'paleturquoise': 11529966,
  'palevioletred': 14381203,
  'papayawhip': 16773077,
  'peachpuff': 16767673,
  'peru': 13468991,
  'pink': 16761035,
  'plum': 14524637,
  'powderblue': 11591910,
  'purple': 8388736,
  'rebeccapurple': 6697881,
  'red': 16711680,
  'rosybrown': 12357519,
  'royalblue': 4286945,
  'saddlebrown': 9127187,
  'salmon': 16416882,
  'sandybrown': 16032864,
  'seagreen': 3050327,
  'seashell': 16774638,
  'sienna': 10506797,
  'silver': 12632256,
  'skyblue': 8900331,
  'slateblue': 6970061,
  'slategray': 7372944,
  'slategrey': 7372944,
  'snow': 16775930,
  'springgreen': 65407,
  'steelblue': 4620980,
  'tan': 13808780,
  'teal': 32896,
  'thistle': 14204888,
  'tomato': 16737095,
  'turquoise': 4251856,
  'violet': 15631086,
  'wheat': 16113331,
  'white': 16777215,
  'whitesmoke': 16119285,
  'yellow': 16776960,
  'yellowgreen': 10145074
};
function Color(r, g, b) {
  if (g === undefined && b === undefined) {
    return this.set(r);
  }
  return this.setRGB(r, g, b);
}
Object.assign(Color.prototype, {
  isColor: true,
  r: 1,
  g: 1,
  b: 1,
  set: function (value) {
    if (value && value.isColor) {
      this.copy(value);
    } else if (typeof value === 'number') {
      this.setHex(value);
    } else if (typeof value === 'string') {
      this.setStyle(value);
    }
    return this;
  },
  setScalar: function (scalar) {
    this.r = scalar;
    this.g = scalar;
    this.b = scalar;
    return this;
  },
  setHex: function (hex) {
    hex = Math.floor(hex);
    this.r = (hex >> 16 & 255) / 255;
    this.g = (hex >> 8 & 255) / 255;
    this.b = (hex & 255) / 255;
    return this;
  },
  setRGB: function (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  },
  setHSL: function () {
    function hue2rgb(p, q, t) {
      if (t < 0)
        t += 1;
      if (t > 1)
        t -= 1;
      if (t < 1 / 6)
        return p + (q - p) * 6 * t;
      if (t < 1 / 2)
        return q;
      if (t < 2 / 3)
        return p + (q - p) * 6 * (2 / 3 - t);
      return p;
    }
    return function setHSL(h, s, l) {
      h = __WEBPACK_IMPORTED_MODULE_0__Math_js__['a'].euclideanModulo(h, 1);
      s = __WEBPACK_IMPORTED_MODULE_0__Math_js__['a'].clamp(s, 0, 1);
      l = __WEBPACK_IMPORTED_MODULE_0__Math_js__['a'].clamp(l, 0, 1);
      if (s === 0) {
        this.r = this.g = this.b = l;
      } else {
        var p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
        var q = 2 * l - p;
        this.r = hue2rgb(q, p, h + 1 / 3);
        this.g = hue2rgb(q, p, h);
        this.b = hue2rgb(q, p, h - 1 / 3);
      }
      return this;
    };
  }(),
  setStyle: function (style) {
    function handleAlpha(string) {
      if (string === undefined)
        return;
      if (parseFloat(string) < 1) {
        console.warn('THREE.Color: Alpha component of ' + style + ' will be ignored.');
      }
    }
    var m;
    if (m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)) {
      var color;
      var name = m[1];
      var components = m[2];
      switch (name) {
      case 'rgb':
      case 'rgba':
        if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
          this.r = Math.min(255, parseInt(color[1], 10)) / 255;
          this.g = Math.min(255, parseInt(color[2], 10)) / 255;
          this.b = Math.min(255, parseInt(color[3], 10)) / 255;
          handleAlpha(color[5]);
          return this;
        }
        if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
          this.r = Math.min(100, parseInt(color[1], 10)) / 100;
          this.g = Math.min(100, parseInt(color[2], 10)) / 100;
          this.b = Math.min(100, parseInt(color[3], 10)) / 100;
          handleAlpha(color[5]);
          return this;
        }
        break;
      case 'hsl':
      case 'hsla':
        if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
          var h = parseFloat(color[1]) / 360;
          var s = parseInt(color[2], 10) / 100;
          var l = parseInt(color[3], 10) / 100;
          handleAlpha(color[5]);
          return this.setHSL(h, s, l);
        }
        break;
      }
    } else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {
      var hex = m[1];
      var size = hex.length;
      if (size === 3) {
        this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
        this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
        this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
        return this;
      } else if (size === 6) {
        this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
        this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
        this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;
        return this;
      }
    }
    if (style && style.length > 0) {
      var hex = ColorKeywords[style];
      if (hex !== undefined) {
        this.setHex(hex);
      } else {
        console.warn('THREE.Color: Unknown color ' + style);
      }
    }
    return this;
  },
  clone: function () {
    return new this.constructor(this.r, this.g, this.b);
  },
  copy: function (color) {
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    return this;
  },
  copyGammaToLinear: function (color, gammaFactor) {
    if (gammaFactor === undefined)
      gammaFactor = 2;
    this.r = Math.pow(color.r, gammaFactor);
    this.g = Math.pow(color.g, gammaFactor);
    this.b = Math.pow(color.b, gammaFactor);
    return this;
  },
  copyLinearToGamma: function (color, gammaFactor) {
    if (gammaFactor === undefined)
      gammaFactor = 2;
    var safeInverse = gammaFactor > 0 ? 1 / gammaFactor : 1;
    this.r = Math.pow(color.r, safeInverse);
    this.g = Math.pow(color.g, safeInverse);
    this.b = Math.pow(color.b, safeInverse);
    return this;
  },
  convertGammaToLinear: function (gammaFactor) {
    this.copyGammaToLinear(this, gammaFactor);
    return this;
  },
  convertLinearToGamma: function (gammaFactor) {
    this.copyLinearToGamma(this, gammaFactor);
    return this;
  },
  copySRGBToLinear: function () {
    function SRGBToLinear(c) {
      return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
    }
    return function copySRGBToLinear(color) {
      this.r = SRGBToLinear(color.r);
      this.g = SRGBToLinear(color.g);
      this.b = SRGBToLinear(color.b);
      return this;
    };
  }(),
  copyLinearToSRGB: function () {
    function LinearToSRGB(c) {
      return c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
    }
    return function copyLinearToSRGB(color) {
      this.r = LinearToSRGB(color.r);
      this.g = LinearToSRGB(color.g);
      this.b = LinearToSRGB(color.b);
      return this;
    };
  }(),
  convertSRGBToLinear: function () {
    this.copySRGBToLinear(this);
    return this;
  },
  convertLinearToSRGB: function () {
    this.copyLinearToSRGB(this);
    return this;
  },
  getHex: function () {
    return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0;
  },
  getHexString: function () {
    return ('000000' + this.getHex().toString(16)).slice(-6);
  },
  getHSL: function (target) {
    if (target === undefined) {
      console.warn('THREE.Color: .getHSL() target is now required');
      target = {
        h: 0,
        s: 0,
        l: 0
      };
    }
    var r = this.r, g = this.g, b = this.b;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var hue, saturation;
    var lightness = (min + max) / 2;
    if (min === max) {
      hue = 0;
      saturation = 0;
    } else {
      var delta = max - min;
      saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
      switch (max) {
      case r:
        hue = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / delta + 2;
        break;
      case b:
        hue = (r - g) / delta + 4;
        break;
      }
      hue /= 6;
    }
    target.h = hue;
    target.s = saturation;
    target.l = lightness;
    return target;
  },
  getStyle: function () {
    return 'rgb(' + (this.r * 255 | 0) + ',' + (this.g * 255 | 0) + ',' + (this.b * 255 | 0) + ')';
  },
  offsetHSL: function () {
    var hsl = {};
    return function (h, s, l) {
      this.getHSL(hsl);
      hsl.h += h;
      hsl.s += s;
      hsl.l += l;
      this.setHSL(hsl.h, hsl.s, hsl.l);
      return this;
    };
  }(),
  add: function (color) {
    this.r += color.r;
    this.g += color.g;
    this.b += color.b;
    return this;
  },
  addColors: function (color1, color2) {
    this.r = color1.r + color2.r;
    this.g = color1.g + color2.g;
    this.b = color1.b + color2.b;
    return this;
  },
  addScalar: function (s) {
    this.r += s;
    this.g += s;
    this.b += s;
    return this;
  },
  sub: function (color) {
    this.r = Math.max(0, this.r - color.r);
    this.g = Math.max(0, this.g - color.g);
    this.b = Math.max(0, this.b - color.b);
    return this;
  },
  multiply: function (color) {
    this.r *= color.r;
    this.g *= color.g;
    this.b *= color.b;
    return this;
  },
  multiplyScalar: function (s) {
    this.r *= s;
    this.g *= s;
    this.b *= s;
    return this;
  },
  lerp: function (color, alpha) {
    this.r += (color.r - this.r) * alpha;
    this.g += (color.g - this.g) * alpha;
    this.b += (color.b - this.b) * alpha;
    return this;
  },
  lerpHSL: function () {
    var hslA = {
      h: 0,
      s: 0,
      l: 0
    };
    var hslB = {
      h: 0,
      s: 0,
      l: 0
    };
    return function lerpHSL(color, alpha) {
      this.getHSL(hslA);
      color.getHSL(hslB);
      var h = __WEBPACK_IMPORTED_MODULE_0__Math_js__['a'].lerp(hslA.h, hslB.h, alpha);
      var s = __WEBPACK_IMPORTED_MODULE_0__Math_js__['a'].lerp(hslA.s, hslB.s, alpha);
      var l = __WEBPACK_IMPORTED_MODULE_0__Math_js__['a'].lerp(hslA.l, hslB.l, alpha);
      this.setHSL(h, s, l);
      return this;
    };
  }(),
  equals: function (c) {
    return c.r === this.r && c.g === this.g && c.b === this.b;
  },
  fromArray: function (array, offset) {
    if (offset === undefined)
      offset = 0;
    this.r = array[offset];
    this.g = array[offset + 1];
    this.b = array[offset + 2];
    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined)
      array = [];
    if (offset === undefined)
      offset = 0;
    array[offset] = this.r;
    array[offset + 1] = this.g;
    array[offset + 2] = this.b;
    return array;
  },
  toJSON: function () {
    return this.getHex();
  }
});