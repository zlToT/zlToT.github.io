<script setup>
import { games } from '../data/siteData.js'

// 卡通 emoji 图标（对应 g.icon）
const gameEmoji = { snake: '🐍', tetris: '🧩', mole: '🔨', tile: '🔢', memory: '🧠' }
</script>

<template>
  <section id="games" class="section games">
    <div class="section-inner">
      <p class="section-eyebrow">GameList</p>
      <h2 class="section-title">我的小游戏</h2>
      <p class="section-desc">
        用代码与创意打磨的小玩具，点击卡片在当前页进入游玩。
      </p>

      <div class="game-grid">
        <a
          v-for="g in games"
          :key="g.name"
          class="game-card glass"
          :href="g.link"
        >
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
            <svg
              class="arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.games {
  /* 内容从上往下排列，不垂直居中 */
  justify-content: flex-start;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 18px 16px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
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
.tone-snake  { background: linear-gradient(135deg, #a3e635, #4ade80); }
.tone-tetris { background: linear-gradient(135deg, #60a5fa, #a78bfa); }
.tone-mole   { background: linear-gradient(135deg, #fb923c, #fbbf24); }
.tone-tile   { background: linear-gradient(135deg, #34d399, #2dd4bf); }
.tone-memory { background: linear-gradient(135deg, #f472b6, #c084fc); }
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
}
</style>
