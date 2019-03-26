import {
    createApp
} from './app'
import Vue from 'vue'
import api from '~api'
import 'toastr/build/toastr.css'

import {Utils} from '@/util/index.js'
let util = new Utils()

const {
    app,
    router,
    store
} = createApp(util.getCookie('uid'))


import theme from 'muse-ui/lib/theme';
if(util.isMobile()){
    console.log("是移动端喔")
    // theme.use('ltlight');
    store.isMobile = store.state.isMobile = true
}else {
    // theme.use('ltdark');
    console.log("不是移动端喔")
}
Vue.use(theme);

Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const {
            asyncData
        } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})




// 将服务端渲染时候的状态写入vuex中
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
    store.$api = store.state.$api = api
    // 可做其他操作 -- 例如初始化
    
}

router.onReady(() => {
    
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        // 我们只关心之前没有渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        if (!activated.length) {
            return next()
        }

        // 这里如果有加载指示器(loading indicator)，就触发
        Promise.all(activated.map(c => {
            /**
             * 两种情况下执行asyncData:
             * 1. 非keep-alive组件每次都需要执行
             * 2. keep-alive组件首次执行，执行后添加标志
             */
            if (c.asyncData) {
                return c.asyncData({
                    store,
                    route: to,
                    isServer: false,
                    isClient: true,
                    isMobile: store.state.isMobile
                })
            }
        })).then(() => {
            // 停止加载指示器(loading indicator)
            next()
        }).catch(next)
    })
  app.$mount('#app')
})

// service worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js');
// }
if ('serviceWorker' in navigator) {
    console.log("SW present !!! ");
    navigator.serviceWorker.register('/service-worker.js', {
        //scope: '/toto/'
    }).then(function (registration) {
        console.log('Service worker registered : ', registration.scope);
    })
        .catch(function (err) {
            console.log("Service worker registration failed : ", err);
        });
}
