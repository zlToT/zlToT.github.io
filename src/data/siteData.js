// ============================================================
// 网站数据配置：小游戏列表 + 有趣网站列表
// 以后新增小游戏 / 网站，只需在这里加一条记录
// ============================================================

// 小游戏列表（新增游戏：1. 把静态文件放入 games/ 目录；2. 在此数组加一条）
export const games = [
  {
    name: '凡人·秘境苟道',
    desc: 'pc修仙题材割草，青元剑诀/噬金虫/九霄神雷，五关Boss战',
    link: 'https://zlToT.github.io/fanren-game/',
    icon: 'fanren',
    tag: '割草',
  },
  {
    name: '拼消块',
    desc: '点一下方块升一级，凑齐三个同色连通块消除，掉落补满还能连锁',
    link: 'https://zlToT.github.io/Blocks/',
    icon: 'blocks',
    tag: '消除',
  },
  {
    name: '记忆翻牌',
    desc: '翻开卡片找配对，考验记忆力的时候到了',
    link: './games/memory.html',
    icon: 'memory',
    tag: '记忆',
  },
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
]

// 有趣网站分类（分类 key 与站点记录的 category 对应）
export const siteCategories = [
  { key: 'all', label: '全部' },
  { key: 'ai', label: 'AI' },
  { key: 'dev', label: '开发' },
  { key: 'design', label: '设计' },
  { key: 'tool', label: '效率工具' },
  { key: 'learn', label: '学习' },
]

