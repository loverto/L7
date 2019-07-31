'use strict';
require.d(exports, 'a', function () {
  return WebXRManager;
});
var __WEBPACK_IMPORTED_MODULE_0__objects_Group_js__ = require('./55');
var __WEBPACK_IMPORTED_MODULE_1__math_Vector4_js__ = require('./11');
var __WEBPACK_IMPORTED_MODULE_2__cameras_ArrayCamera_js__ = require('./56');
var __WEBPACK_IMPORTED_MODULE_3__cameras_PerspectiveCamera_js__ = require('./26');
var __WEBPACK_IMPORTED_MODULE_4__webgl_WebGLAnimation_js__ = require('./33');
function WebXRManager(renderer) {
  var gl = renderer.context;
  var device = null;
  var session = null;
  var frameOfReference = null;
  var frameOfReferenceType = 'stage';
  var pose = null;
  var controllers = [];
  var inputSources = [];
  function isPresenting() {
    return session !== null && frameOfReference !== null;
  }
  var cameraL = new __WEBPACK_IMPORTED_MODULE_3__cameras_PerspectiveCamera_js__['a']();
  cameraL.layers.enable(1);
  cameraL.viewport = new __WEBPACK_IMPORTED_MODULE_1__math_Vector4_js__['a']();
  var cameraR = new __WEBPACK_IMPORTED_MODULE_3__cameras_PerspectiveCamera_js__['a']();
  cameraR.layers.enable(2);
  cameraR.viewport = new __WEBPACK_IMPORTED_MODULE_1__math_Vector4_js__['a']();
  var cameraVR = new __WEBPACK_IMPORTED_MODULE_2__cameras_ArrayCamera_js__['a']([
    cameraL,
    cameraR
  ]);
  cameraVR.layers.enable(1);
  cameraVR.layers.enable(2);
  this.enabled = false;
  this.getController = function (id) {
    var controller = controllers[id];
    if (controller === undefined) {
      controller = new __WEBPACK_IMPORTED_MODULE_0__objects_Group_js__['a']();
      controller.matrixAutoUpdate = false;
      controller.visible = false;
      controllers[id] = controller;
    }
    return controller;
  };
  this.getDevice = function () {
    return device;
  };
  this.setDevice = function (value) {
    if (value !== undefined)
      device = value;
    if (value instanceof XRDevice)
      gl.setCompatibleXRDevice(value);
  };
  function onSessionEvent(event) {
    var controller = controllers[inputSources.indexOf(event.inputSource)];
    if (controller)
      controller.dispatchEvent({ type: event.type });
  }
  function onSessionEnd() {
    renderer.setFramebuffer(null);
    animation.stop();
  }
  this.setFrameOfReferenceType = function (value) {
    frameOfReferenceType = value;
  };
  this.setSession = function (value) {
    session = value;
    if (session !== null) {
      session.addEventListener('select', onSessionEvent);
      session.addEventListener('selectstart', onSessionEvent);
      session.addEventListener('selectend', onSessionEvent);
      session.addEventListener('end', onSessionEnd);
      session.baseLayer = new XRWebGLLayer(session, gl);
      session.requestFrameOfReference(frameOfReferenceType).then(function (value) {
        frameOfReference = value;
        renderer.setFramebuffer(session.baseLayer.framebuffer);
        animation.setContext(session);
        animation.start();
      });
      inputSources = session.getInputSources();
      session.addEventListener('inputsourceschange', function () {
        inputSources = session.getInputSources();
        console.log(inputSources);
      });
    }
  };
  function updateCamera(camera, parent) {
    if (parent === null) {
      camera.matrixWorld.copy(camera.matrix);
    } else {
      camera.matrixWorld.multiplyMatrices(parent.matrixWorld, camera.matrix);
    }
    camera.matrixWorldInverse.getInverse(camera.matrixWorld);
  }
  this.getCamera = function (camera) {
    if (isPresenting()) {
      var parent = camera.parent;
      var cameras = cameraVR.cameras;
      updateCamera(cameraVR, parent);
      for (var i = 0; i < cameras.length; i++) {
        updateCamera(cameras[i], parent);
      }
      camera.matrixWorld.copy(cameraVR.matrixWorld);
      var children = camera.children;
      for (var i = 0, l = children.length; i < l; i++) {
        children[i].updateMatrixWorld(true);
      }
      return cameraVR;
    }
    return camera;
  };
  this.isPresenting = isPresenting;
  var onAnimationFrameCallback = null;
  function onAnimationFrame(time, frame) {
    pose = frame.getDevicePose(frameOfReference);
    if (pose !== null) {
      var layer = session.baseLayer;
      var views = frame.views;
      for (var i = 0; i < views.length; i++) {
        var view = views[i];
        var viewport = layer.getViewport(view);
        var viewMatrix = pose.getViewMatrix(view);
        var camera = cameraVR.cameras[i];
        camera.matrix.fromArray(viewMatrix).getInverse(camera.matrix);
        camera.projectionMatrix.fromArray(view.projectionMatrix);
        camera.viewport.set(viewport.x, viewport.y, viewport.width, viewport.height);
        if (i === 0) {
          cameraVR.matrix.copy(camera.matrix);
          cameraVR.projectionMatrix.copy(camera.projectionMatrix);
        }
      }
    }
    for (var i = 0; i < controllers.length; i++) {
      var controller = controllers[i];
      var inputSource = inputSources[i];
      if (inputSource) {
        var inputPose = frame.getInputPose(inputSource, frameOfReference);
        if (inputPose !== null) {
          if ('targetRay' in inputPose) {
            controller.matrix.elements = inputPose.targetRay.transformMatrix;
          } else if ('pointerMatrix' in inputPose) {
            controller.matrix.elements = inputPose.pointerMatrix;
          }
          controller.matrix.decompose(controller.position, controller.rotation, controller.scale);
          controller.visible = true;
          continue;
        }
      }
      controller.visible = false;
    }
    if (onAnimationFrameCallback)
      onAnimationFrameCallback(time);
  }
  var animation = new __WEBPACK_IMPORTED_MODULE_4__webgl_WebGLAnimation_js__['a']();
  animation.setAnimationLoop(onAnimationFrame);
  this.setAnimationLoop = function (callback) {
    onAnimationFrameCallback = callback;
  };
  this.dispose = function () {
  };
  this.getStandingMatrix = function () {
    console.warn('THREE.WebXRManager: getStandingMatrix() is no longer needed.');
    return new THREE.Matrix4();
  };
  this.submitFrame = function () {
  };
}