---
name: zltot-website
description: zlToT 个人作品集网站（Vue3 + Vite + GitHub Pages）的完整需求规范与开发部署流程。当用户要求开发、修改、新增小游戏或部署该网站时使用。当我修改需求的时候，也一并优化skills/requirement.md文件。
---
## 项目概况

- 项目名称：zlToT 个人作品集站点
- 技术栈：Vue3 + Vite，纯静态网站，无后端、无数据库
- 部署目标：GitHub Pages，访问地址 `https://zlToT.github.io`
- 仓库：`zlToT.github.io`，完整源码上传仓库，他人仅可查看、无法修改

## 一、导航栏需求

1. **响应式布局（2026-10 改版 v4，暗黑系）**
   - PC 大屏（宽度 ≥ 768px）：导航固定页面**左侧**（宽度 **280px**，用户锁定勿改），竖向排列，**不需要顶部导航**
   - 侧栏与内容区之间用**明显阴影分割**（`box-shadow: 8px 0 28px rgba(0,0,0,0.5)` + 白色细边框 `1px solid rgba(255,255,255,0.08)`）
   - 侧栏顶部 logo 区：**头像（72px 圆形，`src/assets/头像.jpg`）+ 大号名字「zlToT」（25px 粗体，无副标）**，logo 区与导航列表之间用**白色分隔线**（`1px solid rgba(255,255,255,0.12)`）
   - 移动端（宽度 < 768px）：导航固定页面**顶部**，高度 **104px**，分两段——上段为**头像（38px 圆形）+「zlToT · 无限进步」+「滑动翻页」提示**，下段 5 个导航按钮直接横排（图标+文字竖排），**无汉堡菜单、无下拉弹层**
   - 顶部导航按钮需有**悬浮状态 + 往右下偏移动画**（hover/active 时 `transform: translate(2px, 2px)` + 阴影浮起）
2. 导航菜单共 5 项：`首页`、`技能`、`小游戏`、`有趣网站`、`联系方式`
3. 交互：点击导航项，**在当前主页平滑滚动跳转到对应板块（锚点）**，不新开页面
4. **全屏滚动翻页**：页面启用 `scroll-snap-type: y mandatory`，每个导航板块**至少占一个屏幕高度**（`min-height: 100vh`），鼠标下滑一屏切换到下一个板块内容
5. 导航项间距要拉开（PC 左侧导航项 padding 14px 16px、间距 10px+），视觉上不拥挤
6. UI 风格：**深色玻璃导航**（`rgba(19,27,22,0.6)` + backdrop-filter + 荧光描边），底部注「滑动翻页 · 无限进步」

## 二、主页五大板块（单页内锚点滚动）

### 1. 首页板块（Welcome）

- 网站第一屏，欢迎文案 + 简短个人介绍（游戏开发工程师）
- **4 个入口按钮**：`查看我的技能`（主按钮）、`去玩小游戏`、`有趣网站`、`联系方式`，点击平滑滚动到对应板块
- 布局：居中单栏（**无右侧玻璃信息卡**）——渐变标题（亮绿→荧光绿）+ 描述 + **南孚风大数字统计块**（6年游戏开发 / 4 网页小游戏 / ∞学习热情，大字号）+ 4 按钮
- **首页背景增加代码雨效果**（Matrix 风格 canvas：日文片假名+数字，**暗底亮字符**（主 `#4ADE80`、亮点 `#D9F5E4`、暗色拖尾淡出）；随窗口自适应，随组件卸载停止）

### 2. 技能板块（SkillSection）

- 默认**隐藏不展示**
- 页面放置开关按钮，点击切换展开 / 收起技能内容
- 使用场景：面试时手动打开展示技能清单；普通访客默认看不到
- 内容来源：用户简历（`周龙简历(1).pdf`），提炼关键信息

### 3. 小游戏板块（GameList）

