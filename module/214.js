'use strict';
require.d(exports, 'a', function () {
  return WebGLMorphtargets;
});
function absNumericalSort(a, b) {
  return Math.abs(b[1]) - Math.abs(a[1]);
}
function WebGLMorphtargets(gl) {
  var influencesList = {};
  var morphInfluences = new Float32Array(8);
  function update(object, geometry, material, program) {
    var objectInfluences = object.morphTargetInfluences;
    var length = objectInfluences.length;
    var influences = influencesList[geometry.id];
    if (influences === undefined) {
      influences = [];
      for (var i = 0; i < length; i++) {
        influences[i] = [
          i,
          0
        ];
      }
      influencesList[geometry.id] = influences;
    }
    var morphTargets = material.morphTargets && geometry.morphAttributes.position;
    var morphNormals = material.morphNormals && geometry.morphAttributes.normal;
    for (var i = 0; i < length; i++) {
      var influence = influences[i];
      if (influence[1] !== 0) {
        if (morphTargets)
          geometry.removeAttribute('morphTarget' + i);
        if (morphNormals)
          geometry.removeAttribute('morphNormal' + i);
      }
    }
    for (var i = 0; i < length; i++) {
      var influence = influences[i];
      influence[0] = i;
      influence[1] = objectInfluences[i];
    }
    influences.sort(absNumericalSort);
    for (var i = 0; i < 8; i++) {
      var influence = influences[i];
      if (influence) {
        var index = influence[0];
        var value = influence[1];
        if (value) {
          if (morphTargets)
            geometry.addAttribute('morphTarget' + i, morphTargets[index]);
          if (morphNormals)
            geometry.addAttribute('morphNormal' + i, morphNormals[index]);
          morphInfluences[i] = value;
          continue;
        }
      }
      morphInfluences[i] = 0;
    }
    program.getUniforms().setValue(gl, 'morphTargetInfluences', morphInfluences);
  }
  return { update: update };
}