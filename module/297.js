module.exports = 'precision highp float;\nuniform float u_opacity;\nuniform sampler2D u_texture;\nuniform vec4 u_baseColor;\nuniform vec4 u_brightColor;\nuniform vec4 u_windowColor;\nuniform float u_zoom;\nuniform float u_time;\nuniform float u_near;\nuniform float u_far;\nvarying vec2 v_texCoord;\nvarying  vec4 v_color;\nvarying float v_lightWeight;\nvarying float v_size;\n\nvec3 getWindowColor(float n, float hot, vec3 brightColor, vec3 darkColor) {\n    float s = step(hot, n);\n    //vec3 color = mix(brightColor,brightColor - vec3(0.4,0.4,0.4),n);\n    vec3 color = mix(brightColor,vec3(1.0,1.0,1.0),n);\n    return mix(darkColor, color, s);\n}\nfloat random (vec2 st) {\n    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);\n}\n\nfloat LinearizeDepth() \n{\n    float z = gl_FragCoord.z * 2.0 - 1.0;  \n    return (2.0 * u_near * u_far) / (u_far + u_near - z * (u_far - u_near));\t\n}\n\nvec3 fog(vec3 color, vec3 fogColor, float depth){\n    float fogFactor=clamp(depth,0.0,1.0);\n    vec3 output_color=mix(fogColor,color,fogFactor);\n    return output_color;\n}\n\nfloat sdRect(vec2 p, vec2 sz) {  \n  vec2 d = abs(p) - sz;\n  float outside = length(max(d, 0.));\n  float inside = min(max(d.x, d.y), 0.);\n  return outside + inside;\n}\n\n\nvoid main() {\n   if(v_color.w == 0.0) {\n     discard;\n     return;\n   }\n    vec3 baseColor = u_baseColor.xyz;\n    vec3 brightColor = u_brightColor.xyz;\n    vec3 windowColor = u_windowColor.xyz;\n    float targetColId = 5.;\n    float depth = 1.0 - LinearizeDepth() / u_far * u_zoom;  \n    vec3 fogColor = vec3(23.0/255.0,31.0/255.0,51.0/255.0); \n   #ifdef ANIMATE \n     if(v_texCoord.x < 0.) { //顶部颜色\n       vec3 foggedColor = fog(baseColor.xyz + vec3(0.12*0.9,0.2*0.9,0.3*0.9),fogColor,depth);\n       gl_FragColor = vec4( foggedColor, v_color.w * u_opacity);\n     }else { // 侧面颜色\n        vec2 st = v_texCoord; \n        vec2  UvScale = v_texCoord;\n        float tStep = min(0.08,max(0.05* (18.0-u_zoom),0.02));\n        float tStart = 0.25 * tStep;\n        float tEnd = 0.75 * tStep;\n        float u = mod(UvScale.x, tStep);\n        float v = mod(UvScale.y, tStep);\n        float ux = floor(UvScale.x/tStep);\n        float uy = floor(UvScale.y/tStep);\n        float n = random(vec2(ux,uy));\n        float lightP = u_time;\n        float head = 1.0- step(0.005,st.y);\n        /*step3*/\n        // 将窗户颜色和墙面颜色区别开来\n        float sU = step(tStart, u) - step(tEnd, u);\n        float sV = step(tStart, v) - step(tEnd, v);\n        vec2 windowSize = vec2(abs(tEnd-tStart),abs(tEnd-tStart));\n        float dist = sdRect(vec2(u,v), windowSize);\n        float s = sU * sV;\n   \n        float curColId = floor(UvScale.x / tStep);\n        float sCol = step(targetColId - 0.2, curColId) - step(targetColId + 0.2, curColId);\n        \n        float mLightP = mod(lightP, 2.);\n        float sRow = step(mLightP - 0.2, st.y) - step(mLightP, st.y);\n        if(ux == targetColId){\n            n =0.;\n        }\n        float timeP = min(0.95, abs ( sin(u_time/6.0) ) );\n        float hot = smoothstep(1.0,0.0,timeP);\n        vec3 color = mix(baseColor, getWindowColor(n,hot,brightColor,windowColor), s);\n        //vec3 color = mix(baseColor, getWindowColor(n,hot,brightColor,windowColor), 1.0);\n        float sFinal = s * sCol * sRow;\n        color += mix(baseColor, brightColor, sFinal*n);\n        // if (st.y<0.01){\n        // color = baseColor;\n        //  }\n        // if(head ==1.0) { // 顶部亮线\n        //     color = brightColor;\n        // }\n        color = color * v_lightWeight;\n\n        vec3 foggedColor = fog(color,fogColor,depth);\n         \n        gl_FragColor = vec4(foggedColor,1.0); \n     }\n   #else\n       gl_FragColor = vec4(v_color.xyz , v_color.w * u_opacity);\n   #endif\n \n}';