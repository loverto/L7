'use strict';
exports['a'] = PolygonMaterial;
var __WEBPACK_IMPORTED_MODULE_0__shader_polygon_frag_glsl__ = require('./297');
var __WEBPACK_IMPORTED_MODULE_0__shader_polygon_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_0__shader_polygon_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_1__shader_polygon_vert_glsl__ = require('./298');
var __WEBPACK_IMPORTED_MODULE_1__shader_polygon_vert_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_1__shader_polygon_vert_glsl__);
var __WEBPACK_IMPORTED_MODULE_2__material__ = require('./Material');
function PolygonMaterial(options) {
  var material = new __WEBPACK_IMPORTED_MODULE_2__material__['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity || 1 },
      u_texture: { value: options.u_texture },
      u_time: { value: options.u_time || 0 },
      u_zoom: { value: options.u_zoom || 0 },
      u_baseColor: {
        value: options.u_baseColor || [
          1,
          0,
          0,
          1
        ]
      },
      u_brightColor: {
        value: options.u_brightColor || [
          1,
          0,
          0,
          1
        ]
      },
      u_windowColor: {
        value: options.u_windowColor || [
          1,
          0,
          0,
          1
        ]
      },
      u_near: { value: options.u_near || 0 },
      u_far: { value: options.u_far || 1 }
    },
    vertexShader: __WEBPACK_IMPORTED_MODULE_1__shader_polygon_vert_glsl___default.a,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__shader_polygon_frag_glsl___default.a,
    transparent: true,
    defines: { TEXCOORD_0: !!options.u_texture }
  });
  return material;
}
