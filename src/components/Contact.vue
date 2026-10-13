<script setup>
import { contact } from '../data/siteData.js'
</script>

<template>
  <section id="contact" class="section contact">
    <div class="section-inner">
      <p class="section-eyebrow">Contact</p>
      <h2 class="section-title">联系方式</h2>
      <p class="section-desc">
        和其他创意游戏想交流、合作，或者只是打个招呼？随时联系我。
      </p>

      <div class="contact-card glass">
        <div class="contact-intro">
          <h3 class="contact-name">zlToT</h3>
          <p class="contact-motto">{{ contact.motto }}</p>
          <p class="contact-location">{{ contact.location }}</p>
        </div>
        <div class="contact-links">
          <a
            class="contact-link"
            :href="contact.github"
            target="_blank"
            rel="noopener"
          >
            <span class="link-ico github-ico">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </span>
            <span class="link-text">
              <span class="link-label">GitHub</span>
              <span class="link-value">{{ contact.github.replace('https://', '') }}</span>
            </span>
            <span class="link-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </a>

          <a
            class="contact-link"
            :href="'mailto:' + contact.email"
            target="_blank"
            rel="noopener"
          >
            <span class="link-ico mail-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span class="link-text">
              <span class="link-label">邮箱</span>
              <span class="link-value">{{ contact.email }}</span>
            </span>
            <span class="link-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <p class="contact-foot">持续迭代 · 无限进步 · 期待与你相遇</p>
    </div>
  </section>
</template>

<style scoped>
/* 浅绿底压轴：覆盖全局双色交替背景（轻量版深底） */
.contact {
  background: var(--bg-deep) !important;
  color: var(--text-on-deep);
}
.contact .section-title {
  color: var(--text-on-deep);
}
.contact .section-desc {
  color: var(--text-muted);
}
.contact .section-eyebrow {
  color: var(--primary-soft);
}
.contact-card {
  display: grid;
  gap: 28px;
  padding: 30px 28px;
  margin-top: 30px;
  background: rgba(235, 248, 235, 0.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(47, 133, 90, 0.18);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}
@media (min-width: 768px) {
  .contact-card {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 40px;
    align-items: center;
  }
}
.contact-name {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-on-deep);
  margin-bottom: 6px;
}
.contact-motto {
  font-size: 15px;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 6px;
}
.contact-location {
  font-size: 13px;
  color: var(--text-faint);
}

.contact-links {
  display: grid;
  gap: 14px;
}
.contact-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: var(--radius-md);
  background: rgba(235, 248, 235, 0.7);
  border: 1px solid rgba(47, 133, 90, 0.16);
  transition: all 0.25s ease;
}
.contact-link:hover {
  transform: translateY(-3px);
  background: rgba(235, 248, 235, 0.9);
  box-shadow: var(--shadow-soft);
}
.link-ico {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.link-ico svg {
  width: 22px;
  height: 22px;
}
.github-ico {
  color: #fff;
  background: #24292f;
}
.mail-ico {
  color: #fff;
  background: linear-gradient(135deg, var(--primary-soft), var(--primary-pale));
}
.link-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.link-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-faint);
}
.link-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-on-deep);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.link-arrow {
  color: var(--text-faint);
  transition: transform 0.25s ease;
}
.link-arrow svg {
  width: 18px;
  height: 18px;
}
.contact-link:hover .link-arrow {
  transform: translate(3px, -3px);
  color: var(--primary-soft);
}
.contact-foot {
  margin-top: 26px;
  text-align: center;
  font-size: 13px;
  letter-spacing: 1px;
  color: var(--text-faint);
}
</style>
