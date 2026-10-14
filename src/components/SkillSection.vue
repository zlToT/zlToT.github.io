<script setup>
import { ref } from 'vue'
import BgEffect from './BgEffect.vue'

// 技能板块：默认隐藏，点击开关按钮展开 / 收起（面试场景手动打开）
// 内容来源：周龙简历（提炼总结关键信息）
const expanded = ref(false)

const profile = {
  name: '周龙',
  years: '6 年游戏开发经验',
  target: '客户端工程师',
  city: '广州',
}

// 核心技能：按维度分组
const skillGroups = [
  { name: '游戏引擎', items: ['Cocos', 'Egret', 'Messiah'] },
  { name: '开发语言', items: ['Python', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Node.js', 'Vue3'] },
  { name: '专业基础', items: ['数据结构', '常用算法', '设计模式', '网络通信', 'MVC 架构'] },
  { name: '工程化能力', items: ['Git / SVN', 'Jenkins 打包流水线', '性能调试', '脚本检查'] },
]

// 核心业务亮点
const highlights = [
  '大型手游 UGC 玩法开发',
  '多款 IP 联动活动落地',
  '多渠道 SDK 接入',
  '海外游戏多语言本地化',
  '客户端性能调优',
  '战斗系统迭代',
]

// 工作经历（时间线）
const experiences = [
  {
    company: '深圳市法本信息（驻场网易《荒野行动》）',
    role: '前端游戏开发工程师',
    period: '2024.06 - 至今',
    brief: 'UGC 玩法、IP 联动、商业化与战斗模块迭代，线上性能优化',
  },
  {
    company: '深圳海拓时代',
    role: '前端游戏开发工程师',
    period: '2021.08 - 2024.05',
    brief: '重度仙侠 MMORPG 迭代、海外本地化、Jenkins 流水线、独立小游戏开发',
  },
  {
    company: '深圳妙策互动',
    role: 'Cocos 开发工程师',
    period: '2021.05 - 2021.08',
    brief: '独立开发模拟经营小游戏《枪火贩子》',
  },
  {
    company: '广州至象科技',
    role: 'Cocos 开发工程师',
    period: '2020.09 - 2021.05',
    brief: 'Cocos Creator + TS MVC 开发《末日剧情杀》，多渠道 SDK 接入',
  },
]

// 代表项目
const projects = [
  {
    name: '荒野行动',
    role: '客户端开发',
    period: '2024.06 - 至今',
    desc: 'UGC 玩法《幻兽家园2》核心模块、鬼灭之刃/火影忍者 IP 联动、性能优化',
  },
  {
    name: '魔么咒',
    role: '客户端开发',
    period: '2022.06 - 2024.05',
    desc: '海外多语言本地化、Jenkins 打包流水线、性能检测脚本',
  },
  {
    name: '除妖大作战',
    role: '客户端开发',
    period: '2022.02 - 2022.06',
    desc: '0-1 仙侠 MMORPG，独立完成指引、养成、组队、副本系统',
  },
  {
    name: '天剑诀',
    role: '客户端开发',
    period: '2021.08 - 2022.02',
    desc: '常规版本迭代、多设备适配、全渠道 SDK 接入',
  },
  {
    name: '枪火贩子',
    role: 'Cocos 开发',
    period: '2021.05 - 2021.08',
    desc: '模拟经营独立游戏，UI 搭建、NPC 议价博弈算法、前后端联调',
  },
  {
    name: '末日剧情杀',
    role: 'Cocos 开发',
    period: '2020.10 - 2021.05',
    desc: '末日生存游戏，背包/采集/探索/任务模块，小游戏渠道接入',
  },
]
</script>

<template>
  <section id="skill" class="section skill">
    <BgEffect type="snow" />
    <div class="section-inner">
      <div class="section-head-row">
        <div>
          <p class="section-eyebrow">SkillSection</p>
          <h2 class="section-title">我的技能</h2>
          <p class="section-desc">
            基于简历提炼的技能与项目亮点，平时对访客保持低调，需要展示时一键展开。
          </p>
        </div>
        <button
          class="toggle-btn"
          :class="{ on: expanded }"
          :aria-expanded="expanded"
          @click="expanded = !expanded"
        >
          <span class="toggle-ico" aria-hidden="true"></span>
          <span>{{ expanded ? '收起技能清单' : '展开技能清单' }}</span>
        </button>
      </div>

      <Transition
        name="skill-fold"
        @before-enter="(el) => { el.style.height = '0' }"
        @enter="(el) => { el.style.height = el.scrollHeight + 'px' }"
        @after-enter="(el) => { el.style.height = 'auto' }"
        @before-leave="(el) => { el.style.height = el.scrollHeight + 'px' }"
        @leave="(el) => { el.style.height = '0' }"
      >
        <div v-if="expanded" class="skill-body">
          <!-- 个人信息条 -->
          <div class="profile-bar glass">
            <span class="profile-name">{{ profile.name }}</span>
            <span class="profile-sep"></span>
            <span>{{ profile.years }}</span>
            <span class="profile-sep"></span>
            <span>{{ profile.target }}</span>
            <span class="profile-sep"></span>
            <span>{{ profile.city }}</span>
          </div>

          <!-- 核心技能 -->
          <h3 class="block-title">核心技能</h3>
          <div class="tag-grid">
            <div v-for="group in skillGroups" :key="group.name" class="tag-group glass">
              <h4 class="tag-group-name">{{ group.name }}</h4>
              <div class="tag-list">
                <span v-for="item in group.items" :key="item" class="tag">{{ item }}</span>
              </div>
            </div>
          </div>

          <!-- 核心业务亮点 -->
          <h3 class="block-title">核心业务亮点</h3>
          <div class="highlight-grid">
            <div v-for="h in highlights" :key="h" class="highlight-item glass">
              <svg
                class="check"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m5 13 4 4L19 7" />
              </svg>
              {{ h }}
            </div>
          </div>

          <!-- 工作经历 -->
          <h3 class="block-title">工作经历</h3>
          <div class="timeline">
            <div v-for="exp in experiences" :key="exp.company" class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-card glass">
                <div class="timeline-head">
                  <span class="timeline-company">{{ exp.company }}</span>
                  <span class="timeline-period">{{ exp.period }}</span>
                </div>
                <div class="timeline-role">{{ exp.role }}</div>
                <p class="timeline-brief">{{ exp.brief }}</p>
              </div>
            </div>
          </div>

          <!-- 代表项目 -->
          <h3 class="block-title">代表项目</h3>
          <div class="project-grid">
            <div v-for="p in projects" :key="p.name" class="project-card glass">
              <div class="project-head">
                <span class="project-name">{{ p.name }}</span>
                <span class="project-period">{{ p.period }}</span>
              </div>
              <div class="project-role">{{ p.role }}</div>
              <p class="project-desc">{{ p.desc }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.skill {
  position: relative;
}
.section-head-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 28px;
}

/* 开关按钮 */
.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 20px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--primary-deep);
  background: rgba(235, 248, 235, 0.75);
  border: 1px solid rgba(47, 133, 90, 0.35);
  box-shadow: var(--shadow-card);
  transition: all 0.25s ease;
}
.toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
}
.toggle-btn.on {
  color: #fff;
  background: linear-gradient(135deg, var(--accent), var(--primary-deep));
  border-color: transparent;
  box-shadow: 0 6px 18px rgba(47, 133, 90, 0.35);
}
.toggle-ico {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: currentColor;
  transition: border-radius 0.25s ease;
}
.toggle-btn.on .toggle-ico {
  border-radius: 50%;
}

