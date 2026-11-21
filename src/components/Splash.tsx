/**
 * Loading screen: the Hopper lockup animating in, ported from the mobile
 * app's splash (hopperafrica.mobileapp lib/screens/onboarding/splash_screen.dart,
 * itself the end card of the launch film). The six dots gather in from the
 * centre, the three arcs draw, then the mark slides left and the wordmark
 * wipes out from behind it. Timings, springs and geometry are the app's
 * constants (beats at 130 BPM, film stage px), so the two stay in step.
 *
 * It's a plain inline script, not a React component, so it paints with the
 * very first frame of HTML, before any JavaScript bundle has loaded. The
 * overlay is appended to <html> beside <body>, outside the tree React
 * hydrates, so removing it can't upset hydration.
 *
 * It lifts once the animation has played AND the page has loaded (capped at
 * 5s), then fades out and fires `hop:splash-done`. While it's up, <html> has
 * data-splash="on": index.css holds the hero's entrance animations and stops
 * the page scrolling, and the hero phones wait for the event (lib/splash.ts),
 * so the hero plays its entrance as the splash lifts rather than hidden
 * behind it. Shown once per tab session; reduced motion gets the finished
 * lockup without the animation.
 */
export const Splash = () => <script dangerouslySetInnerHTML={{ __html: SPLASH_JS }} />;

