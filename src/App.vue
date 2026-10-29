<script setup>
import { onMounted } from 'vue'
import SideNav from './components/SideNav.vue'
import Welcome from './components/Welcome.vue'
import GameList from './components/GameList.vue'
import LabList from './components/LabList.vue'
import SiteList from './components/SiteList.vue'
import Contact from './components/Contact.vue'
// 音效静音按钮随点击音效一起暂时隐藏，需要时恢复
// import SoundToggle from './components/SoundToggle.vue'

onMounted(() => {
  const hash = window.location.hash
  if (hash) {
    setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) {
        document.documentElement.style.scrollSnapType = 'none'
        el.scrollIntoView()
        setTimeout(() => {
          document.documentElement.style.scrollSnapType = ''
        }, 300)
      }
    }, 100)
  }
})
</script>

<template>
  <SideNav />
  <!-- <SoundToggle /> 音效停用期间隐藏 -->
  <main class="main-content">
    <Welcome />
    <GameList />
    <LabList />
    <SiteList />
    <Contact />
    <footer class="site-footer">
      <span>zlToT · 无限进步</span>
      <span class="footer-sep">·</span>
      <span>Powered by Vue + Vite</span>
    </footer>
  </main>
</template>

<style scoped>
.site-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 28px 20px 40px;
  font-size: 13px;
  color: var(--text-faint);
}
.footer-sep {
  opacity: 0.5;
}
</style>
