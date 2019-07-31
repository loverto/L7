module.exports = 'precision highp float;\nattribute vec4 a_color;\nattribute float a_size;\nattribute float a_shape;\nattribute vec4 a_idColor;\nuniform vec4 u_stroke;\nuniform float u_strokeWidth;\nuniform float u_opacity;\nuniform float u_zoom;\nvarying vec4 v_color;\nvarying vec2 v_rs;\nvarying vec2 v_uv;\nvarying float v_shape;\n\nvoid main() {\n  mat4 matModelViewProjection = projectionMatrix * modelViewMatrix;\n   v_color = a_color;\n\n   gl_Position =  matModelViewProjection  * vec4(position, 1.0);\n   gl_PointSize = a_size;\n   v_rs = vec2(a_size / 2.0, a_size / 2.0- u_strokeWidth);\n    #ifdef TEXCOORD_0\n      \n       v_uv = uv;\n    #endif\n    #ifdef SHAPE\n      v_shape = a_shape;\n    #endif\n}\n\n';