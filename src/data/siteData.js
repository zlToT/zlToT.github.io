// ============================================================
// 网站数据配置：小游戏列表 + 有趣网站列表
// 以后新增小游戏 / 网站，只需在这里加一条记录
// ============================================================

// 小游戏列表（新增游戏：1. 把静态文件放入 games/ 目录；2. 在此数组加一条）
export const games = [
  {
    name: '贪吃蛇',
    desc: '经典方向控制，吃食物变长，别撞墙也别咬到自己',
    link: './games/snake.html',
    icon: 'snake',
    tag: '经典',
  },
  {
    name: '俄罗斯方块',
    desc: '堆叠七种方块消行，滑到底可硬降，冲击最高分',
    link: './games/tetris.html',
    icon: 'tetris',
    tag: '经典',
  },
  {
    name: '打地鼠',
    desc: '地鼠冒头就打，限时 30 秒，看你能得多少分',
    link: './games/mole.html',
    icon: 'mole',
    tag: '反应',
  },
  {
    name: '2048',
    desc: '滑动合并相同数字，冲击 2048 大关',
    link: './games/2048.html',
    icon: 'tile',
    tag: '益智',
  },
  {
    name: '记忆翻牌',
    desc: '翻开卡片找配对，考验记忆力的时候到了',
    link: './games/memory.html',
    icon: 'memory',
    tag: '记忆',
  },
]

// 有趣网站分类（分类 key 与站点记录的 category 对应）
export const siteCategories = [
  { key: 'all', label: '全部' },
  { key: 'dev', label: '开发' },
  { key: 'design', label: '设计' },
  { key: 'tool', label: '效率工具' },
  { key: 'learn', label: '学习' },
]

// 有趣网站列表（新增收藏：在此数组加一条，category 用上方分类 key）
export const sites = [
  {
    name: 'GitHub',
    desc: '全球最大的代码托管平台，开源项目聚集地',
    link: 'https://github.com',
    category: 'dev',
  },
  {
    name: 'MDN Web Docs',
    desc: '权威的 Web 开发文档，前端必查手册',
    link: 'https://developer.mozilla.org/zh-CN/',
    category: 'learn',
  },
  {
    name: 'Stack Overflow',
    desc: '程序员问答社区，报错搜索第一站',
    link: 'https://stackoverflow.com',
    category: 'learn',
  },
  {
    name: 'Vercel',
    desc: '前端部署与全球 CDN，一键发布静态站点',
    link: 'https://vercel.com',
    category: 'dev',
  },
  {
    name: 'Canva',
    desc: '在线平面设计工具，海报卡片几分钟搞定',
    link: 'https://www.canva.com',
    category: 'design',
  },
  {
    name: 'Excalidraw',
    desc: '手绘风格的协作画板，画流程图很顺手',
    link: 'https://excalidraw.com',
    category: 'design',
  },
  {
    name: 'Tools',
    desc: '各种工具集合',
    link: 'https://tool.lu/',
    category: 'tool',
  },
  {
    name: '菜鸟工具',
    desc: '各种工具集合',
    link: 'https://www.jyshare.com/',
    category: 'tool',
  },
  {
    name: 'TinyPNG',
    desc: '图片无损压缩，网页图片瘦身神器',
    link: 'https://tinypng.com',
    category: 'tool',
  },
  {
    name: 'RegExr',
    desc: '正则表达式在线测试与学习工具',
    link: 'https://regexr.com',
    category: 'tool',
  },
]

// 联系方式（来自简历；GitHub 链接为占位，替换成你自己的真实地址）
export const contact = {
  github: 'https://github.com/zlToT',
  email: '1776786960@qq.com',
  location: '中国 · 广州',
  motto: '持续迭代，无限进步',
}
