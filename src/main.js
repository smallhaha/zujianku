import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { getData } from './until/api'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import './assets/css/common.css'




// 高亮显示代码片段
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'



// 设置为暗黑主题
// document.body.setAttribute('arco-theme', 'dark')
const app = createApp(App)
app.use(store)
app.use(router)
// app.use(ElementPlus)
app.use(ArcoVue)
app.config.globalProperties.$getData = getData
app.use((app) => {
    app.directive('highlight', {
        // 代码展示高亮显示
        mounted(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                hljs.highlightElement(blocks[i]);
            }
        }
    })
})
app.mount('#app')
// createApp(App).use(store).use(router).use(getSeller).mount('#app')
