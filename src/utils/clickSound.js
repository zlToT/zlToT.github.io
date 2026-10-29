// ============================================================
// 全局点击音效（Web Audio API 合成，无音频文件）
// 轻柔水滴/木质“啵”声，适配浅绿治愈风
// 通过 initClickSound() 注册 document 事件委托，统一发声
// ============================================================

const MUTE_KEY = 'zltot-sound-muted'

let audioCtx = null
let masterGain = null
let muted = false

// 各元素类型的基础音高（Hz）与音量
const TONES = {
  nav:     { freq: 620, vol: 0.12 },
  primary: { freq: 760, vol: 0.13 },
  card:    { freq: 520, vol: 0.10 },
  default: { freq: 600, vol: 0.11 },
}

function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === '1'
  } catch {
    return false
  }
}

// 懒加载 AudioContext：必须在用户首次交互后创建/恢复，否则被浏览器拦截
function ensureCtx() {
  if (muted) return null
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    audioCtx = new AC()
    masterGain = audioCtx.createGain()
    masterGain.gain.value = 1
    masterGain.connect(audioCtx.destination)
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// 合成一声短促“啵”：正弦波 + 频率轻微下滑 + 指数衰减包络
function playClick(type) {
  if (muted) return
  const ctx = ensureCtx()
  if (!ctx) return

  const cfg = TONES[type] || TONES.default
  const t = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(cfg.freq * 1.35, t)
  osc.frequency.exponentialRampToValueAtTime(cfg.freq, t + 0.07)

  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(cfg.vol, t + 0.006)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.17)

  osc.connect(gain)
  gain.connect(masterGain)
  osc.start(t)
  osc.stop(t + 0.2)
}

// 判断点击目标属于哪种发声类型
function resolveType(el) {
  if (!el || !el.closest) return null
  const target = el.closest(
    'button, a, [role="button"], .nav-item, .game-card, .site-card, .lab-card'
  )
  if (!target) return null
  if (target.dataset.noSound !== undefined || target.closest('[data-no-sound]')) {
    return null
  }
  if (target.closest('.nav-item') || target.closest('.sidenav')) return 'nav'
  if (target.classList.contains('btn-primary') || target.closest('.btn-primary')) {
    return 'primary'
  }
  if (
    target.classList.contains('game-card') ||
    target.classList.contains('site-card') ||
    target.classList.contains('lab-card')
  ) {
    return 'card'
  }
  return 'default'
}

// 注册全局事件委托（capture 阶段，先于组件内部处理）
export function initClickSound() {
  muted = readMuted()
  document.addEventListener(
    'click',
    (e) => {
      const type = resolveType(e.target)
      if (type) playClick(type)
    },
    true
  )
}

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = !!value
  try {
    localStorage.setItem(MUTE_KEY, muted ? '1' : '0')
  } catch {
    /* 隐私模式等场景忽略写入失败 */
  }
  if (!muted) ensureCtx()
}

export function toggleMuted() {
  setMuted(!muted)
  return muted
}