// 有趣网站列表（新增收藏：在此数组加一条，category 用上方分类 key）
export const sites = [
  // ── ai ──
  {
    name: 'Ollama 中文站',
    desc: 'Ollama 的中文资源与文档，本地运行和管理大语言模型',
    link: 'https://ollamacn.github.io/' ,
    category: 'ai',
  },
  {
    name: 'OpenAI Codex',
    desc: 'OpenAI 的 AI 代码助手，基于大模型辅助编程与代码生成',
    link: 'https://openai.com/zh-Hans-CN/codex/' ,
    category: 'ai',
  },
  {
    name: 'Work Buddy',
    desc: 'AI 驱动的工作助手，提供智能任务管理与效率工具',
    link: 'https://www.workbuddy.cn/' ,
    category: 'ai',
  },
  {
    name: 'ChatGLM',
    desc: '智谱 AI 推出的中文大语言模型对话助手',
    link: 'https://chatglm.cn/' ,
    category: 'ai',
  },
  {
    name: 'Coze Code',
    desc: '字节跳动推出的 AI 代码开发平台，支持智能编程与协作',
    link: 'https://code.coze.cn/' ,
    category: 'ai',
  },
  {
    name: '豆包',
    desc: '字节跳动推出的 AI 对话助手与智能体，支持问答与任务处理',
    link: 'https://www.doubao.com/' ,
    category: 'ai',
  },
  {
    name: 'Clawd',
    desc: 'OpenClaw 中文社区 开源项目与社区，专注于 AI 模型与应用开发',
    link: 'https://clawd.org.cn/' ,
    category: 'ai',
  },
  {
    name: 'ClawHub',
    desc: 'AI 模型与工具集散地，提供模型分享、下载与协作功能',
    link: 'https://clawhub.ai/' ,
    category: 'ai',
  },

  // ── 开发 ──
  {
    name: 'GitHub',
    desc: '全球最大的代码托管平台，开源项目聚集地',
    link: 'https://github.com',
    category: 'dev',
  },
  {
    name: 'Cloudflare Dashboard',
    desc: '全球领先的云服务平台控制台，提供DNS、CDN、安全防护、边缘计算等一站式管理',
    link: 'https://dash.cloudflare.com/' ,
    category: 'dev',
  },
  {
    name: 'Vercel',
    desc: '前端部署与全球 CDN，一键发布静态站点',
    link: 'https://vercel.com',
    category: 'dev',
  },
  {
    name: 'Cocos 引擎',
    desc: '跨平台游戏开发引擎，原生性能强大',
    link: 'https://www.cocos.com/',
    category: 'dev',
  },
  {
    name: '微信开放文档',
    desc: '小程序 / 公众号开发官方文档',
    link: 'https://developers.weixin.qq.com/doc/',
    category: 'dev',
  },
  {
    name: 'Element UI',
    desc: '基于 Vue 的桌面端组件库',
    link: 'https://element.eleme.cn/#/zh-CN/',
    category: 'dev',
  },
  {
    name: 'Bootstrap 中文',
    desc: '主流 CSS 响应式框架',
    link: 'https://www.bootcss.com/',
    category: 'dev',
  },
  {
    name: 'Swiper',
    desc: '现代触摸滑动轮播组件',
    link: 'https://www.swiper.com.cn/',
    category: 'dev',
  },
  {
    name: 'htmleaf',
    desc: 'HTML5 特效与前端插件资源集合',
    link: 'http://www.htmleaf.com/',
    category: 'dev',
  },
  {
    name: 'npmmirror',
    desc: 'npm 镜像站，加速依赖安装',
    link: 'http://npmmirror.com/',
    category: 'dev',
  },
  {
    name: 'Jenkins 中文',
    desc: '自动化构建与持续集成工具',
    link: 'https://www.jenkins.io/zh/',
    category: 'dev',
  },
  {
    name: 'Gitee',
    desc: '国内代码托管与协作平台',
    link: 'https://gitee.com/',
    category: 'dev',
  },
  {
    name: 'GitCode',
    desc: '开源代码托管与协作社区',
    link: 'https://gitcode.com/',
    category: 'dev',
  },
  {
    name: '印记中文',
    desc: '优质前端技术文档中文翻译',
    link: 'https://docschina.org/',
    category: 'dev',
  },
  {
    name: 'PyPI',
    desc: 'Python 官方包仓库',
    link: 'https://pypi.org/',
    category: 'dev',
  },

  // ── 学习 ──
  {
    name: 'TypeScript 中文',
    desc: 'TypeScript 中文权威文档',
    link: 'https://www.tslang.cn/docs/home.html',
    category: 'learn',
  },
  {
    name: 'Node.js 中文',
    desc: 'Node.js 中文文档',
    link: 'https://nodejs.cn/',
    category: 'learn',
  },
  {
    name: 'Vue 中文',
    desc: '渐进式前端框架官方文档',
    link: 'https://cn.vuejs.org/',
    category: 'learn',
  },
  {
    name: 'MDN Web Docs',
    desc: '权威的 Web 开发文档，前端必查手册',
    link: 'https://developer.mozilla.org/zh-CN/',
    category: 'learn',
  },
  {
    name: 'CSDN',
    desc: '中文 IT 技术社区与博客',
    link: 'https://www.csdn.net/',
    category: 'learn',
  },
  {
    name: 'Python 文档',
    desc: '权威 Python 标准库中文文档',
    link: 'https://docs.python.org/zh-cn/3/library/index.html',
    category: 'learn',
  },
  {
    name: '网道',
    desc: '阮一峰的网络开发文档合集',
    link: 'https://wangdoc.com/',
    category: 'learn',
  },
  {
    name: '菜鸟教程',
    desc: '新手入门编程教程，通俗易懂',
    link: 'https://www.runoob.com/',
    category: 'learn',
  },
  {
    name: 'C语言中文网',
    desc: '编程语言教程网站，实例丰富',
    link: 'http://c.biancheng.net/',
    category: 'learn',
  },
  {
    name: 'W3Cschool',
    desc: '前端与编程技能教程平台',
    link: 'https://www.w3cschool.cn/',
    category: 'learn',
  },

  // ── 效率工具 ──
  {
    name: 'TinyPNG',
    desc: '图片无损压缩，网页图片瘦身神器',
    link: 'https://tinypng.com',
    category: 'tool',
  },
  {
    name: '菜鸟工具',
    desc: '在线小工具合集，编码转换计算',
    link: 'https://www.jyshare.com/',
    category: 'tool',
  },
  {
    name: 'ZeroTool',
    desc: '隐私优先的开发者工具箱，免费且无需注册，所有工具均在浏览器本地运行',
    link: 'https://zerotool.dev/zh/tools/',
    category: 'tool',
  },
  {
    name: 'GeekFormat',
    desc: '综合在线工具箱，提供200+免费工具，支持PDF、图片、JSON处理，数据本地处理',
    link: 'https://geekformat.com/zh-TW/',
    category: 'tool',
  },
  {
    name: '在线工具',
    desc: '程序员常用在线工具集合',
    link: 'https://tool.lu/',
    category: 'tool',
  },
  {
    name: 'remove.bg',
    desc: '智能AI在线抠图，一键自动去除图片背景',
    link: 'https://www.remove.bg/zh',
    category: 'tool',
  },
  {
    name: 'RegExr',
    desc: '正则表达式在线测试与学习工具',
    link: 'https://regexr.com',
    category: 'tool',
  },
  {
    name: 'ProcessOn',
    desc: '在线流程图与思维导图工具',
    link: 'https://www.processon.com/',
    category: 'tool',
  },
  {
    name: '下载站',
    desc: '软件与资源下载平台',
    link: 'http://www.downza.cn/',
    category: 'tool',
  },

  // ── 设计 ──
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
    name: 'iconfont 图标库',
    desc: '阿里海量矢量图标库',
    link: 'https://www.iconfont.cn/',
    category: 'design',
  },
  {
    name: '51PPT模板',
    desc: 'PPT 模板下载资源',
    link: 'https://www.51pptmoban.com/ppt/',
    category: 'design',
  },
  {
    name: '爱给网',
    desc: '2D 像素素材与游戏资源',
    link: 'https://www.aigei.com/game2d/pixel/set/',
    category: 'design',
  },
  {
    name: 'EffectHub',
    desc: '粒子特效与视觉资源',
    link: 'http://www.effecthub.com/particle2dx',
    category: 'design',
  },
]

// 联系方式（来自简历；GitHub 链接为占位，替换成你自己的真实地址）
export const contact = {
  github: 'https://github.com/zlToT',
  email: '1776786960@qq.com',
  location: '中国 · 广州',
  motto: '持续迭代，无限进步',
}
