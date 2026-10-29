import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 点击音效暂时停用（用户反馈不好用），保留模块代码，需要时取消下面两行注释即可
// import { initClickSound } from './utils/clickSound.js'
// initClickSound()

createApp(App).mount('#app')