const SPLASH_JS = /* js */ `(function () {
  var html = document.documentElement;
  try {
    if (sessionStorage.getItem('hop-splash')) return;
    sessionStorage.setItem('hop-splash', '1');
  } catch (e) {}
  html.setAttribute('data-splash', 'on');

  var css = getComputedStyle(html);
  var bg = css.getPropertyValue('--color-background').trim() || '#ffffff';
  var ink = css.getPropertyValue('--color-foreground').trim() || '#232629';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var root = document.createElement('div');
  root.id = 'hop-splash';
  root.setAttribute('role', 'status');
  root.setAttribute('aria-label', 'Loading Hopper');
  root.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:' + bg + ';transition:opacity .55s ease';
  var cv = document.createElement('canvas');
  cv.style.cssText = 'display:block;width:100%;height:100%;transition:transform .7s cubic-bezier(.16,1,.3,1)';
  root.appendChild(cv);
  html.appendChild(root);
  var ctx = cv.getContext('2d');

  // ── Time (film: 130 BPM; the end card runs from beat 44) ──
  var BEAT = 60 / 130, START = 44, END = 48.6;
  function bt(n) { return n * BEAT; }
  function clamp(v) { return Math.min(1, Math.max(0, v)); }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function prog(t, a, b) { return clamp((t - a) / (b - a)); }
  function inOutCubic(p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  // Closed-form spring step response (motion/lib/motion.js \`spring\`).
  function spring(t, response, damping) {
    if (t <= 0) return 0;
    var w0 = 2 * Math.PI / response;
    if (damping < 1) {
      var wd = w0 * Math.sqrt(1 - damping * damping), e = Math.exp(-damping * w0 * t);
      return 1 - e * (Math.cos(wd * t) + (damping * w0 / wd) * Math.sin(wd * t));
    }
    return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  }
  function sp(t, start, response, damping) { return spring(t - start, response || 0.5, damping || 0.8); }

  // ── Mark geometry (viewBox 0 0 2036 2356) ──
  var ARCS = [
    [1475, 169, 1011, 870, 171, 880],
    [203, 1307, 1033, 1429, 1401, 2184],
    [1863, 472, 1422, 1186, 1764, 1954]
  ];
  var DOTS = [[1475, 169], [171, 880], [203, 1307], [1401, 2184], [1863, 472], [1764, 1954]];
  var MC = [1018, 1178];
  // Each arc as a polyline with running lengths, so it can draw by length.
  var POLYS = ARCS.map(function (a) {
    var pts = [], lens = [0], n = 64;
    for (var i = 0; i <= n; i++) {
      var u = i / n, v = 1 - u;
      pts.push([v * v * a[0] + 2 * v * u * a[2] + u * u * a[4], v * v * a[1] + 2 * v * u * a[3] + u * u * a[5]]);
      if (i) lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    }
    return { pts: pts, lens: lens, total: lens[n] };
  });

  // ── Layout (film stage px, origin at the card centre) ──
  var S = 0.19, LOCK_LEFT = -4096 * S / 2, LOCK_TOP = -181;
  var MARK_W = 717 * S, MARK_H = 830 * S;
  var MARK_FX = LOCK_LEFT + MARK_W / 2, MARK_FY = LOCK_TOP + 10 * S + MARK_H / 2;
  var WORD_LEFT = LOCK_LEFT + 1065 * S, WORD_W = (4096 - 1065) * S;
  var CARD_W = 4096 * S, LOCK_H = 1388 * S, LOCK_CY = LOCK_TOP + LOCK_H / 2;

  // The lockup image, recoloured to the ink once it arrives.
  var word = null;
  var img = new Image();
  img.onload = function () {
    var c = document.createElement('canvas');
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    var x = c.getContext('2d');
    x.drawImage(img, 0, 0);
    x.globalCompositeOperation = 'source-in';
    x.fillStyle = ink;
    x.fillRect(0, 0, c.width, c.height);
    word = c;
    begin();
  };
  img.onerror = begin;
  img.src = '/splash-lockup.webp';

  var W = 0, H = 0, now = bt(START);
  function size() {
    var dpr = Math.min(window.devicePixelRatio || 1, 3);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  addEventListener('resize', function () { size(); draw(now); });

  function paintMark(cx, cy, s, t, b) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(s * MARK_W / 2036, s * MARK_H / 2356);
    ctx.translate(-2036 / 2, -2356 / 2);
    ctx.strokeStyle = ink; ctx.fillStyle = ink;
    ctx.lineWidth = 167; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (var i = 0; i < POLYS.length; i++) {
      var q = inOutCubic(prog(b, 44.5 + i * 0.15, 45.4 + i * 0.15));
      if (q <= 0) continue;
      var p = POLYS[i], want = p.total * q;
      ctx.beginPath();
      ctx.moveTo(p.pts[0][0], p.pts[0][1]);
      for (var j = 1; j < p.pts.length; j++) {
        if (p.lens[j] >= want) {
          var f = (want - p.lens[j - 1]) / (p.lens[j] - p.lens[j - 1] || 1);
          ctx.lineTo(lerp(p.pts[j - 1][0], p.pts[j][0], f), lerp(p.pts[j - 1][1], p.pts[j][1], f));
          break;
        }
        ctx.lineTo(p.pts[j][0], p.pts[j][1]);
      }
      ctx.stroke();
    }
    for (var k = 0; k < DOTS.length; k++) {
      var d = sp(t, bt(44.1) + k * 0.035, 0.5, 0.62);
      var r = 169 * clamp(d * 1.3);
      if (r <= 0) continue;
      ctx.beginPath();
      ctx.arc(lerp(MC[0], DOTS[k][0], d), lerp(MC[1], DOTS[k][1], d), r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function draw(t) {
    var b = t / BEAT;
    ctx.clearRect(0, 0, W, H);
    // The lockup takes ~78% of the width on phones, capped on wide screens.
    var k = Math.min(W * 0.78 / CARD_W, 0.62);
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.scale(k, k);
    // Mark: dots gather, arcs draw, then it slides left as the lockup centres.
    var pw = sp(t, bt(45.6), 0.65, 0.9);
    ctx.translate(0, -LOCK_CY * pw);
    var mx = lerp(0, MARK_FX, pw), my = lerp(0, MARK_FY, pw);
    paintMark(mx, my, lerp(0.35, 1, sp(t, bt(44.15), 0.5, 0.7)), t, b);
    // Wordmark wipes out from behind the mark.
    if (pw > 0.001 && word) {
      var markRight = mx + MARK_W / 2;
      var wx = lerp(markRight - WORD_W * 0.6, WORD_LEFT, pw);
      var clipLeft = Math.max(wx, markRight + 18);
      ctx.save();
      ctx.beginPath();
      ctx.rect(clipLeft, LOCK_TOP, wx + WORD_W - clipLeft, LOCK_H);
      ctx.clip();
      ctx.drawImage(word, wx - 1065 * S, LOCK_TOP, CARD_W, LOCK_H);
      ctx.restore();
    }
    ctx.restore();
  }

  var started = false, played = false, loaded = document.readyState === 'complete', done = false;
  if (!loaded) addEventListener('load', function () { loaded = true; maybeFinish(); });
  // Never hold the page longer than this, however slow the load.
  setTimeout(finish, 5000);
  // Wait for the lockup image (preloaded in layout.tsx) so the wordmark is
  // there when it wipes in; if it's very slow, start with the mark anyway.
  setTimeout(begin, 1500);

  function begin() {
    if (started) return;
    started = true;
    if (reduce) {
      now = bt(END); draw(now);
      setTimeout(function () { played = true; maybeFinish(); }, 600);
      return;
    }
    var t0 = performance.now();
    (function frame(ts) {
      if (done) return;
      now = bt(START) + (ts - t0) / 1000;
      if (now >= bt(END)) { now = bt(END); draw(now); played = true; maybeFinish(); return; }
      draw(now);
      requestAnimationFrame(frame);
    })(t0);
  }
  // A late lockup image still gets drawn into a finished frame.
  img.addEventListener('load', function () { if (played) draw(now); });

  function maybeFinish() { if (played && loaded) finish(); }
  function finish() {
    if (done) return;
    done = true;
    html.setAttribute('data-splash', 'done');
    dispatchEvent(new Event('hop:splash-done'));
    root.style.opacity = '0';
    if (!reduce) cv.style.transform = 'scale(1.04)';
    setTimeout(function () { root.remove(); }, 700);
  }
})();`;