- 卡片网格布局，展示所有网页小游戏
- 卡片内容：游戏名称、简介、缩略图（可选）
- 交互：**点击卡片在当前窗口打开小游戏页面**（不再新开浏览器标签页）；卡片为普通链接，不带 `target="_blank"`
- **板块内容从上往下排列**（不垂直居中）；桌面一行 4 个卡片，内容居中展示
- 预留扩展：新增游戏仅需在配置数组（`src/data/siteData.js` 的 `games`）加一条信息，无需修改页面框架

### 4. 有趣网站板块（SiteList）

- 支持**分类管理**，展示收藏 / 喜欢的外部网站链接
- 卡片展示，点击新开标签访问外部站点
- **板块内容从上往下排列**（不垂直居中）；桌面一行 4 个卡片，内容居中展示

### 5. 联系方式板块（Contact）

- 放置个人 GitHub 地址、邮箱等联系信息
- 背景为**暗色稍亮底**（`#0F1712`，比主背景亮一档），卡片用**深色玻璃**（`rgba(19,27,22,0.78)`）+ 荧光绿描边，文字浅色

## 三、小游戏独立页面规则

1. 所有小游戏静态页面统一放在项目 `public/games/` 目录下（构建后即 `/games/`，可访问）
2. 每个小游戏为独立 HTML，完全独立运行，和主页互不干扰
3. **文件命名语义化**（不用 `game-01` 序号）：`snake.html`（贪吃蛇）/ `tetris.html`（俄罗斯方块）/ `mole.html`（打地鼠）/ `2048.html`（2048）/ `memory.html`（记忆翻牌）
4. **返回按钮**：默认每个游戏页底部（game-container 下方）有**水平居中**的「⬅ 返回」黄色按钮，点击执行 `history.back()`；**俄罗斯方块例外**：「⬅ 返回」与「🧩 新游戏」在同一行（btn-row，**两按钮等宽各 50%**（flex:1 1 0%、统一 padding 8px 14px），宽度总和 = game-main 宽度、8px 缝隙不留空、高度一致 37px）；点击卡片在当前窗口打开
5. **开始按钮**：`snake.html` 与 `tetris.html` 均**无开始按钮**，加载即自动开始（`start()` / `resetGame()`）；「🧩 新游戏」/「🐍 新的一局」按钮即重新开始
6. **深色沉浸统一**：5 个游戏页全部用深色沉浸式背景（`linear-gradient(160deg,#0a0c10 0%,#101613 50%,#0a0c10 100%)` / tetris `#03060C` + 粒子星空），深色玻璃容器、黄色 `#FACC15` 按钮与数字、emoji 标题（🎮/🔨/🧠）与 HUD 图标；风格卡通/像素 + 特殊符号强化视觉；`snake.html` 是用户自写版本，**不得改动其游戏画面效果**
7. **防开发者工具（公共 common.js）**：5 个游戏页均引用 `public/games/common.js`（拦截 F12、Ctrl+Shift+I/J/C、Ctrl+U 及右键菜单 contextmenu，禁止查看源码），代码不内联、复用；**调试模式**：URL 带 `?debug` 或 `?debug=1` 时跳过所有拦截（可正常按 F12 查看标签），用于开发排查
8. **背景个性化**：各游戏背景不呆板、有主题——2048 漂浮数字世界（JS 生成彩色半透明数字上浮）、打地鼠背景小老鼠 🐹 来回走动、记忆翻牌右上角浅色月亮 + 星光 + **上方随机 ⭐✨ 闪烁**（16 颗、随机位置/大小/延迟）、贪吃蛇背景**随机水果 🍎🍌🍇🍊🍓🍉 渐入渐出**（7 个、fixed 层、循环动画）；均为 fixed 背景层、pointer-events:none、半透明，不挡交互
9. **玩法细节**：贪吃蛇蛇头亮绿 `#7DD956` + 眼睛（朝向移动方向）、身体深绿 `#58B13A`，食物用 🍎 emoji 绘制；打地鼠每次随机 1~3 只地鼠冒出；2048 初始显示「怎么玩」引导（方向键/滑动移动、相同数字合并翻倍、目标 2048），点击「开始游戏」后开局
10. **最高记录（localStorage）**：贪吃蛇 `snake-best`、俄罗斯方块 `tetris-best`、2048 `g2048-best`、打地鼠 `mole-best`、记忆翻牌 `memory-best`；snake/tetris/2048/mole 页面显示 🏆 最高分（实时刷新），memory 显示最佳步数
11. **音效与特效（公共 common.js 音效库 window.SFX）**：Web Audio 合成无外部文件——贪吃蛇吃到 🍎 `SFX.eat()` + 蛇头粒子迸发特效；俄罗斯方块**方块落地 `SFX.hit()`**、消行 `SFX.clear()` + 棋盘白闪 120ms + 分数弹跳；打地鼠打中 `SFX.hit()` + 💥 弹起特效；2048 合并 `SFX.merge()` + 格子弹跳动画；记忆翻牌翻牌 `SFX.flip()`、配对成功 `SFX.match()` + 卡片闪光；游戏结束统一 `SFX.over()`
12. 后续新增小游戏操作流程：
   1. 将小游戏完整静态文件放入 `public/games/` 文件夹（语义命名）
   2. 在主页小游戏列表配置数组（`src/data/siteData.js` 的 `games`）新增一条卡片信息（名称、简介、链接、icon key）
   3. 若用新 icon key，在 `GameList.vue` 的 `gameEmoji` map 补 emoji，并按需加 `tone-` 渐变底；本地预览，提交源码，打包部署

