module.exports = '    precision highp float;\n    uniform float u_opacity;\n    varying vec4 v_color;\n    varying float vTime;\n    void main() {\n      vec4 color = v_color;\n  \n      #ifdef ANIMATE \n        if (vTime > 1.0 || vTime < 0.0) {\n            discard;\n      } \n      color.a= color.a * vTime * 1.5;\n      #endif\n      gl_FragColor = color;\n      gl_FragColor.a =color.a*u_opacity;\n}';