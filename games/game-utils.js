// ============================================================
// 小游戏公共工具（ES Module）
// 用法：
//   import { initGamePage } from './game-utils.js';
//   const { bgm } = initGamePage({ bgmSrc: '../music/bgm_xxx.mp3', emojis: ['🌿','🐑'] });
//   // 开始时 bgm.restart()
// ============================================================

// 注入基础页面样式（深色渐变底 + 字体 + 返回按钮样式）
var baseStyleInjected = false;
function injectBaseStyles() {
  if (baseStyleInjected) return;
  baseStyleInjected = true;
  var s = document.createElement('style');
  s.textContent = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(160deg, #0a0c10 0%, #101613 50%, #0a0c10 100%);
      background-attachment: fixed;
      color: #e6ede9;
      padding: 24px 16px 48px;
    }
    .back-btn {
      padding: 10px 26px;
      border: none;
      border-radius: 60px;
      background: #facc15;
      color: #1a1c2c;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.4);
      transition: transform .15s, box-shadow .15s;
    }
    .back-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(250,204,21,.3); }
  `;
  document.head.appendChild(s);
}

// 在页面底部居中创建「⬅ 返回」按钮
export function createBackButton() {
  injectBaseStyles();
  var bar = document.createElement('div');
  bar.style.cssText = 'display:flex;justify-content:center;margin-top:18px;';
  var btn = document.createElement('button');
  btn.className = 'back-btn';
  btn.textContent = '⬅ 返回';
  btn.addEventListener('click', function () { location.href = '../index.html#games'; });
  bar.appendChild(btn);
  document.body.appendChild(bar);
  return btn;
}

// 飘浮 emoji 背景（从下往上飘）
export function createFloatingBackground(emojis, count) {
  var bg = document.createElement('div');
  bg.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;';
  var n = count || 12;
  for (var i = 0; i < n; i++) {
    var s = document.createElement('span');
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.cssText = 'position:absolute;bottom:-40px;opacity:0.15;animation:gfUp linear infinite;';
    s.style.left = (Math.random() * 92 + 2) + '%';
    s.style.fontSize = (Math.random() * 18 + 14) + 'px';
    s.style.animationDuration = (Math.random() * 12 + 10) + 's';
    s.style.animationDelay = (-Math.random() * 18) + 's';
    bg.appendChild(s);
  }
  // 关键帧只注入一次
  if (!document.getElementById('gf-anim')) {
    var kf = document.createElement('style');
    kf.id = 'gf-anim';
    kf.textContent = '@keyframes gfUp { 0%{transform:translateY(0) rotate(0);} 100%{transform:translateY(-110vh) rotate(20deg);} }';
    document.head.appendChild(kf);
  }
  document.body.appendChild(bg);
  return bg;
}

// 创建背景音乐控制器
export function createBGM(src, volume) {
  var audio = null;
  var muted = false;
  var started = false;
  function ensureAudio() {
    if (audio) return audio;
    audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume || 0.35;
    return audio;
  }
  function tryPlay() {
    if (muted || started) return;
    try {
      var a = ensureAudio();
      var p = a.play();
      if (p && p.then) {
        p.then(function () { started = true; })
         .catch(function () {});
      }
    } catch (e) {}
  }
  document.addEventListener('touchstart', tryPlay, { passive: true });
  document.addEventListener('touchend', tryPlay, { passive: true });
  document.addEventListener('click', tryPlay);
  return {
    play: tryPlay,
    pause: function () { if (audio) audio.pause(); },
    restart: function () {
      if (audio) { audio.currentTime = 0; }
      tryPlay();
    },
    toggle: function () {
      muted = !muted;
      if (muted) { if (audio) audio.pause(); }
      else tryPlay();
      return muted;
    }
  };
}

// 注入静音按钮样式（懒加载）
var muteStyleInjected = false;
function ensureMuteStyle() {
  if (muteStyleInjected) return;
  muteStyleInjected = true;
  var s = document.createElement('style');
  s.textContent = `
    .mute-btn {
      position: fixed; top: 16px; right: 16px;
      width: 44px; height: 44px; border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(15,25,32,0.7);
      backdrop-filter: blur(10px);
      color: #e6ede9; font-size: 20px;
      cursor: pointer; z-index: 200;
      display: grid; place-items: center;
    }
    .mute-btn:hover { background: rgba(47,133,90,0.4); }
  `;
  document.head.appendChild(s);
}

// 在页面右上角创建静音按钮，自动绑定 bgm
export function createMuteButton(bgm) {
  ensureMuteStyle();
  var btn = document.createElement('button');
  btn.className = 'mute-btn';
  btn.textContent = '🔊';
  btn.title = '背景音乐';
  btn.addEventListener('click', function () {
    var muted = bgm.toggle();
    btn.textContent = muted ? '🔇' : '🔊';
  });
  document.body.appendChild(btn);
  return btn;
}

// 一键初始化：基础样式 + 返回按钮 + 飘浮背景 + BGM + 静音按钮
export function initGamePage(opts) {
  injectBaseStyles();
  createBackButton();
  if (opts.emojis) createFloatingBackground(opts.emojis, opts.emojiCount);
  var result = {};
  if (opts.bgmSrc) {
    result.bgm = createBGM(opts.bgmSrc, opts.bgmVolume);
    createMuteButton(result.bgm);
  }
  return result;
}

// Letterbox 适配：把指定元素按比例缩放塞进屏幕，黑边由背景填
// 用法：fitToScreen('.game-container') 或 fitToScreen(document.querySelector('#wrap'))
export function fitToScreen(target) {
  var el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  el.style.transformOrigin = 'center center';
  el.style.flexShrink = '0';
  function fit() {
    el.style.transform = 'none';
    var cw = el.offsetWidth;
    var ch = el.offsetHeight;
    var scale = Math.min(window.innerWidth / cw, window.innerHeight / ch, 1);
    el.style.transform = 'scale(' + scale + ')';
  }
  fit();
  window.addEventListener('resize', fit);
}
