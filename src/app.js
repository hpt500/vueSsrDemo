import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import { mixins } from './mixin'
import * as filters from './util/filters'
import titleMixin from './util/title'
// import Share from 'vue-social-share'
// import 'muse-ui-message/dist/muse-ui-message.css'; // message css
// import Message from 'muse-ui-message';
// 使用muse message
// Vue.use(Message);

import '@/assets/style/base.scss';

const isProd = process.env.NODE_ENV === 'production'
// 静态资源地址
Vue.prototype.staticSrc = isProd ? "" : ""
// cdn资源地址
Vue.prototype.cdnSrc = ""
// 服务端接口地址 -生产 -开发
Vue.prototype.sqApi = isProd ? '' : ''

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.directive('scrollLoad', {
    bind: function (el, binding) {
        var roll = document.body.scrollTop || document.documentElement.scrollTop
        console.log('document.body.scrollTop', document.body.scrollTop)
        console.log('document.documentElement.scrollTop', document.documentElement.scrollTop)
        window.addEventListener('scroll', () => {
            let di = document.documentElement.scrollTop + document.body.clientHeight === document.body.scrollHeight
            console.log('di', di)
            console.log('document.body.scrollTop', document.body.scrollTop)
            console.log('document.documentElement.scrollTop', document.documentElement.scrollTop)
            console.log('document.body.clientHeight', document.body.clientHeight)
            console.log('document.body.offsetHeight', document.body.offsetHeight)
            console.log('roll', roll)
        })
    }
})
// 混合标题
Vue.mixin(titleMixin)

// 混合全局
Vue.mixin(mixins)

// UI框架注入 10.11 操作
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';
// Vue.use(MuseUI);

// mint移动端左滑控件
// import { CellSwipe } from 'mint-ui';
// import 'mint-ui/lib/style.css'
// Vue.component(CellSwipe.name, CellSwipe);


// Vue.use(Share)

// 注入loading插件
// import 'muse-ui-loading/dist/muse-ui-loading.css';
// import Loading from 'muse-ui-loading';

// Vue.use(Loading);



// 聊天室插件
// import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';
// Vue.use(VueSocketio, socketio(''), createStore());
// import VueWebsocket from "vue-websocket";
// Vue.use(VueWebsocket, "");

console.log('process.browser', process.browser)
if (process.browser) { // -- 该判断下实现服务端下注入涵盖window对象的插件
   
    // 移动端取消300ms点击延迟
    const FastClick = require('fastclick');
    FastClick.attach(document.body);

}


// 二维码
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

// 可于入口文件中导入msg数据 -- 可用作-鉴权 -数据传输
export function createApp(msg) {
    // 创建 router 和 store 实例
    const router = createRouter(msg)
    const store = createStore()
    // 同步路由状态(route state)到 store
    sync(store, router)
    // 创建应用程序实例，将 router 和 store 注入
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    // 暴露 app, router 和 store。
    return { app, router, store }
}
