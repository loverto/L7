'use strict';
require.d(exports, 'a', function () {
  return WebGLIndexedBufferRenderer;
});
function WebGLIndexedBufferRenderer(gl, extensions, info, capabilities) {
  var mode;
  function setMode(value) {
    mode = value;
  }
  var type, bytesPerElement;
  function setIndex(value) {
    type = value.type;
    bytesPerElement = value.bytesPerElement;
  }
  function render(start, count) {
    gl.drawElements(mode, count, type, start * bytesPerElement);
    info.update(count, mode);
  }
  function renderInstances(geometry, start, count) {
    var extension;
    if (capabilities.isWebGL2) {
      extension = gl;
    } else {
      var extension = extensions.get('ANGLE_instanced_arrays');
      if (extension === null) {
        console.error('THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
        return;
      }
    }
    extension[capabilities.isWebGL2 ? 'drawElementsInstanced' : 'drawElementsInstancedANGLE'](mode, count, type, start * bytesPerElement, geometry.maxInstancedCount);
    info.update(count, mode, geometry.maxInstancedCount);
  }
  this.setMode = setMode;
  this.setIndex = setIndex;
  this.render = render;
  this.renderInstances = renderInstances;
}