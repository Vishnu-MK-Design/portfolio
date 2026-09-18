/* ==================================================================
   Liquid — pointer-driven GPU fluid that warps the hero artwork
   Ported from Canvas UI "Liquid" (https://canvasui.dev/docs/components/liquid).

   Canvas UI's distortion/blend mode captures live HTML with the experimental
   "HTML-in-canvas" API, which shipping browsers don't have. Here the hero
   artwork (glow, big name, silhouette, vignette) is painted into a 2D canvas
   from the live DOM instead, uploaded as the content texture, and run through
   the original display shader — so distortion + blend work in every WebGL2
   browser. The DOM artwork stays in place (hidden) for layout, parallax and
   accessibility; cards and buttons remain normal, crisp, clickable HTML.
   ================================================================== */
(function () {
  'use strict';

  var DT = 1 / 60;
  function srgbToLinear(v) { return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }

  /* ---------- Shaders (from the original component) ---------- */
  var VERT = '#version 300 es\nprecision highp float;\nlayout(location = 0) in vec2 aPos;\nout vec2 vUv; out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;\nuniform vec2 texelSize;\nvoid main () {\n  vUv = aPos * 0.5 + 0.5;\n  vL = vUv - vec2(texelSize.x, 0.0); vR = vUv + vec2(texelSize.x, 0.0);\n  vT = vUv + vec2(0.0, texelSize.y); vB = vUv - vec2(0.0, texelSize.y);\n  gl_Position = vec4(aPos, 0.0, 1.0);\n}';
  var FRAG_DISPLAY = '#version 300 es\nprecision highp float;\nin vec2 vUv; out vec4 outColor;\nuniform sampler2D uContent; uniform sampler2D uFluid; uniform vec3 uColor;\nuniform float uDistortion; uniform float uIntensity; uniform float uBlend; uniform float uRainbow; uniform float uLight; uniform float uOverlay;\nvec3 toLinear (vec3 c) { return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c)); }\nvec3 toSrgb (vec3 c) { return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }\nvoid main () {\n  vec3 fluid = texture(uFluid, vUv).rgb;\n  float mag = length(fluid);\n  if (uOverlay > 0.5) {\n    // Light mode: this canvas sits ON TOP of the page and the browser composites\n    // it with CSS mix-blend-mode: lighten. It carries the bright accent red and\n    // its alpha, so it melts into the pale background and lights up red over\n    // photos, dark cards and other darker elements.\n    float maskO = texture(uContent, vec2(vUv.x, 1.0 - vUv.y)).r;\n    float ao = clamp(uBlend * 0.022 * mag, 0.0, 0.9) * maskO;\n    vec3 redO = toSrgb(clamp(uColor, 0.0, 1.0));\n    outColor = vec4(redO * ao, ao);\n    return;\n  }\n  vec2 uv = vUv - fluid.rg * uDistortion * 0.001;\n  vec4 content = texture(uContent, vec2(uv.x, 1.0 - uv.y));\n  content.rgb = toLinear(content.rgb);\n  vec3 rgb;\n  if (uLight > 0.5) {\n    // Light mode (footer): tint what is underneath toward the accent red, so it\n    // keeps the same red as the hero instead of washing out to white.\n    float a = clamp(uBlend * 0.016 * mag, 0.0, 0.92);\n    vec3 glass = content.rgb * mix(vec3(1.0), vec3(1.0, 0.05, 0.035), 0.95);\n    glass += vec3(1.0, 0.03, 0.02) * 0.22 * smoothstep(0.25, 0.9, a);\n    rgb = mix(content.rgb, glass, a);\n  } else {\n    // Dark: a soft, capped warm glow instead of a neon additive spike.\n    float a = clamp(uBlend * 0.014 * mag, 0.0, 0.85);\n    rgb = content.rgb + uColor * a * 1.05;\n  }\n  outColor = vec4(toSrgb(clamp(rgb, 0.0, 1.0)), content.a);\n}';
  var FRAG_SPLAT = '#version 300 es\nprecision highp float;\nin vec2 vUv; out vec4 outColor;\nuniform sampler2D uTarget; uniform float uAspect; uniform vec3 uColor; uniform vec2 uPoint; uniform float uRadius;\nvoid main () {\n  vec2 p = vUv - uPoint; p.x *= uAspect;\n  outColor = vec4(texture(uTarget, vUv).xyz + exp(-dot(p, p) / uRadius) * uColor, 1.0);\n}';
  var FRAG_ADVECT = '#version 300 es\nprecision highp float;\nin vec2 vUv; out vec4 outColor;\nuniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float uDt; uniform float uDissipation;\nvoid main () {\n  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * texelSize;\n  outColor = uDissipation * texture(uSource, coord); outColor.a = 1.0;\n}';
  var FRAG_CLEAR = '#version 300 es\nprecision highp float;\nin vec2 vUv; out vec4 outColor;\nuniform sampler2D uTexture; uniform float uValue;\nvoid main () { outColor = uValue * texture(uTexture, vUv); }';
  var FRAG_DIVERGENCE = '#version 300 es\nprecision highp float;\nin vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB; out vec4 outColor;\nuniform sampler2D uVelocity;\nvoid main () {\n  float L = texture(uVelocity, vL).x; float R = texture(uVelocity, vR).x;\n  float T = texture(uVelocity, vT).y; float B = texture(uVelocity, vB).y;\n  vec2 C = texture(uVelocity, vUv).xy;\n  if (vL.x < 0.0) { L = -C.x; } if (vR.x > 1.0) { R = -C.x; }\n  if (vT.y > 1.0) { T = -C.y; } if (vB.y < 0.0) { B = -C.y; }\n  outColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);\n}';
  var FRAG_CURL = '#version 300 es\nprecision highp float;\nin vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB; out vec4 outColor;\nuniform sampler2D uVelocity;\nvoid main () {\n  outColor = vec4(texture(uVelocity, vR).y - texture(uVelocity, vL).y - texture(uVelocity, vT).x + texture(uVelocity, vB).x, 0.0, 0.0, 1.0);\n}';
  var FRAG_VORTICITY = '#version 300 es\nprecision highp float;\nin vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB; out vec4 outColor;\nuniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float uCurlStrength; uniform float uDt;\nvoid main () {\n  float L = texture(uCurl, vL).x; float R = texture(uCurl, vR).x;\n  float T = texture(uCurl, vT).x; float B = texture(uCurl, vB).x; float C = texture(uCurl, vUv).x;\n  vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L)) * 0.5;\n  force /= length(force) + 1.0; force *= uCurlStrength * C; force.y *= -1.0;\n  outColor = vec4(texture(uVelocity, vUv).xy + force * uDt, 0.0, 1.0);\n}';
  var FRAG_PRESSURE = '#version 300 es\nprecision highp float;\nin vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB; out vec4 outColor;\nuniform sampler2D uPressure; uniform sampler2D uDivergence;\nvoid main () {\n  outColor = vec4((texture(uPressure, vL).x + texture(uPressure, vR).x + texture(uPressure, vB).x + texture(uPressure, vT).x - texture(uDivergence, vUv).x) * 0.25, 0.0, 0.0, 1.0);\n}';
  var FRAG_GRADIENT = '#version 300 es\nprecision highp float;\nin vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB; out vec4 outColor;\nuniform sampler2D uPressure; uniform sampler2D uVelocity;\nvoid main () {\n  vec2 v = texture(uVelocity, vUv).xy - vec2(texture(uPressure, vR).x - texture(uPressure, vL).x, texture(uPressure, vT).x - texture(uPressure, vB).x);\n  outColor = vec4(v, 0.0, 1.0);\n}';

  /* ---------- Painter: redraws the hero artwork from the live DOM ---------- */
  function createHeroPainter(hero, frame) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var glow = hero.querySelector('.hero__glow');
    var ghost = hero.querySelector('.hero__ghost');
    var photo = hero.querySelector('.hero__photo');
    var ghostText = ghost ? ghost.firstChild : null;
    var lastSig = '';

    function num(v, d) { var n = parseFloat(v); return isNaN(n) ? d : n; }

    return {
      canvas: canvas,
      // Returns true when the artwork changed (needs a texture upload)
      paint: function (force) {
        var hr = frame.getBoundingClientRect();
        var scale = Math.min(window.devicePixelRatio || 1, 1.5);
        var W = Math.max(1, Math.round(hr.width * scale)), H = Math.max(1, Math.round(hr.height * scale));
        var gr = glow.getBoundingClientRect(), gs = getComputedStyle(glow);
        var range = document.createRange(); range.selectNodeContents(ghostText);
        var tr = range.getBoundingClientRect(), ts = getComputedStyle(ghost);
        var pr = photo.getBoundingClientRect(), ps = getComputedStyle(photo);
        var sig = [W, H, gr.left, gr.top, gr.width, gs.opacity, tr.left, tr.top, tr.width, ts.opacity, pr.left, pr.top, pr.width, ps.opacity, photo.complete]
          .map(function (v) { return typeof v === 'number' ? Math.round(v * 10) : v; }).join('|');
        if (!force && sig === lastSig) return false;
        lastSig = sig;

        if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
        ctx.setTransform(scale, 0, 0, scale, -hr.left * scale, -hr.top * scale);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#0a0a0b';
        ctx.fillRect(hr.left, hr.top, hr.width, hr.height);

        // warm glow
        var go = num(gs.opacity, 1);
        if (go > 0 && gr.width > 0) {
          var cx = gr.left + gr.width / 2, cy = gr.top + gr.height / 2, rad = gr.width / 2;
          var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
          g.addColorStop(0, 'rgba(255,90,60,' + (0.26 * go) + ')');
          g.addColorStop(0.42, 'rgba(255,59,48,' + (0.08 * go) + ')');
          g.addColorStop(0.68, 'rgba(255,59,48,0)');
          ctx.fillStyle = g;
          ctx.fillRect(gr.left, gr.top, gr.width, gr.height);
        }

        // big name — sized to exactly match the DOM text box (incl. transforms)
        var to = num(ts.opacity, 1);
        if (to > 0 && tr.width > 0) {
          var fs = num(ts.fontSize, 100);
          ctx.font = ts.fontWeight + ' ' + fs + 'px ' + ts.fontFamily;
          if ('letterSpacing' in ctx) ctx.letterSpacing = ts.letterSpacing;
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'left';
          var text = ghostText.textContent.toUpperCase();
          var measured = ctx.measureText(text).width || 1;
          var sx = tr.width / measured;
          ctx.save();
          ctx.globalAlpha = to;
          ctx.translate(tr.left, tr.top + tr.height / 2);
          ctx.scale(sx, sx);
          // gradient in pre-scale space so it spans the glyph height
          var tg2 = ctx.createLinearGradient(0, -tr.height / 2 / sx, 0, tr.height / 2 / sx);
          tg2.addColorStop(0, '#f6f6f8'); tg2.addColorStop(0.36, '#cfcfd4');
          tg2.addColorStop(0.70, '#85858d'); tg2.addColorStop(1, '#3d3d43');
          ctx.fillStyle = tg2;
          ctx.fillText(text, 0, 0);
          ctx.restore();
          if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
        }

        // The silhouette and vignette stay as DOM layers above this canvas,
        // so the fluid only moves between the big name and the portrait.
        return true;
      }
    };
  }

  /* ---------- Fluid engine ---------- */
  function createLiquid(output, config, painter) {
    var gl = output.getContext('webgl2', { alpha: true, depth: false, stencil: false, antialias: false, premultipliedAlpha: true });
    if (!gl || gl.isContextLost()) return null;
    if (!(gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'))) return null;
    var filtering = gl.getExtension('OES_texture_float_linear') ? gl.LINEAR : gl.NEAREST;

    function compile(type, src) {
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error('Liquid shader error:', gl.getShaderInfoLog(s));
      return s;
    }
    var vs = compile(gl.VERTEX_SHADER, VERT);
    function prog(frag) {
      var p = gl.createProgram();
      gl.attachShader(p, vs); gl.attachShader(p, compile(gl.FRAGMENT_SHADER, frag)); gl.linkProgram(p);
      var u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (var i = 0; i < n; i++) { var info = gl.getActiveUniform(p, i); u[info.name] = gl.getUniformLocation(p, info.name); }
      return { program: p, uniforms: u };
    }
    var display = prog(FRAG_DISPLAY), splatP = prog(FRAG_SPLAT), advect = prog(FRAG_ADVECT), clear = prog(FRAG_CLEAR),
        divergence = prog(FRAG_DIVERGENCE), curl = prog(FRAG_CURL), vorticity = prog(FRAG_VORTICITY),
        pressure = prog(FRAG_PRESSURE), gradient = prog(FRAG_GRADIENT);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    function target(size, internal, format, filter) {
      var t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internal, size, size, 0, format, gl.HALF_FLOAT, null);
      var f = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      gl.viewport(0, 0, size, size); gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
      return { fbo: f, texture: t, width: size, height: size };
    }
    function dbl(size, internal, format, filter) {
      var r = target(size, internal, format, filter), w = target(size, internal, format, filter);
      return { get read() { return r; }, get write() { return w; }, swap: function () { var x = r; r = w; w = x; } };
    }
    var T = {
      velocity: dbl(config.simResolution, gl.RG16F, gl.RG, filtering),
      dye: dbl(config.dyeResolution, gl.RGBA16F, gl.RGBA, filtering),
      divergence: target(config.simResolution, gl.R16F, gl.RED, gl.NEAREST),
      curl: target(config.simResolution, gl.R16F, gl.RED, gl.NEAREST),
      pressure: dbl(config.simResolution, gl.R16F, gl.RED, gl.NEAREST)
    };

    var contentTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, contentTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([10, 10, 11, 255]));

    var contentNeedsRender = true;
    function uploadContent(force) {
      if (!painter.paint(force)) return false;
      gl.bindTexture(gl.TEXTURE_2D, contentTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, painter.canvas);
      contentNeedsRender = true;
      return true;
    }

    var texelX = 0, texelY = 0;
    function syncSize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(1, Math.round(output.clientWidth * dpr)), h = Math.max(1, Math.round(output.clientHeight * dpr));
      if (output.width !== w || output.height !== h) { output.width = w; output.height = h; }
      texelX = 1 / (config.simResolution * (Math.max(output.clientWidth, 1) / (Math.max(output.clientHeight, 1) + 400)));
      texelY = 1 / config.simResolution;
    }
    syncSize();

    function blit(t) {
      if (t) { gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo); gl.viewport(0, 0, t.width, t.height); }
      else { gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, output.width, output.height); }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    function tex(t, unit) { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t); return unit; }

    /* The splat radius is in the canvas's own normalised space, so the same
       number looks bigger on a short canvas than a tall one. Scale it against a
       fixed reference height so the trail is the same physical size everywhere. */
    function radius() {
      var base = (window.innerWidth < 560 ? config.radiusMobile : config.radius) / 100;
      return base * (820 / Math.max(output.clientHeight, 1));
    }

    function applySplat(x, y, dx, dy) {
      gl.useProgram(splatP.program);
      gl.uniform1i(splatP.uniforms.uTarget, tex(T.velocity.read.texture, 0));
      gl.uniform1f(splatP.uniforms.uAspect, output.clientWidth / Math.max(output.clientHeight, 1));
      gl.uniform2f(splatP.uniforms.uPoint, x, y);
      gl.uniform3f(splatP.uniforms.uColor, dx, dy, 10);
      gl.uniform1f(splatP.uniforms.uRadius, radius());
      blit(T.velocity.write); T.velocity.swap();
      gl.uniform1i(splatP.uniforms.uTarget, tex(T.dye.read.texture, 0));
      blit(T.dye.write); T.dye.swap();
    }

    function step(delta) {
      gl.disable(gl.BLEND);
      gl.useProgram(curl.program); gl.uniform2f(curl.uniforms.texelSize, texelX, texelY);
      gl.uniform1i(curl.uniforms.uVelocity, tex(T.velocity.read.texture, 0)); blit(T.curl);

      gl.useProgram(vorticity.program); gl.uniform2f(vorticity.uniforms.texelSize, texelX, texelY);
      gl.uniform1i(vorticity.uniforms.uVelocity, tex(T.velocity.read.texture, 0));
      gl.uniform1i(vorticity.uniforms.uCurl, tex(T.curl.texture, 1));
      gl.uniform1f(vorticity.uniforms.uCurlStrength, config.curl); gl.uniform1f(vorticity.uniforms.uDt, DT);
      blit(T.velocity.write); T.velocity.swap();

      gl.useProgram(divergence.program); gl.uniform2f(divergence.uniforms.texelSize, texelX, texelY);
      gl.uniform1i(divergence.uniforms.uVelocity, tex(T.velocity.read.texture, 0)); blit(T.divergence);

      gl.useProgram(clear.program); gl.uniform1i(clear.uniforms.uTexture, tex(T.pressure.read.texture, 0));
      gl.uniform1f(clear.uniforms.uValue, Math.pow(config.pressure, delta * 60));
      blit(T.pressure.write); T.pressure.swap();

      gl.useProgram(pressure.program); gl.uniform2f(pressure.uniforms.texelSize, texelX, texelY);
      gl.uniform1i(pressure.uniforms.uDivergence, tex(T.divergence.texture, 0));
      for (var i = 0; i < config.pressureIterations; i++) {
        gl.uniform1i(pressure.uniforms.uPressure, tex(T.pressure.read.texture, 1));
        blit(T.pressure.write); T.pressure.swap();
      }

      gl.useProgram(gradient.program); gl.uniform2f(gradient.uniforms.texelSize, texelX, texelY);
      gl.uniform1i(gradient.uniforms.uPressure, tex(T.pressure.read.texture, 0));
      gl.uniform1i(gradient.uniforms.uVelocity, tex(T.velocity.read.texture, 1));
      blit(T.velocity.write); T.velocity.swap();

      gl.useProgram(advect.program); gl.uniform2f(advect.uniforms.texelSize, texelX, texelY);
      gl.uniform1i(advect.uniforms.uVelocity, tex(T.velocity.read.texture, 0));
      gl.uniform1i(advect.uniforms.uSource, tex(T.velocity.read.texture, 0));
      gl.uniform1f(advect.uniforms.uDt, DT);
      gl.uniform1f(advect.uniforms.uDissipation, Math.pow(config.velocityDissipation, delta * 60));
      blit(T.velocity.write); T.velocity.swap();

      gl.uniform1i(advect.uniforms.uVelocity, tex(T.velocity.read.texture, 0));
      gl.uniform1i(advect.uniforms.uSource, tex(T.dye.read.texture, 1));
      gl.uniform1f(advect.uniforms.uDissipation, Math.pow(config.densityDissipation, delta * 60));
      blit(T.dye.write); T.dye.swap();
    }

    function render() {
      gl.useProgram(display.program);
      gl.uniform1i(display.uniforms.uContent, tex(contentTexture, 0));
      gl.uniform1i(display.uniforms.uFluid, tex(T.dye.read.texture, 1));
      gl.uniform3f(display.uniforms.uColor, srgbToLinear(config.color[0]), srgbToLinear(config.color[1]), srgbToLinear(config.color[2]));
      gl.uniform1f(display.uniforms.uDistortion, config.distortion);
      gl.uniform1f(display.uniforms.uIntensity, config.intensity);
      gl.uniform1f(display.uniforms.uBlend, config.blend);
      gl.uniform1f(display.uniforms.uRainbow, config.rainbow ? 1 : 0);
      var light = painter.isLight && painter.isLight() ? 1 : 0;
      gl.uniform1f(display.uniforms.uLight, light);
      // Page canvas in light mode: draw as a transparent overlay above the page
      // instead of a backdrop behind it (see .page-liquid in styles.css).
      gl.uniform1f(display.uniforms.uOverlay, painter.overlay && light ? 1 : 0);
      blit(null);
    }

    /* Loop: runs while the fluid is alive or the artwork is moving
       (entrance, parallax); sleeps otherwise; pauses off-screen. */
    var queued = [], raf = 0, lastTime = performance.now(), running = false, visible = true;
    var fluidUntil = 0, busyUntil = performance.now() + 2600; // entrance animation window
    function idleDelayMs() { var d = Math.min(config.densityDissipation, 0.999); return (Math.log(1e-7) / Math.log(d) / 60) * 1000; }

    function frame(now) {
      if (!visible) { running = false; return; }
      var delta = Math.min((now - lastTime) / 1000, 1 / 30);
      lastTime = now;
      if (queued.length) {
        fluidUntil = now + idleDelayMs();
        while (queued.length) { var s = queued.pop(); applySplat(s[0], s[1], s[2], s[3]); }
      }
      // Animated painters (video backgrounds) repaint at ~30fps; others on change
      var changed = false;
      if (!painter.animated || now - lastUpload >= 33) {
        changed = uploadContent(false);
        if (changed) lastUpload = now;
      }
      if (changed) busyUntil = Math.max(busyUntil, now + 300);
      var fluidAlive = now < fluidUntil;
      if (fluidAlive) step(delta);
      if (changed || fluidAlive || contentNeedsRender) {
        render();
        contentNeedsRender = false;
      }
      if (!painter.animated && !fluidAlive && now >= busyUntil) { running = false; return; }
      raf = requestAnimationFrame(frame);
    }
    var lastUpload = 0;
    function start(extraMs) {
      if (extraMs) busyUntil = Math.max(busyUntil, performance.now() + extraMs);
      if (running || !visible) return;
      running = true; lastTime = performance.now();
      raf = requestAnimationFrame(frame);
    }

    var rect = output.getBoundingClientRect();
    function refreshRect() { rect = output.getBoundingClientRect(); }
    window.addEventListener('scroll', function () { refreshRect(); start(200); }, { passive: true });
    window.addEventListener('resize', function () { refreshRect(); start(300); });
    // The hero entrance is paused behind the loader. Wake the painter for
    // its full animation when the curtain clears, without pointer input.
    window.addEventListener('loader:done', function () {
      refreshRect();
      uploadContent(true);
      start(2600);
    });

    var pointers = new Map();
    window.addEventListener('pointermove', function (e) {
      var px = e.clientX - rect.left, py = e.clientY - rect.top;
      if (px < 0 || px > rect.width || py < 0 || py > rect.height) { pointers.delete(e.pointerId); return; }
      var prev = pointers.get(e.pointerId);
      pointers.set(e.pointerId, { x: px, y: py });
      start(700); // parallax easing keeps moving briefly after the pointer
      if (!prev) return;
      queued.push([px / rect.width, 1 - py / rect.height, (px - prev.x) * config.force, -(py - prev.y) * config.force]);
    }, { passive: true });
    window.addEventListener('pointerdown', function (e) {
      refreshRect();
      var x = e.clientX - rect.left, y = e.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
      pointers.set(e.pointerId, { x: x, y: y });
      queued.push([x / rect.width, 1 - y / rect.height, 1, 1]);
      start();
    }, { passive: true });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (t) {
      window.addEventListener(t, function (e) { pointers.delete(e.pointerId); });
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { uploadContent(true); start(300); });

    new ResizeObserver(function () { syncSize(); refreshRect(); uploadContent(true); start(300); }).observe(output);
    new IntersectionObserver(function (entries) {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) { refreshRect(); start(300); }
    }).observe(output);

    uploadContent(true);
    start();
    return true;
  }

  /* ---------- Painter: footer (theme-aware video, scrim, wordmark) ---------- */
  function createFooterPainter(footer, frame) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var video = footer.querySelector('.footer__media video');
    var lastSig = '';

    function rgba(hex, a) {
      var n = parseInt(hex.slice(1), 16);
      return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
    }

    return {
      canvas: canvas,
      animated: true,
      isLight: function () { return document.documentElement.dataset.theme === 'light'; },
      paint: function (force) {
        var fr = frame.getBoundingClientRect();
        var light = document.documentElement.dataset.theme === 'light';
        var scale = Math.min(window.devicePixelRatio || 1, 1.25);
        var W = Math.max(1, Math.round(fr.width * scale)), H = Math.max(1, Math.round(fr.height * scale));
        var vs = video ? getComputedStyle(video) : null;
        var vOp = vs ? parseFloat(vs.opacity) || 0 : 0;
        var vReady = video && video.readyState >= 2 && vOp > 0;
        var sig = [W, H, light, vReady ? Math.round(video.currentTime * 30) : -1, Math.round(vOp * 100)].join('|');
        if (!force && sig === lastSig) return false;
        lastSig = sig;

        if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
        var w = fr.width, h = fr.height;
        var bg = light ? '#f6f4f0' : '#0a0a0b';

        // base + warm radial light (matches .footer__media background)
        ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
        ctx.save();
        ctx.translate(w * 0.7, h); ctx.scale(1, (h * 0.9) / (w * 0.8));
        var rg = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.8);
        rg.addColorStop(0, light ? 'rgba(255,59,48,.10)' : 'rgba(255,59,48,.22)');
        rg.addColorStop(0.7, 'rgba(255,59,48,0)');
        ctx.fillStyle = rg; ctx.fillRect(-w, -h * 3, w * 2, h * 6);
        ctx.restore();

        // background video, cover-fit (inverted + multiplied in light mode, like the CSS)
        if (vReady) {
          var vw = video.videoWidth || 16, vh = video.videoHeight || 9;
          var s = Math.max(w / vw, h / vh), dw = vw * s, dh = vh * s;
          ctx.save();
          ctx.globalAlpha = vOp;
          if (light) { ctx.filter = 'invert(1) hue-rotate(180deg) saturate(1.15)'; ctx.globalCompositeOperation = 'multiply'; }
          ctx.drawImage(video, (w - dw) / 2, (h - dh) / 2, dw, dh);
          ctx.restore();
        }

        // scrim (matches .footer::before)
        var sg = ctx.createLinearGradient(0, 0, 0, h);
        sg.addColorStop(0, rgba(bg, 1)); sg.addColorStop(0.38, rgba(bg, 0.72)); sg.addColorStop(1, rgba(bg, 0.45));
        ctx.fillStyle = sg; ctx.fillRect(0, 0, w, h);

        // The wordmark stays a crisp DOM layer above this canvas (matches the
        // hero, where the fluid only warps the background — glow/video/scrim
        // here — and the foreground stays sharp and readable).
        return true;
      }
    };
  }

  /* ---------- Painter: page background ----------
     Dark mode: paints the page's flat background colour, which the fluid tints
     and ripples behind the content (the canvas sits under the page).
     Light mode: the canvas sits on top instead, so this paints a MASK — white
     where the overlay may show, black over the hero and footer, which run their
     own effects and are excluded. Either way it is a flat, cheap paint, so it
     renders small and is scaled up by the GPU. */
  function createBackgroundPainter(target, excludeSel) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var lastSig = '';
    var FEATHER = 90; // px of soft fade at the edge of an excluded block
    return {
      canvas: canvas,
      animated: false,
      overlay: true, // in light mode this canvas is composited over the page
      isLight: function () { return document.documentElement.dataset.theme === 'light'; },
      paint: function (force) {
        var w = Math.max(target.clientWidth, 1), h = Math.max(target.clientHeight, 1);
        var light = document.documentElement.dataset.theme === 'light';
        var W = 256, H = Math.max(1, Math.round(256 * h / w));
        var blocks = [];
        if (light) {
          document.querySelectorAll(excludeSel).forEach(function (el) {
            var r = el.getBoundingClientRect();
            if (r.bottom <= 0 || r.top >= h) return;
            blocks.push([Math.round(r.top / 8) * 8, Math.round(r.bottom / 8) * 8]);
          });
        }
        var sig = [W, H, light, blocks.join(',')].join('|');
        if (!force && sig === lastSig) return false;
        lastSig = sig;
        if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
        var sy = H / h;
        ctx.setTransform(W / w, 0, 0, sy, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = light ? '#ffffff' : '#0a0a0b';
        ctx.fillRect(0, 0, w, h);
        for (var i = 0; i < blocks.length; i++) {
          var top = blocks[i][0], bottom = blocks[i][1];
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, top, w, bottom - top);
          // feather the two edges so the overlay fades out instead of cutting
          var gTop = ctx.createLinearGradient(0, top - FEATHER, 0, top);
          gTop.addColorStop(0, 'rgba(0,0,0,0)'); gTop.addColorStop(1, 'rgba(0,0,0,1)');
          ctx.fillStyle = gTop; ctx.fillRect(0, top - FEATHER, w, FEATHER);
          var gBot = ctx.createLinearGradient(0, bottom, 0, bottom + FEATHER);
          gBot.addColorStop(0, 'rgba(0,0,0,1)'); gBot.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = gBot; ctx.fillRect(0, bottom, w, FEATHER);
        }
        return true;
      }
    };
  }

  /* ---------- Mount ---------- */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SETTINGS = {
    force: 1.1,
    radius: 0.24,         // Canvas UI playground used 0.3
    radiusMobile: 0.15,
    curl: 1.9,
    pressureIterations: 4,
    pressure: 0.8,
    intensity: 2,
    distortion: 0.5,
    blend: 5,
    densityDissipation: 0.83,      // faster fade (was 0.885)
    velocityDissipation: 0.98,     // swirl settles sooner (was 1)
    simResolution: 128,
    dyeResolution: 512,
    color: [1, 0.2196, 0],
    rainbow: false
  };
  // Page background: same fluid and same trail size, gentler blend so body text
  // stays easy to read.
  var PAGE_SETTINGS = Object.assign({}, SETTINGS, { blend: 3.5 });

  document.querySelectorAll('canvas[data-liquid]').forEach(function (canvas) {
    var kind = canvas.getAttribute('data-liquid');
    var host = kind === 'footer' ? canvas.closest('.footer') : canvas.closest('.hero');
    if (!host) { canvas.remove(); return; }
    var painter = kind === 'footer' ? createFooterPainter(host, canvas) : createHeroPainter(host, canvas);
    var ok = createLiquid(canvas, SETTINGS, painter);
    if (ok) host.classList.add('has-liquid');
    else canvas.remove();
  });

  // One continuous fluid behind the whole page, so the trail is the same size
  // everywhere and carries on unbroken from section to section. Mounted here
  // (not in the HTML) so it applies to every page without touching templates.
  (function mountPageLiquid() {
    var canvas = document.createElement('canvas');
    canvas.className = 'page-liquid';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);
    var painter = createBackgroundPainter(document.documentElement, '.hero, .footer');
    var ok = createLiquid(canvas, PAGE_SETTINGS, painter);
    if (ok) document.documentElement.classList.add('has-page-liquid');
    else canvas.remove();
  })();

  /* Switching theme changes what every canvas should be painting (and whether
     the page canvas is a backdrop or an overlay). Idle instances have parked
     their render loop, so nudge them all to repaint. */
  new MutationObserver(function () {
    window.dispatchEvent(new Event('resize'));
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
