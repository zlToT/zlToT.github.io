<script setup>
// 通用 Canvas 背景动效组件
// type:
//   firefly   - 萤火虫：微光缓慢漫游闪烁（侧边栏，暖橙深色）
//   snow      - 雪花：大小雪花缓缓下落带轻微摇摆（技能 / 小游戏 / 有趣网站页）
//   rain      - 流星雨：右上→左下清澈流星 + 渐变光带拖尾 + 星尘（《你的名字》质感，浅底适配）
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  type: { type: String, default: 'firefly' },
})

const canvas = ref(null)
let raf = 0
let w = 0
let h = 0
let ctx = null
let particles = []
let drops = []
let dust = []
let stars = []
let visible = true
let io = null

// 流星色板：头部银白高光 / 中段清透蓝青 / 过渡淡紫蓝 / 尾端透明，星尘继承同色系
const TINTS = [
  { hi: 'rgba(232,243,255,0.82)', mid: 'rgba(150,205,255,0.62)', deep: 'rgba(150,180,252,0.28)', tail: 'rgba(165,170,250,0)', dust: ['190,225,255', '170,200,255'] },
  { hi: 'rgba(228,248,252,0.82)', mid: 'rgba(140,222,240,0.58)', deep: 'rgba(150,195,250,0.26)', tail: 'rgba(175,175,250,0)', dust: ['175,235,248', '180,215,252'] },
  { hi: 'rgba(236,236,255,0.80)', mid: 'rgba(172,180,252,0.58)', deep: 'rgba(186,158,246,0.26)', tail: 'rgba(196,152,244,0)', dust: ['195,185,252', '210,170,246'] },
  { hi: 'rgba(242,247,255,0.75)', mid: 'rgba(198,224,250,0.55)', deep: 'rgba(172,200,250,0.24)', tail: 'rgba(180,205,250,0)', dust: ['212,232,252', '200,222,252'] },
]
let tintBag = []
// 洗牌式取色：四种色板均匀轮转，避免某一种颜色扎堆
function nextTint() {
  if (!tintBag.length) {
    tintBag = [0, 1, 2, 3]
    for (let i = 3; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0
      const tmp = tintBag[i]; tintBag[i] = tintBag[j]; tintBag[j] = tmp
    }
  }
  return TINTS[tintBag.pop()]
}

function resize() {
  const c = canvas.value
  if (!c) return
  const parent = c.parentElement
  w = parent.clientWidth || 300
  h = parent.clientHeight || 300
  const dpr = window.devicePixelRatio || 1
  c.width = w * dpr
  c.height = h * dpr
  ctx = c.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  init()
}

// 生成一颗流星：统一从右上向左下斜向飞掠
function spawnMeteor(spawnAnywhere) {
  let speed = 2.4 + Math.random() * 0.4 // 大部分速度统一
  if (Math.random() < 0.22) speed *= Math.random() < 0.5 ? 0.85 : 1.15 // 少量 ±15%
  const ang = Math.PI / 4 + (Math.random() - 0.5) * 0.2 // 约 39°~51°，保持斜向左下
  const ux = -Math.cos(ang)
  const uy = Math.sin(ang)
  const len = 95 + Math.random() * 85 // 拖尾轻微随机：部分细长、部分稍短
  let x, y
  if (spawnAnywhere) {
    x = Math.random() * (w + 120) - 60
    y = Math.random() * (h * 0.9) - 40
  } else {
    // 从右侧顶部随机重生（顶边 / 右边混合采样，保证分布均匀、连绵不断）
    if (Math.random() < 0.62) { x = Math.random() * w; y = -40 - Math.random() * 90 }
    else { x = w + 40 + Math.random() * 90; y = Math.random() * h * 0.5 }
  }
  return {
    x, y,
    vx: ux * speed, vy: uy * speed,
    ux, uy, px: -uy, py: ux, // 预计算运动方向与垂直法向（星芒用）
    len,
    wd: 1.1 + Math.random() * 0.5, // 拖尾粗细轻微随机
    tint: nextTint(),
  }
}