## 四、项目目录结构

```
zlToT.github.io-site
├── index.html                 # 入口页面
├── design-color.md            # 视觉设计 skill 文档
├── package.json
├── vite.config.js             # base 设为 './'，兼容 GitHub Pages
├── public
│   ├── favicon.svg
│   └── games                  # 小游戏独立页面（构建后复制到 dist/games/）
│       ├── common.js          # 公共脚本（防 F12/右键 + 音效库 SFX，?debug 跳过拦截），所有游戏页引用
│       ├── snake.html         # 贪吃蛇（用户自写深色沉浸 + 🏆最高分 + 音效特效，效果勿动）
│       ├── tetris.html        # 俄罗斯方块（深色粒子 + 🏆最高分 + 底部返回）
│       ├── mole.html          # 打地鼠（深色沉浸 + emoji + 底部返回）
│       ├── 2048.html          # 2048（深色沉浸 + emoji + 底部返回）
│       └── memory.html        # 记忆翻牌（深色沉浸 + emoji + 底部返回）
└── src
    ├── App.vue                # 主页面，组合所有板块
    ├── main.js
    ├── style.css              # 全局样式：暗黑系 token、全屏 scroll-snap、深/更深 section 交替、绿色光晕背景
    ├── assets
    │   └── 头像.jpg           # 用户头像（侧栏 72px 圆形 logo / 移动端顶部 38px）
    ├── data
    │   └── siteData.js        # 小游戏 / 有趣网站 / 联系方式配置数组
    └── components
        ├── SideNav.vue        # 响应式导航：PC 左侧 280px（头像 logo + 分隔线）/ 移动端顶部头像区+直排按钮（无汉堡）
        ├── Welcome.vue        # 首页欢迎板块：暗底代码雨 + 渐变标题 + 大数字统计块 + 4 个入口按钮
        ├── SkillSection.vue   # 技能板块 + 显隐开关（简历内容）
        ├── GameList.vue       # 小游戏卡片列表（桌面一行 4 个，居中，内容从上往下；卡通 emoji 图标 + 每游戏独立 tone 渐变底）
        ├── SiteList.vue       # 带分类的网站收藏列表（桌面一行 4 个，居中，内容从上往下）
        └── Contact.vue        # 联系方式板块（暗色深玻璃）
```

## 五、设计系统（系统 D）

