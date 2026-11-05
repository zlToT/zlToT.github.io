// ============ 公共脚本：防开发者工具 + 音效库 ============
// 调试模式：URL 带 ?debug 或 ?debug=1 时不禁用 F12/右键（方便查看元素、调试）
(function () {
  var isDebug = /[?&]debug(=|&|$)/.test(location.search);
  if (!isDebug) {
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    document.addEventListener('keydown', function (e) {
      var k = e.key;
      if (
        k === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].indexOf(k.toUpperCase()) !== -1) ||
        (e.ctrlKey && k.toLowerCase() === 'u')
      ) {
        e.preventDefault();
      }
    });
  }
})();

// 公共音效库（Web Audio 合成，无外部文件，window.SFX）
(function () {
  var ctx = null;
  function ac() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    if (ctx && ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }
  function tone(freq, dur, type, vol, delay) {
    var c = ac();
    if (!c) return;
    try {
      var t = c.currentTime + (delay || 0);
      var o = c.createOscillator();
      var g = c.createGain();
      o.type = type || 'sine';
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(vol || 0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(c.destination);
      o.start(t); o.stop(t + dur + 0.02);
    } catch (e) {}
  }
  window.SFX = {
    eat:   function () { tone(880, 0.08, 'square', 0.12); tone(1320, 0.1, 'square', 0.1, 0.06); },
    hit:   function () { tone(620, 0.06, 'triangle', 0.2); tone(930, 0.08, 'triangle', 0.15, 0.05); },
    merge: function () { tone(520, 0.08, 'sine', 0.18); tone(780, 0.12, 'sine', 0.14, 0.05); },
    flip:  function () { tone(320, 0.05, 'sine', 0.12); },
    match: function () { tone(660, 0.08, 'sine', 0.16); tone(990, 0.1, 'sine', 0.13, 0.06); },
    clear: function () { tone(440, 0.06, 'square', 0.14); tone(660, 0.06, 'square', 0.13, 0.05); tone(880, 0.12, 'square', 0.11, 0.1); },
    over:  function () { tone(320, 0.15, 'sawtooth', 0.1); tone(210, 0.22, 'sawtooth', 0.08, 0.12); }
  };
})();
