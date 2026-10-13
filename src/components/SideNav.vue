<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import avatar from '../assets/头像.jpg'

// 导航配置：id 对应页面锚点板块
const navItems = [
  { id: 'home', label: '首页', icon: 'home' },
  { id: 'skill', label: '技能', icon: 'zap' },
  { id: 'games', label: '小游戏', icon: 'gamepad' },
  { id: 'sites', label: '有趣网站', icon: 'star' },
  { id: 'contact', label: '联系方式', icon: 'mail' },
]

const activeId = ref('home')

// 图标：内联 SVG（stroke 风格，随文字颜色变化）
const icons = {
  home: 'M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5',
  zap: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
  gamepad: 'M6 10h4m-2-2v4m8-1v.01M17 13v.01M4 8h13a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-1.5a2 2 0 0 1-1.8-1.2l-.5-1A2 2 0 0 0 11.4 16H9.6a2 2 0 0 0-1.8 1.2l-.5 1A2 2 0 0 1 5.5 19H4a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z',
  star: 'M12 3l2.4 5.2 5.6.7-4.1 3.9 1 5.6-4.9-2.7-4.9 2.7 1-5.6L4.1 8.9l5.6-.7L12 3Z',
  mail: 'M3 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2 7 4.5L17 8',
}

// 平滑滚动到目标锚点
function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 滚动监听：高亮当前可见板块
function onScroll() {
  let current = navItems[0].id
  for (const item of navItems) {
    const el = document.getElementById(item.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 180 && rect.bottom > 140) {
        current = item.id
      }
    }
  }
  activeId.value = current
}

let ticking = false
function onScrollThrottled() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(() => {
      onScroll()
      ticking = false
    })
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScrollThrottled, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollThrottled)
})
</script>

<template>
  <!-- 桌面端：左侧固定导航 -->
  <nav class="side-nav" aria-label="主导航">
    <div class="nav-logo">
      <img class="logo-avatar" :src="avatar" alt="zlToT 头像" />
      <div class="logo-texts">
        <span class="logo-text">zlToT</span>
      </div>
    </div>
    <ul class="nav-list">
      <li v-for="item in navItems" :key="item.id">
        <a
          :href="`#${item.id}`"
          class="nav-link"
          :class="{ active: activeId === item.id }"
          @click.prevent="scrollTo(item.id)"
        >
          <svg
            class="nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path :d="icons[item.icon]" />
          </svg>
          <span>{{ item.label }}</span>
        </a>
      </li>
    </ul>
    <div class="nav-footer">
      <span class="nav-footer-dot"></span>
      <span>滑动翻页 · 无限进步</span>
    </div>
  </nav>

  <!-- 移动端：顶部固定导航（头像区 + 导航按钮直排，无汉堡） -->
  <nav class="top-nav" aria-label="主导航（移动端）">
    <div class="top-head">
      <img class="top-avatar" :src="avatar" alt="zlToT 头像" />
      <span class="top-name">zlToT · 无限进步</span>
      <span class="top-hint">滑动翻页</span>
    </div>
    <div class="top-btns">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="`#${item.id}`"
        class="top-nav-btn"
        :class="{ active: activeId === item.id }"
        @click.prevent="scrollTo(item.id)"
      >
        <svg
          class="nav-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path :d="icons[item.icon]" />
        </svg>
        <span>{{ item.label }}</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* ============ 桌面端左侧导航 ============ */
.side-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidenav-width);
  height: 100vh;
  display: none;
  flex-direction: column;
  padding: 32px 20px 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-right: 1px solid rgba(10, 43, 78, 0.08);
  /* 右侧明显阴影分割 */
  box-shadow: 8px 0 28px rgba(10, 43, 78, 0.1), 3px 0 10px rgba(10, 43, 78, 0.06);
  z-index: 100;
}
/* logo 区：头像 + 名字 */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 6px 6px 24px;
  /* 与导航列表的深色分隔线 */
  border-bottom: 1px solid rgba(10, 43, 78, 0.14);
  margin-bottom: 20px;
}
.logo-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(47, 133, 90, 0.35);
  box-shadow: 0 4px 14px rgba(47, 133, 90, 0.3);
  flex-shrink: 0;
}
.logo-texts {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.logo-text {
  font-weight: 800;
  font-size: 25px;
  letter-spacing: 1px;
  color: var(--text-main);
  line-height: 1.1;
}
.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 500;
  color: var(--text-muted);
  transition: all 0.25s ease;
  position: relative;
}
.nav-link:hover {
  color: var(--primary-soft);
  background: rgba(47, 133, 90, 0.08);
  transform: translate(2px, 2px);
}
.nav-link.active {
  color: var(--primary-soft);
  font-weight: 700;
  background: linear-gradient(90deg, rgba(47, 133, 90, 0.14), rgba(87, 182, 140, 0.05));
}
.nav-link.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  border-radius: 4px;
  background: linear-gradient(180deg, var(--primary-soft), var(--primary-pale));
}
.nav-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-faint);
  padding: 14px 16px;
  border-top: 1px solid rgba(10, 43, 78, 0.08);
}
.nav-footer-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-soft);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

@media (min-width: 768px) {
  .side-nav {
    display: flex;
  }
  .top-nav {
    display: none;
  }
}

/* ============ 移动端顶部导航 ============ */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-h);
  display: flex;
  flex-direction: column;
  background: var(--glass-bg-strong);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid rgba(235, 248, 235, 0.9);
  box-shadow: 0 6px 24px rgba(40, 70, 50, 0.15);
  z-index: 100;
}
.top-head {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px 4px;
}
.top-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(47, 133, 90, 0.35);
  flex-shrink: 0;
}
.top-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--text-main);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.top-hint {
  font-size: 11px;
  color: var(--text-faint);
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.top-hint::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary-soft);
}
.top-btns {
  display: flex;
  align-items: stretch;
  height: 52px;
}
.top-nav-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  border-radius: 10px;
  margin: 4px 3px;
  transition: all 0.22s ease;
  box-shadow: 0 2px 6px rgba(47, 133, 90, 0.12);
}
.top-nav-btn:hover,
.top-nav-btn:active {
  color: var(--primary-soft);
  background: rgba(47, 133, 90, 0.1);
  transform: translate(2px, 2px);
  box-shadow: 0 5px 14px rgba(47, 133, 90, 0.28);
}
.top-nav-btn.active {
  color: var(--primary-soft);
  font-weight: 700;
  background: rgba(47, 133, 90, 0.14);
}
.top-nav-btn .nav-icon {
  width: 18px;
  height: 18px;
}

/* 响应式切换放在最后，保证覆盖默认 display 规则 */
@media (min-width: 768px) {
  .side-nav {
    display: flex;
  }
  .top-nav {
    display: none;
  }
}
</style>