- 依据 `design-color.md` 设计系统 D（浅绿玻璃，不做暗黑映射）：
  - 背景起点 `#E8F3EC`（--bg-start）/ 背景终点 `#D4E8DA`（--bg-end）；body 用椭圆径向渐变 `radial-gradient(ellipse at 30% 40%, #E8F3EC, #D4E8DA)`
  - 玻璃底 `rgba(235,248,235,0.65)`（--glass-base）/ 玻璃边 `rgba(80,120,90,0.18)`（--glass-edge）
  - 主绿 `#2F855A`（--green-accent）/ 浅绿 `#57B68C`（--green-light）
  - 深文字 `#1A2E24`（--text-dark）/ 弱文字 `#406653`（--text-dim）
  - 标题渐变 `linear-gradient(135deg, #1E4A2F, #2F855A)`；大数字渐变 `rgb(35,107,72)→rgb(47,133,90)`
  - 全局光晕 `body::before`：`rgba(87,182,108,0.12)` / `rgba(125,207,166,0.1)`
  - 侧栏浅绿玻璃 `rgba(225,242,225,0.7)` + 阴影 `rgba(40,70,50,0.15) 8px 0 25px -12px`
  - 卡片 hover：背景 `rgba(47,133,90,0.12~0.15)` + 描边变 `#2F855A`；按钮主绿底 `#2F855A` 渐变 + 白字
- 布局规格：侧栏 **280px**（用户锁定勿改回）；内容区最大宽度 **1220px**（`--content-max`）；小游戏/网站卡片**桌面一行 4 个**（≥1100px 4 列 / ≥768px 3 列 / 移动端 2 列），卡片内容居中
- 首页代码雨：canvas 铺满板块，日文片假名+数字，**浅底深绿字符**（主体 `#2F855A`、亮点 `#57B68C`、浅绿 `rgba(232,243,236,0.08)` 拖尾淡出）；无键盘交互，随组件卸载停止
- 改色入口：优先改 `src/style.css` 的 CSS 变量 token，组件内引用 `var(--xxx)` 自动跟随；独立小游戏页（`public/games/*.html`）颜色需单独替换
- **改版史**：v1 小清新（系统 A）→ v2 南孚深蓝（系统 B）→ v3 墨绿荧光绿（系统 B，浅底）→ v4 暗黑荧光绿（系统 C，用户不满意）→ v5 暗黑+参考绿（系统 C 更新，用户不满意）→ **v6 系统 D 治愈系（浅绿玻璃，全色值照搬参考站，当前）**

## 六、部署流程

1. **创建 GitHub 仓库**：仓库名 `zlToT.github.io`，Public，.gitignore 选 Node
2. **本地初始化项目**：
   ```
   npm create vite@latest zlToT.github.io-site -- --template vue
   cd zlToT.github.io-site
   npm install
   ```
3. 替换全套组件代码，实现导航、五大板块、交互逻辑
4. 本地预览调试：`npm run dev`
5. **推送完整源码到 GitHub**：
   ```
   git init
   git remote add origin https://github.com/zlToT/zlToT.github.io.git
   git add .
   git commit -m "提交网站完整源码"
   git push -u origin main
   ```
6. 安装部署工具 gh-pages：`npm install gh-pages --save-dev`
   并在 `package.json` scripts 添加：`"deploy": "gh-pages -d dist"`
7. 打包 + 一键部署：`npm run build` + `npm run deploy`
8. 仓库设置开启 Pages：Settings → Pages → Source 分支选 `gh-pages`，目录 `/ (root)`，等待上线

## 七、后续更新循环（新增游戏 / 修改内容）

1. 本地修改代码
2. `npm run dev` 本地预览验证
3. 提交源码到 GitHub：
   ```
   git add .
   git commit -m "更新内容描述"
   git push
   ```
4. 打包并更新线上站点：
   ```
   npm run build
   npm run deploy
   ```

## 八、硬性约束

1. 纯静态资源，**不包含后端、数据库、服务端接口**
2. 完整源码上传 main 分支；打包产物自动推送到 gh-pages 分支用于网页访问
3. 仓库为 Public：其他人仅可查看、Fork，**不能直接修改代码**
