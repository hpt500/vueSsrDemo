import Vue from 'vue'
import Router from 'vue-router';
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

export function createRouter(msg) {
    const router = new Router({
        mode: 'history',
        routes: [
            // { path: '/', redirect: '/home' },
            {
                name: 'home', // 首页
                path: '/home',
                alias: '/',
                component: () => import("V/home/index.vue")
            },

        ],
        scrollBehavior(to, from, savedPosition) {
            console.log("锚点", to.hash)
            if (savedPosition) {
                return savedPosition
            } else if (to.hash) {
                //  console.log(to.hash)
                return {
                    selector: to.hash
                }
            } else {
                return { x: 0, y: 0 }
            }
        },
    })
    router.beforeEach((to, from, next) => {
        console.log('权限鉴权用户')
        
        next()        

    })

    return router
}