// 背景微星点：极低密度，白 / 淡蓝，缓慢呼吸闪烁，周期错开
function initStars() {
  stars = []
  const count = Math.max(16, Math.min(36, Math.round((w * h) / 30000)))
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w, y: Math.random() * h,
      r: 0.4 + Math.random() * 1.0,
      base: 0.1 + Math.random() * 0.2,
      amp: 0.08 + Math.random() * 0.16,
      period: 2600 + Math.random() * 3000,
      ph: Math.random() * 6.283,
      c: Math.random() < 0.72 ? '255,255,255' : '172,206,250',
    })
  }
}

function init() {
  particles = []
  const t = props.type
  if (t === 'firefly') {
    for (let i = 0; i < 22; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        ph: Math.random() * 6.28, s: Math.random() * 2 + 1.2,
      })
    }
  } else if (t === 'snow') {
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vy: Math.random() * 0.6 + 0.3,
        ph: Math.random() * 6.28, s: Math.random() * 2.8 + 1.4,
        sway: Math.random() * 0.6 + 0.2,
      })
    }
  } else if (t === 'rain') {
    // 手机屏窄，减半流星数量，省 GPU
    const dropCount = w < 768 ? 8 : 16
    drops = new Array(dropCount).fill(0).map(() => spawnMeteor(true))
    dust = []
    initStars()
  }
}

