<script setup>
import { games } from '../data/siteData.js'
import BgEffect from './BgEffect.vue'

// 卡通 emoji 图标（对应 g.icon）
const gameEmoji = { snake: '🐍', tetris: '🧩', mole: '🔨', tile: '🔢', memory: '🧠' }
</script>

<template>
  <section id="games" class="section games">
    <BgEffect type="rain" />
    <div class="section-inner">
      <p class="section-eyebrow">GameList</p>
      <h2 class="section-title">我的小游戏</h2>
      <p class="section-desc">
        用代码与创意打磨的小玩具，点击卡片在当前页进入游玩。
      </p>

      <div class="game-grid">
        <a v-for="g in games" :key="g.name" class="game-card glass" :href="g.link">
          <div class="game-icon" :class="'tone-' + g.icon">
            <span class="g-emoji">{{ gameEmoji[g.icon] || '🎮' }}</span>
          </div>
          <div class="game-body">
            <div class="game-title-row">
              <h3 class="game-name">{{ g.name }}</h3>
              <span class="game-tag">{{ g.tag }}</span>
            </div>
            <p class="game-desc">{{ g.desc }}</p>
          </div>
          <span class="game-cta">
            开始游戏
            <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 注册自定义角度属性，使得 conic-gradient 能够平滑动画 */
@property --conic-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.games {
  /* 内容从上往下排列，不垂直居中 */
  justify-content: flex-start;
  position: relative;
}

.game-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 32px;
}

@media (min-width: 768px) {
  .game-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1100px) {
  .game-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.game-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 18px 16px;
  /* 加深静态边框颜色，与流光产生对比 */
  border: 1px solid rgba(80, 120, 90, 0.5);
  background: linear-gradient(rgba(235, 248, 235, 0.55), rgba(235, 248, 235, 0.55));
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* 多彩极光渐变流光：厚度 3px */
.game-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 3px;
  /* 极光色系：粉、橙、黄、绿、青、紫平滑过渡，并留出透明区域形成流光带 */
  background: conic-gradient(from var(--conic-angle),
      rgba(255, 255, 255, 0) 0deg,
      rgba(255, 255, 255, 0) 20deg,
      rgba(244, 114, 182, 0.9) 60deg,
      /* 亮粉色 */
      rgba(251, 146, 60, 0.95) 100deg,
      /* 橙色 */
      rgba(250, 204, 21, 0.9) 140deg,
      /* 明黄 */
      rgba(74, 222, 128, 0.95) 180deg,
      /* 翠绿 */
      rgba(56, 189, 248, 0.9) 220deg,
      /* 天青 */
      rgba(167, 139, 250, 0.95) 260deg,
      /* 淡紫 */
      rgba(244, 114, 182, 0.7) 300deg,
      /* 粉紫回环 */
      rgba(255, 255, 255, 0) 340deg,
      rgba(255, 255, 255, 0) 360deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  animation: borderFlow 3s linear infinite;
  pointer-events: none;
}

@keyframes borderFlow {
  to {
    --conic-angle: 360deg;
  }
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-soft);
}

.game-icon {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  box-shadow: 0 4px 14px rgba(30, 74, 47, 0.25);
}

.g-emoji {
  font-size: 28px;
  line-height: 1;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
}

/* 每个游戏独立的卡通渐变底 */
.tone-snake {
  background: linear-gradient(135deg, #a3e635, #4ade80);
}

.tone-tetris {
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
}

.tone-mole {
  background: linear-gradient(135deg, #fb923c, #fbbf24);
}

.tone-tile {
  background: linear-gradient(135deg, #34d399, #2dd4bf);
}

.tone-memory {
  background: linear-gradient(135deg, #f472b6, #c084fc);
}

.game-body {
  flex: 1;
  width: 100%;
}

.game-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.game-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
}

.game-tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--primary-soft);
  background: var(--primary-tint);
  padding: 2px 9px;
  border-radius: 999px;
}

.game-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
}

.game-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary-soft);
  transition: gap 0.25s ease;
}

.game-card:hover .game-cta {
  gap: 10px;
}

.arrow {
  width: 15px;
  height: 15px;
}</style>
