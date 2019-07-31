'use strict';
exports['c'] = LineMaterial;
exports['a'] = ArcLineMaterial;
exports['d'] = MeshLineMaterial;
exports['b'] = DashLineMaterial;
var __WEBPACK_IMPORTED_MODULE_0__core_three__ = require('./three');
var __WEBPACK_IMPORTED_MODULE_1__material__ = require('./Material');
var __WEBPACK_IMPORTED_MODULE_2__shader_line_frag_glsl__ = require('./299');
var __WEBPACK_IMPORTED_MODULE_2__shader_line_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_2__shader_line_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_3__shader_line_vert_glsl__ = require('./300');
var __WEBPACK_IMPORTED_MODULE_3__shader_line_vert_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_3__shader_line_vert_glsl__);
var __WEBPACK_IMPORTED_MODULE_4__shader_arcline_frag_glsl__ = require('./301');
var __WEBPACK_IMPORTED_MODULE_4__shader_arcline_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_4__shader_arcline_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_5__shader_arcline_vert_glsl__ = require('./302');
var __WEBPACK_IMPORTED_MODULE_5__shader_arcline_vert_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_5__shader_arcline_vert_glsl__);
var __WEBPACK_IMPORTED_MODULE_6__shader_meshline_vert_glsl__ = require('./303');
var __WEBPACK_IMPORTED_MODULE_6__shader_meshline_vert_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_6__shader_meshline_vert_glsl__);
var __WEBPACK_IMPORTED_MODULE_7__shader_meshline_frag_glsl__ = require('./304');
var __WEBPACK_IMPORTED_MODULE_7__shader_meshline_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_7__shader_meshline_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_8__shader_dashline_frag_glsl__ = require('./305');
var __WEBPACK_IMPORTED_MODULE_8__shader_dashline_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_8__shader_dashline_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_9__shader_dashline_vert_glsl__ = require('./306');
var __WEBPACK_IMPORTED_MODULE_9__shader_dashline_vert_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_9__shader_dashline_vert_glsl__);
function LineMaterial(options) {
  // 线材料
  var material = new __WEBPACK_IMPORTED_MODULE_1__material__['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity || 1 },
      u_time: { value: options.u_time || 0 },
      u_zoom: { value: options.u_zoom || 10 }
    },
    vertexShader: __WEBPACK_IMPORTED_MODULE_3__shader_line_vert_glsl___default.a,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_2__shader_line_frag_glsl___default.a,
    transparent: true,
    blending: __WEBPACK_IMPORTED_MODULE_0__core_three__['AdditiveBlending']
  });
  return material;
}
function ArcLineMaterial(options) {
  var material = new __WEBPACK_IMPORTED_MODULE_1__material__['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity || 1 },
      segmentNumber: { value: 49 },
      u_time: { value: 0 },
      u_zoom: { value: options.u_zoom || 10 }
    },
    vertexShader: __WEBPACK_IMPORTED_MODULE_5__shader_arcline_vert_glsl___default.a,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_4__shader_arcline_frag_glsl___default.a,
    transparent: true,
    blending: __WEBPACK_IMPORTED_MODULE_0__core_three__['AdditiveBlending']
  });
  return material;
}
function MeshLineMaterial(options) {
  var material = new __WEBPACK_IMPORTED_MODULE_1__material__['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity || 1 },
      u_time: { value: options.u_time || 0 },
      u_zoom: { value: options.u_zoom }
    },
    vertexShader: __WEBPACK_IMPORTED_MODULE_6__shader_meshline_vert_glsl___default.a,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_7__shader_meshline_frag_glsl___default.a,
    transparent: true
  });
  return material;
}
function DashLineMaterial(options) {
  var material = new __WEBPACK_IMPORTED_MODULE_1__material__['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity || 1 },
      u_time: { value: options.u_time || 0 },
      u_zoom: { value: options.u_zoom },
      u_dashSteps: { value: options.u_dashSteps || 12 },
      u_dashSmooth: { value: options.u_dashSmooth || 0.01 },
      u_dashDistance: { value: options.u_dashDistance || 0.2 }
    },
    vertexShader: __WEBPACK_IMPORTED_MODULE_9__shader_dashline_vert_glsl___default.a,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_8__shader_dashline_frag_glsl___default.a,
    transparent: true
  });
  return material;
}