/* 展开内容 */
.block-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin: 26px 0 14px;
  padding-left: 12px;
  border-left: 3px solid var(--primary);
}

/* 个人信息条 */
.profile-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 16px 22px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
}
.profile-name {
  font-size: 17px;
  font-weight: 800;
  color: var(--primary-deep);
}
.profile-sep {
  width: 1px;
  height: 16px;
  background: rgba(47, 133, 90, 0.3);
}

/* 技能标签 */
.tag-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.tag-group {
  padding: 18px 20px;
}
.tag-group-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 12px;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--primary-deep);
  background: var(--primary-tint);
  border-radius: 999px;
  padding: 5px 12px;
}

/* 业务亮点 */
.highlight-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.highlight-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
}
.check {
  width: 18px;
  height: 18px;
  color: var(--primary);
  flex-shrink: 0;
}

/* 工作经历时间线 */
.timeline {
  display: grid;
  gap: 12px;
}
.timeline-item {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 14px;
}
.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 20px;
  background: var(--primary);
  box-shadow: 0 0 0 4px rgba(47, 133, 90, 0.18);
}
.timeline-card {
  padding: 16px 20px;
}
.timeline-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}
.timeline-company {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
}
.timeline-period {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  background: rgba(47, 133, 90, 0.12);
  padding: 2px 10px;
  border-radius: 999px;
}
.timeline-role {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary-deep);
  margin-bottom: 6px;
}
.timeline-brief {
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* 代表项目 */
.project-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}
.project-card {
  padding: 16px 20px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.project-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-soft);
}
.project-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}
.project-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
}
.project-period {
  font-size: 11.5px;
  color: var(--text-faint);
  white-space: nowrap;
}
.project-role {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--primary-deep);
  margin-bottom: 6px;
}
.project-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* 折叠动画 */
.skill-fold-enter-active,
.skill-fold-leave-active {
  overflow: hidden;
  transition: height 0.35s ease, opacity 0.3s ease;
}
.skill-fold-enter-from,
.skill-fold-leave-to {
  opacity: 0;
}
</style>
