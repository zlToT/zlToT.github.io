---
name: zltot-deploy
description: zlToT 个人作品集网站（Vue3 + Vite + GitHub Pages）的部署与发布流程。当用户要求部署、上线、发布、推送代码、更新线上站点或查看构建状态时使用。
---

## 部署目标与仓库

- 部署目标：GitHub Pages，访问地址 `https://zlToT.github.io`
- 仓库：`zlToT.github.io`（Public），完整源码上传 **main** 分支，打包产物自动推送 **gh-pages** 分支用于网页访问
- 技术栈：Vue3 + Vite，纯静态网站（无后端、无数据库）；`vite.config.js` 的 `base: './'` 兼容根路径 / 子路径部署

## 一、部署流程（已完成并上线）

1. **创建 GitHub 仓库**：仓库名 `zlToT.github.io`，Public，.gitignore 选 Node
2. **本地初始化项目**：
   ```
   npm create vite@latest zlToT.github.io-site -- --template vue
   cd zlToT.github.io-site
   npm install
   ```
3. 替换全套组件代码，实现导航、五大板块、交互逻辑
4. 本地预览调试：`npm run dev`
5. **推送完整源码到 GitHub**（首次）：
   ```
   git init -b main
   git remote add origin https://github.com/zlToT/zlToT.github.io.git
   git config user.name "zlToT" && git config user.email "1776786960@qq.com"
   git add .
   git commit -m "提交网站完整源码"
   git push --set-upstream origin main
   ```
6. **配置 GitHub Actions 自动部署（当前方案）**：`.github/workflows/deploy.yml` 监听 push main 分支自动执行 `npm ci → npm run build → 部署 dist 到 gh-pages 分支`（peaceiris/actions-gh-pages，`force_orphan` 每次重建）。GitHub Token 自动生成，无需额外配置
7. **仓库设置开启 Pages（仅首次手动一次）**：Settings → Pages → Source 选 `gh-pages` 分支，目录 `/ (root)`，保存
8. **验证上线**：push main 后约 1~3 分钟 Actions 完成，访问 `https://zlToT.github.io/`（已上线 ✓）

## 二、后续更新循环（新增游戏 / 修改内容）

1. 本地修改代码
2. `npm run dev` 本地预览验证
3. 提交源码到 GitHub（**配了 Actions 后，push 即自动更新线上**，无需手动 build/deploy）：
   ```
   git add .
   git commit -m "更新内容描述"
   git push
   ```
4. 等约 1~3 分钟，线上 `https://zlToT.github.io/` 自动更新；可在 GitHub 仓库 **Actions** 页查看构建日志
   - 说明：手动 `npm run build` + `npm run deploy`（gh-pages 工具）方式**已废弃**，会被 Actions 的 `force_orphan` 覆盖冲突，统一走 Actions

## 三、硬性约束

1. 纯静态资源，**不包含后端、数据库、服务端接口**
2. 完整源码上传 main 分支；打包产物自动推送到 gh-pages 分支用于网页访问
3. 仓库为 Public：其他人仅可查看、Fork，**不能直接修改代码**
