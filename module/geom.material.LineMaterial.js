'use strict';
exports['c'] = LineMaterial;
exports['a'] = ArcLineMaterial;
exports['d'] = MeshLineMaterial;
exports['b'] = DashLineMaterial;
var core_three = require('./three');
var material = require('./Material');
var shader_line_frag_glsl = require('./299');
var shader_line_frag_glsl___default = require.n(shader_line_frag_glsl);
var shader_line_vert_glsl = require('./300');
var shader_line_vert_glsl___default = require.n(shader_line_vert_glsl);
var shader_arcline_frag_glsl = require('./301');
var shader_arcline_frag_glsl___default = require.n(shader_arcline_frag_glsl);
var shader_arcline_vert_glsl = require('./302');
var shader_arcline_vert_glsl___default = require.n(shader_arcline_vert_glsl);
var shader_meshline_vert_glsl= require('./303');
var shader_meshline_vert_glsl___default = require.n(shader_meshline_vert_glsl);
var shader_meshline_frag_glsl = require('./304');
var shader_meshline_frag_glsl___default = require.n(shader_meshline_frag_glsl);
var shader_dashline_frag_glsl = require('./305');
var shader_dashline_frag_glsl___default = require.n(shader_dashline_frag_glsl);
var shader_dashline_vert_glsl = require('./306');
var shader_dashline_vert_glsl___default = require.n(shader_dashline_vert_glsl);
function LineMaterial(options) {
  // 线材料
  var material = new material['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity || 1 },
      u_time: { value: options.u_time || 0 },
      u_zoom: { value: options.u_zoom || 10 }
    },
    vertexShader: shader_line_vert_glsl___default.a,
    fragmentShader: shader_line_frag_glsl___default.a,
    transparent: true,
    blending: core_three['AdditiveBlending']
  });
  return material;
}
function ArcLineMaterial(options) {
  var material = new material['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity || 1 },
      segmentNumber: { value: 49 },
      u_time: { value: 0 },
      u_zoom: { value: options.u_zoom || 10 }
    },
    vertexShader: shader_arcline_vert_glsl___default.a,
    fragmentShader: shader_arcline_frag_glsl___default.a,
    transparent: true,
    blending: core_three['AdditiveBlending']
  });
  return material;
}
function MeshLineMaterial(options) {
  var material = new material['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity || 1 },
      u_time: { value: options.u_time || 0 },
      u_zoom: { value: options.u_zoom }
    },
    vertexShader: shader_meshline_vert_glsl___default.a,
    fragmentShader: shader_meshline_frag_glsl___default.a,
    transparent: true
  });
  return material;
}
function DashLineMaterial(options) {
  var material = new material['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity || 1 },
      u_time: { value: options.u_time || 0 },
      u_zoom: { value: options.u_zoom },
      u_dashSteps: { value: options.u_dashSteps || 12 },
      u_dashSmooth: { value: options.u_dashSmooth || 0.01 },
      u_dashDistance: { value: options.u_dashDistance || 0.2 }
    },
    vertexShader: shader_dashline_vert_glsl___default.a,
    fragmentShader: shader_dashline_frag_glsl___default.a,
    transparent: true
  });
  return material;
}
