'use strict';
exports['a'] = TextMaterial;
var __WEBPACK_IMPORTED_MODULE_0__material__ = require('./Material');
var __WEBPACK_IMPORTED_MODULE_1__shader_text_frag_glsl__ = require('./313');
var __WEBPACK_IMPORTED_MODULE_1__shader_text_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_1__shader_text_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_2__shader_text_vert_glsl__ = require('./314');
var __WEBPACK_IMPORTED_MODULE_2__shader_text_vert_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_2__shader_text_vert_glsl__);
function TextMaterial(options) {
  var material = new __WEBPACK_IMPORTED_MODULE_0__material__['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity || 1 },
      u_texture: { value: options.u_texture },
      u_strokeWidth: { value: options.u_strokeWidth },
      u_stroke: { value: options.u_stroke },
      u_textSize: { value: options.u_textSize },
      u_scale: { value: options.u_scale },
      u_gamma: { value: options.u_gamma },
      u_buffer: { value: options.u_buffer },
      u_color: { value: options.u_color },
      u_glSize: { value: options.u_glSize }
    },
    vertexShader: __WEBPACK_IMPORTED_MODULE_2__shader_text_vert_glsl___default.a,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_1__shader_text_frag_glsl___default.a,
    transparent: true
  });
  return material;
}
