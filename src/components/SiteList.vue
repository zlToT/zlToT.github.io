<script setup>
import { ref, computed } from 'vue'
import { sites, siteCategories } from '../data/siteData.js'

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

function firstChar(name) {
  return name.charAt(0)
}
</script>

<template>
  <section id="sites" class="section sites">
    <div class="section-inner">
      <p class="section-eyebrow">SiteList</p>
      <h2 class="section-title">有趣网站</h2>
      <p class="section-desc">
        收藏的一些好用的站点，按分类整理。点击卡片直接在新标签页访问。
      </p>

      <div class="cat-tabs">
        <button
          v-for="cat in siteCategories"
          :key="cat.key"
          class="cat-tab"
          :class="{ active: activeCat === cat.key }"
          @click="activeCat = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="site-grid">
        <a
          v-for="s in filteredSites()"
          :key="s.name"
          class="site-card glass"
          :href="s.link"
          target="_blank"
          rel="noopener"
        >
          <div class="site-top">
            <span class="site-avatar">{{ firstChar(s.name) }}</span>
            <span class="site-cat">{{ catLabel(s.category) }}</span>
          </div>
          <h3 class="site-name">{{ s.name }}</h3>
          <p class="site-desc">{{ s.desc }}</p>
          <span class="site-link">
            访问站点
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
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sites {
  /* 内容从上往下排列，不垂直居中 */
  justify-content: flex-start;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 14px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.site-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-soft);
}
.site-top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}
.site-avatar {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 16px;
  font-weight: 800;
  color: var(--primary-soft);
  background: linear-gradient(135deg, rgba(47, 133, 90, 0.16), rgba(87, 182, 140, 0.1));
}
.site-cat {
  font-size: 11px;
  font-weight: 600;
  color: var(--primary-soft);
  background: rgba(47, 133, 90, 0.12);
  padding: 2px 9px;
  border-radius: 999px;
}
.site-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 6px;
}
.site-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  flex: 1;
}
.site-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary-soft);
  transition: gap 0.25s ease;
}
.site-card:hover .site-link {
  gap: 10px;
}
.arrow {
  width: 15px;
  height: 15px;
}
</style>
