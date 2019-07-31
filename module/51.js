'use strict';
require.d(exports, 'a', function () {
  return ShaderMaterial;
});
var __WEBPACK_IMPORTED_MODULE_0__Material_js__ = require('./19');
var __WEBPACK_IMPORTED_MODULE_1__renderers_shaders_UniformsUtils_js__ = require('./32');
function ShaderMaterial(parameters) {
  __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].call(this);
  this.type = 'ShaderMaterial';
  this.defines = {};
  this.uniforms = {};
  this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
  this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';
  this.linewidth = 1;
  this.wireframe = false;
  this.wireframeLinewidth = 1;
  this.fog = false;
  this.lights = false;
  this.clipping = false;
  this.skinning = false;
  this.morphTargets = false;
  this.morphNormals = false;
  this.extensions = {
    derivatives: false,
    fragDepth: false,
    drawBuffers: false,
    shaderTextureLOD: false
  };
  this.defaultAttributeValues = {
    'color': [
      1,
      1,
      1
    ],
    'uv': [
      0,
      0
    ],
    'uv2': [
      0,
      0
    ]
  };
  this.index0AttributeName = undefined;
  this.uniformsNeedUpdate = false;
  if (parameters !== undefined) {
    if (parameters.attributes !== undefined) {
      console.error('THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.');
    }
    this.setValues(parameters);
  }
}
ShaderMaterial.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype);
ShaderMaterial.prototype.constructor = ShaderMaterial;
ShaderMaterial.prototype.isShaderMaterial = true;
ShaderMaterial.prototype.copy = function (source) {
  __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype.copy.call(this, source);
  this.fragmentShader = source.fragmentShader;
  this.vertexShader = source.vertexShader;
  this.uniforms = __WEBPACK_IMPORTED_MODULE_1__renderers_shaders_UniformsUtils_js__['a'].clone(source.uniforms);
  this.defines = Object.assign({}, source.defines);
  this.wireframe = source.wireframe;
  this.wireframeLinewidth = source.wireframeLinewidth;
  this.lights = source.lights;
  this.clipping = source.clipping;
  this.skinning = source.skinning;
  this.morphTargets = source.morphTargets;
  this.morphNormals = source.morphNormals;
  this.extensions = source.extensions;
  return this;
};
ShaderMaterial.prototype.toJSON = function (meta) {
  var data = __WEBPACK_IMPORTED_MODULE_0__Material_js__['a'].prototype.toJSON.call(this, meta);
  data.uniforms = {};
  for (var name in this.uniforms) {
    var uniform = this.uniforms[name];
    var value = uniform.value;
    if (value.isTexture) {
      data.uniforms[name] = {
        type: 't',
        value: value.toJSON(meta).uuid
      };
    } else if (value.isColor) {
      data.uniforms[name] = {
        type: 'c',
        value: value.getHex()
      };
    } else if (value.isVector2) {
      data.uniforms[name] = {
        type: 'v2',
        value: value.toArray()
      };
    } else if (value.isVector3) {
      data.uniforms[name] = {
        type: 'v3',
        value: value.toArray()
      };
    } else if (value.isVector4) {
      data.uniforms[name] = {
        type: 'v4',
        value: value.toArray()
      };
    } else if (value.isMatrix4) {
      data.uniforms[name] = {
        type: 'm4',
        value: value.toArray()
      };
    } else {
      data.uniforms[name] = { value: value };
    }
  }
  if (Object.keys(this.defines).length > 0)
    data.defines = this.defines;
  data.vertexShader = this.vertexShader;
  data.fragmentShader = this.fragmentShader;
  return data;
};