function draw(now) {
  // 不在视口就停帧，省手机电量和滚动性能
  if (!visible) { raf = 0; return }
  ctx.clearRect(0, 0, w, h)
  const t = props.type

  if (t === 'firefly') {
    particles.forEach((p) => {
      p.x += p.vx + Math.sin(now / 1800 + p.ph) * 0.18
      p.y += p.vy + Math.cos(now / 2200 + p.ph) * 0.18
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      const a = 0.5 + 0.5 * Math.sin(now / 360 + p.ph)
      ctx.globalAlpha = a * 0.95
      ctx.fillStyle = '#f5a623'
      ctx.shadowColor = '#e8990f'
      ctx.shadowBlur = 10
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill()
    })
    ctx.globalAlpha = 1; ctx.shadowBlur = 0
  }

  else if (t === 'snow') {
    particles.forEach((p) => {
      p.y += p.vy
      p.x += Math.sin(now / 1000 + p.ph) * p.sway
      if (p.y > h + 5) { p.y = -5; p.x = Math.random() * w }
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
      const a = 0.6 + 0.4 * Math.sin(now / 800 + p.ph)
      ctx.globalAlpha = a * 0.9
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = 'rgba(255,255,255,0.7)'
      ctx.shadowBlur = 4
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill()
    })
    ctx.globalAlpha = 1; ctx.shadowBlur = 0
  }

  else if (t === 'rain') {
    // —— 背景微星点：呼吸闪烁，低亮度低权重，不抢流星主体 ——
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i]
      const a = s.base + s.amp * (0.5 + 0.5 * Math.sin((now / s.period) * 6.283 + s.ph))
      ctx.fillStyle = `rgba(${s.c},${a})`
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill()
    }

    // —— 细碎星尘：沿运动方向缓慢飘散，带同色系光晕，逐渐透明消失 ——
    for (let i = dust.length - 1; i >= 0; i--) {
      const d = dust[i]
      d.x += d.vx; d.y += d.vy
      d.vx *= 0.992; d.vy *= 0.992
      d.life -= d.decay
      if (d.life <= 0) { dust.splice(i, 1); continue }
      const a = d.life * 0.5
      // 外圈淡光晕 + 内圈小亮点（不用径向渐变，保证 60fps）
      ctx.fillStyle = `rgba(${d.c},${a * 0.3})`
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 2.8, 0, 6.283); ctx.fill()
      ctx.fillStyle = `rgba(${d.c},${a})`
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill()
    }

    // —— 流星本体：亮白星芒头部 + 细腻半透明渐变光带 ——
    ctx.lineCap = 'round'
    for (let i = 0; i < drops.length; i++) {
      const m = drops[i]
      const tailX = m.x - m.ux * m.len
      const tailY = m.y - m.uy * m.len
      const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
      grad.addColorStop(0, 'rgba(255,255,255,0.95)') // 头部亮白
      grad.addColorStop(0.14, m.tint.hi)             // 前段银白高光
      grad.addColorStop(0.45, m.tint.mid)            // 中段清透天蓝 / 浅青蓝
      grad.addColorStop(0.78, m.tint.deep)           // 过渡淡紫蓝
      grad.addColorStop(1, m.tint.tail)              // 尾端完全透明
      ctx.strokeStyle = grad
      // 外层：极细柔辉（低透明度宽描边，空气感）
      ctx.globalAlpha = 0.22
      ctx.lineWidth = m.wd + 3.4
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tailX, tailY); ctx.stroke()
      // 内层：细腻亮线
      ctx.globalAlpha = 0.85
      ctx.lineWidth = m.wd
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tailX, tailY); ctx.stroke()
      ctx.globalAlpha = 1
      // 头部柔光晕
      const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 7)
      glow.addColorStop(0, 'rgba(255,255,255,0.85)')
      glow.addColorStop(0.4, 'rgba(222,238,255,0.32)')
      glow.addColorStop(1, 'rgba(205,225,255,0)')
      ctx.fillStyle = glow
      ctx.beginPath(); ctx.arc(m.x, m.y, 7, 0, 6.283); ctx.fill()
      // 头部锐利亮白核心
      ctx.fillStyle = 'rgba(255,255,255,0.98)'
      ctx.beginPath(); ctx.arc(m.x, m.y, 1.5, 0, 6.283); ctx.fill()
      // 细小十字星芒（前向短芒 + 垂直短芒）
      ctx.strokeStyle = 'rgba(255,255,255,0.45)'
      ctx.lineWidth = 0.7
      ctx.beginPath()
      ctx.moveTo(m.x + m.ux * 1.2, m.y + m.uy * 1.2)
      ctx.lineTo(m.x + m.ux * 6.5, m.y + m.uy * 6.5)
      ctx.moveTo(m.x - m.px * 4.5, m.y - m.py * 4.5)
      ctx.lineTo(m.x + m.px * 4.5, m.y + m.py * 4.5)
      ctx.stroke()
      // 前进（右上 → 左下）
      m.x += m.vx
      m.y += m.vy
      // 尾迹消散处少量星尘，沿运动方向飘散
      if (Math.random() < 0.05 && dust.length < 110) {
        const back = m.len * (0.12 + Math.random() * 0.55)
        const col = m.tint.dust[(Math.random() * m.tint.dust.length) | 0]
        dust.push({
          x: m.x - m.ux * back + (Math.random() - 0.5) * 5,
          y: m.y - m.uy * back + (Math.random() - 0.5) * 5,
          vx: m.ux * (0.25 + Math.random() * 0.45) + (Math.random() - 0.5) * 0.22,
          vy: m.uy * (0.25 + Math.random() * 0.45) + (Math.random() - 0.5) * 0.22 - 0.06,
          r: 0.5 + Math.random() * 1.0,
          life: 0.55 + Math.random() * 0.45,
          decay: 0.008 + Math.random() * 0.008,
          c: col,
        })
      }
      // 飞出屏幕底部/左侧后，从右侧顶部随机重生，连绵循环
      if (m.y > h + 40 || m.x < -m.len - 40) {
        Object.assign(m, spawnMeteor(false))
      }
    }
  }

  raf = requestAnimationFrame(draw)
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  raf = requestAnimationFrame(draw)
  // 离开视口暂停动画，回到视口再继续
  const host = canvas.value.parentElement
  io = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(draw)
    },
    { threshold: 0 }
  )
  io.observe(host)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(rAF_placeholder())
  raf = 0
  io && io.disconnect()
  window.removeEventListener('resize', resize)
})
function rAF_placeholder() { return raf }
</script>

<template>
  <div class="bg">
    <canvas ref="canvas" aria-hidden="true"></canvas>
  </div>
</template>

<style scoped>
.bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  /* 在宿主背景之上、内容之下（内容层由宿主用 z-index:1 提升） */
  z-index: 0;
}
canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
