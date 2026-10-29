<script setup>
import { ref } from 'vue'
import { isMuted, toggleMuted } from '../utils/clickSound.js'

const muted = ref(isMuted())

function onClick() {
  muted.value = toggleMuted()
}
</script>

<template>
  <button
    type="button"
    class="sound-toggle glass"
    :class="{ 'is-muted': muted }"
    data-no-sound
    :title="muted ? '点击开启点击音效' : '点击关闭点击音效'"
    :aria-label="muted ? '开启点击音效' : '关闭点击音效'"
    :aria-pressed="muted"
    @click="onClick"
  >
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <template v-if="muted">
        <path d="m16 9 5 5m0-5-5 5" />
      </template>
      <template v-else>
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18 6a8 8 0 0 1 0 12" />
      </template>
    </svg>
  </button>
</template>

<style scoped>
.sound-toggle {
  position: fixed;
  top: 18px;
  right: 20px;
  z-index: 60;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--primary);
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-card);
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.sound-toggle:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
  color: var(--primary-soft);
}

.sound-toggle:active {
  transform: translateY(0) scale(0.95);
}

.sound-toggle.is-muted {
  color: var(--text-faint);
}

.ic {
  width: 21px;
  height: 21px;
}

/* 移动端顶部导航高 104px，开关下移避免重叠 */
@media (max-width: 767px) {
  .sound-toggle {
    top: 116px;
    right: 14px;
    width: 38px;
    height: 38px;
  }
}
</style>
