<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { games } from '../data/siteData'

// 首页欢迎板块（占位文案，替换成你自己的介绍）
// 网页小游戏数量动态读 games 数组长度，新增游戏自动更新
const stats = [
  { value: '6', suffix: '年', label: '游戏开发' },
  { value: '10+', suffix: '个', label: '游戏上线项目' },
  { value: String(games.length), suffix: '个', label: '网页小游戏' },
  { value: '∞', suffix: '', label: '学习热情' },
]

const quickLinks = [
  { id: 'games', label: '去玩小游戏', primary: true },
  { id: 'sites', label: '有趣网站', primary: false },
  { id: 'contact', label: '联系方式', primary: false },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ============ 代码雨（Matrix 风格，浅色底适配版） ============ */
const canvasRef = ref(null)
let ctx = null
let rafId = 0
let running = true

const GLYPHS =
  'アイウェオカキクケコサシスセソタチツテトナニヌネノ' +
  '0123456789ABCDEFXYZΞΨΔ'

const FONT_SIZE = 14
let cols = 0
let rows = 0
let drops = []
let speeds = []

function randChar() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const parent = canvas.parentElement
  const w = parent.offsetWidth
  const h = parent.offsetHeight
  if (w === 0 || h === 0) return
  canvas.width = w
  canvas.height = h
  cols = Math.floor(w / FONT_SIZE)
  rows = Math.floor(h / FONT_SIZE)
  drops = new Array(cols)
    .fill(0)
    .map(() => Math.floor(Math.random() * -rows))
  speeds = new Array(cols).fill(0).map(() => 0.4 + Math.random() * 0.6)
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas || !ctx || !running) return
  // 半透明白覆盖，形成淡出拖尾（浅色底适配）
  ctx.fillStyle = 'rgba(232, 243, 236, 0.08)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.font = FONT_SIZE + 'px Consolas, Menlo, monospace'

  for (let i = 0; i < cols; i++) {
    const x = i * FONT_SIZE
    const y = drops[i] * FONT_SIZE
    // 头部偶尔浅绿亮点，其余深绿主体（浅底上清晰）
    ctx.fillStyle = Math.random() > 0.96 ? '#57b68c' : '#2f855a'
    ctx.fillText(randChar(), x, y)
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = Math.floor(Math.random() * -8)
    }
    drops[i] += speeds[i]
  }
}

function loop() {
  draw()
  rafId = requestAnimationFrame(loop)
}

function onResize() {
  resize()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (canvas) {
    ctx = canvas.getContext('2d')
    resize()
    window.addEventListener('resize', onResize)
    rafId = requestAnimationFrame(loop)
  }
})

onBeforeUnmount(() => {
  running = false
  window.removeEventListener('resize', onResize)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <section id="home" class="section welcome">
    <!-- 代码雨背景 -->
    <canvas ref="canvasRef" class="code-rain" aria-hidden="true"></canvas>

    <div class="section-inner">
      <div class="welcome-copy">
        <p class="welcome-greeting">你好，我是 zlToT</p>
        <h1 class="welcome-title">
          无限进步，
          <span class="grad-text">用代码记录每一次迭代。</span>
        </h1>
        <p class="welcome-desc">
          一名热爱创造的游戏开发工程师。从一行代码到一个小游戏，
          从灵光一闪到一个完整站点 —— 我把每一次尝试都留在这里，
          供你翻阅，也供未来的自己回望。
        </p>

        <!-- 南孚风大数字统计块 -->
        <div class="welcome-stats">
          <div v-for="s in stats" :key="s.label" class="wstat">
            <span class="wstat-value">{{ s.value }}<i>{{ s.suffix }}</i></span>
            <span class="wstat-label">{{ s.label }}</span>
          </div>
        </div>

        <div class="welcome-actions">
          <a
            v-for="link in quickLinks"
            :key="link.id"
            :href="`#${link.id}`"
            class="btn"
            :class="link.primary ? 'btn-primary' : 'btn-ghost'"
            @click.prevent="scrollToSection(link.id)"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.welcome {
  overflow: hidden;
}
/* 代码雨 canvas 铺满首页板块 */
.code-rain {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.85;
}
.welcome-copy {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}

.welcome-greeting {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: var(--primary-soft);
  margin-bottom: 18px;
}
.welcome-greeting::before,
.welcome-greeting::after {
  content: "";
  width: 26px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--primary-soft), var(--primary-pale));
}
.welcome-title {
  font-size: 40px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: var(--text-main);
  margin-bottom: 20px;
}
@media (min-width: 768px) {
  .welcome-title {
    font-size: 48px;
  }
}
.welcome-desc {
  color: var(--text-muted);
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto 32px;
}

/* 南孚风大数字统计块 */
.welcome-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-bottom: 36px;
}
.wstat {
  text-align: center;
}
.wstat-value {
  display: block;
  font-size: 40px;
  font-weight: 800;
  line-height: 1.1;
  color: var(--primary);
}
.wstat-value i {
  font-style: normal;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-soft);
  margin-left: 2px;
}
.wstat-label {
  display: block;
  font-size: 13px;
  color: var(--text-faint);
  margin-top: 6px;
  letter-spacing: 1px;
}
@media (max-width: 767px) {
  .welcome-stats {
    gap: 28px;
  }
  .wstat-value {
    font-size: 32px;
  }
}

/* 按钮：圆角饱满、硬朗悬浮感（南孚风） */
.welcome-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
}
.btn {
  padding: 13px 26px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-primary {
  color: #fff;
  background: linear-gradient(135deg, var(--accent), var(--primary-deep));
  box-shadow: 0 6px 18px rgba(47, 133, 90, 0.35);
}
.btn-primary:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, var(--primary), var(--accent));
  box-shadow: 0 12px 28px rgba(47, 133, 90, 0.45);
}
.btn-ghost {
  color: var(--primary);
  background: rgba(235, 248, 235, 0.6);
  border: 1px solid rgba(47, 133, 90, 0.35);
}
.btn-ghost:hover {
  background: rgba(235, 248, 235, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(47, 133, 90, 0.2);
}
</style>
