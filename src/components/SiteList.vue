<script setup>
import { ref, computed } from 'vue'
import { sites, siteCategories } from '../data/siteData.js'
import BgEffect from './BgEffect.vue'

const activeCat = ref('all')

function filteredSites() {
  if (activeCat.value === 'all') {
    return sites
  }
  return sites.filter(function (s) {
    return s.category === activeCat.value
  })
}

function catLabel(key) {
  const found = siteCategories.filter(function (c) {
    return c.key === key
  })
  return found.length > 0 ? found[0].label : key
}
</script>

<template>
  <section id="sites" class="section sites">
    <BgEffect type="snow" />
    <div class="section-inner">
      <p class="section-eyebrow">SiteList</p>
      <h2 class="section-title">有趣网站</h2>
      <p class="section-desc">
        收藏的一些好用的站点，按分类整理。点击卡片直接在新标签页访问。
      </p>

      <div class="cat-tabs">
        <button v-for="cat in siteCategories" :key="cat.key" class="cat-tab" :class="{ active: activeCat === cat.key }"
          @click="activeCat = cat.key">
          {{ cat.label }}
        </button>
      </div>

      <div class="site-grid">
        <a v-for="s in filteredSites()" :key="s.name" class="site-card glass" :href="s.link" target="_blank"
          rel="noopener">
          <span class="site-cat">{{ catLabel(s.category) }}</span>
          <h3 class="site-name">{{ s.name }}</h3>
          <p class="site-desc">{{ s.desc }}</p>
          <span class="site-link">
            访问站点
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

.sites {
  /* 内容从上往下排列，不垂直居中 */
  justify-content: flex-start;
  position: relative;
}

.cat-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

.cat-tab {
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  background: rgba(235, 248, 235, 0.6);
  border: 1px solid rgba(80, 120, 90, 0.14);
  transition: all 0.25s ease;
}

.cat-tab:hover {
  color: var(--primary-soft);
  transform: translateY(-1px);
}

.cat-tab.active {
  color: #fff;
  background: linear-gradient(135deg, var(--primary-soft), var(--primary-pale));
  border-color: transparent;
  box-shadow: 0 5px 14px rgba(47, 133, 90, 0.32);
}

.site-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 24px;
}

@media (min-width: 768px) {
  .site-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1100px) {
  .site-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.site-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 12px 12px;
  /* 加深静态边框颜色，与流光产生对比 */
  border: 1px solid rgba(80, 120, 90, 0.5);
  background: linear-gradient(rgba(235, 248, 235, 0.82), rgba(235, 248, 235, 0.82));
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* 清透天青色渐变流光：厚度 3px */
.site-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 3px;
  /* 加大到 3px */
  background: conic-gradient(from var(--conic-angle),
      rgba(132, 212, 240, 0) 0deg,
      rgba(132, 212, 240, 0.2) 30deg,
      rgba(132, 212, 240, 0.95) 80deg,
      #b3e5fc 100deg,
      /* 亮天青色高光 */
      rgba(132, 212, 240, 0.95) 120deg,
      rgba(132, 212, 240, 0.2) 170deg,
      rgba(132, 212, 240, 0) 200deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  animation: borderFlow 3s linear infinite;
  /* 动画稍慢，更有质感 */
  pointer-events: none;
}

@keyframes borderFlow {
  to {
    --conic-angle: 360deg;
  }
}

.site-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-soft);
}

.site-cat {
  font-size: 11px;
  font-weight: 600;
  color: var(--primary-soft);
  background: rgba(47, 133, 90, 0.12);
  padding: 2px 10px;
  border-radius: 999px;
  margin-bottom: 8px;
}

.site-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 5px;
}

.site-desc {
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.5;
  flex: 1;
}

.site-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--primary-soft);
  transition: gap 0.25s ease;
}

.site-card:hover .site-link {
  gap: 10px;
}

.arrow {
  width: 14px;
  height: 14px;
}</style>
