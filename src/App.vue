<script setup>
import SideNav from './components/SideNav.vue'
import Welcome from './components/Welcome.vue'
import GameList from './components/GameList.vue'
import SiteList from './components/SiteList.vue'
import Contact from './components/Contact.vue'
</script>

<template>
  <SideNav />
  <main class="main-content">
    <Welcome />
    <GameList />
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
