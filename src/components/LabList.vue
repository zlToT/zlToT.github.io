<script setup>
import { labs } from '../data/siteData.js'
import BgEffect from './BgEffect.vue'

// 实验室项目图标（对应 l.icon）
const labEmoji = { beathaus: '🎛️', city: '🌫️', cutout: '✂️', squeeze: '🗜️' }
</script>

<template>
  <section id="labs" class="section labs">
    <BgEffect type="bubbles" />
    <div class="section-inner">
      <p class="section-eyebrow">LabList</p>
      <h2 class="section-title">实验室</h2>
      <p class="section-desc">
        一些不是游戏、但同样好玩的互动小实验。点击卡片在新标签页打开体验。
      </p>

      <div class="lab-grid">
        <a v-for="l in labs" :key="l.name" class="lab-card glass" :href="l.link" target="_blank" rel="noopener">
          <div class="lab-icon" :class="'tone-' + l.icon">
            <span class="l-emoji">{{ labEmoji[l.icon] || '🧪' }}</span>
          </div>
          <div class="lab-body">
            <div class="lab-title-row">
              <h3 class="lab-name">{{ l.name }}</h3>
              <span class="lab-tag">{{ l.tag }}</span>
            </div>
            <p class="lab-desc">{{ l.desc }}</p>
          </div>
          <span class="lab-cta">
            开始体验
            <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
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

.labs {
  justify-content: flex-start;
  position: relative;
}

.lab-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 32px;
}

@media (min-width: 768px) {
  .lab-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1100px) {
  .lab-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.lab-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 18px 16px;
  border: 1px solid rgba(90, 110, 170, 0.5);
  background: linear-gradient(rgba(238, 240, 252, 0.6), rgba(238, 240, 252, 0.6));
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* 紫青科技流光：厚度 3px */
.lab-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 3px;
  background: conic-gradient(from var(--conic-angle),
      rgba(167, 139, 250, 0) 0deg,
      rgba(167, 139, 250, 0.2) 30deg,
      rgba(167, 139, 250, 0.95) 80deg,
      rgba(56, 189, 248, 0.95) 140deg,
      rgba(56, 189, 248, 0.2) 200deg,
      rgba(56, 189, 248, 0) 260deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  animation: borderFlow 3.5s linear infinite;
  pointer-events: none;
}

@keyframes borderFlow {
  to {
    --conic-angle: 360deg;
  }
}

.lab-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-soft);
}

.lab-icon {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  box-shadow: 0 4px 14px rgba(60, 60, 140, 0.25);
}

.l-emoji {
  font-size: 28px;
  line-height: 1;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
}

.tone-beathaus {
  background: linear-gradient(135deg, #a78bfa, #38bdf8);
}

.tone-city {
  background: linear-gradient(135deg, #0ea5e9, #14b8a6);
}

.tone-cutout {
  background: linear-gradient(135deg, #f472b6, #a78bfa);
}

.tone-squeeze {
  background: linear-gradient(135deg, #fb923c, #f43f5e);
}

.lab-body {
  flex: 1;
  width: 100%;
}

.lab-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.lab-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
}

.lab-tag {
  font-size: 11px;
  font-weight: 600;
  color: #7c5ce0;
  background: rgba(124, 92, 224, 0.12);
  padding: 2px 9px;
  border-radius: 999px;
}

.lab-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
}

.lab-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 600;
  color: #7c5ce0;
  transition: gap 0.25s ease;
}

.lab-card:hover .lab-cta {
  gap: 10px;
}

.arrow {
  width: 15px;
  height: 15px;
}
</style>
