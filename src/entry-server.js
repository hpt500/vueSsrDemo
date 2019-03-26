import { createApp } from './app'
import Q from 'q'
import { api } from '~api'

export default context => {
    try {
        return new Q.Promise((resolve, reject) => {
            const s = Date.now()
            // 可传入参数 context.cookies
            const { app, router, store } = createApp()
            const meta = app.$meta()
            const url = context.url;
            const fullPath = router.resolve(url).route.fullPath
            console.log(fullPath)
            console.log(url)
            console.log(context.cookies)
            if (fullPath !== url) {
                reject({ url: fullPath })
            }
            context.meta = meta
            router.push(url)
            console.log("是否是移动端123")
            console.log(context.isMobile)
            router.onReady(() => {
                const matchedComponents = router.getMatchedComponents()
                if (!matchedComponents.length) {
                    return reject({ code: 404 })
                }
                // 记录访问方式 -客户端访问 -服务端访问
                store.$api = store.state.$api = api(context.cookies)
                store.cookies = store.state.cookies = context.cookies
                store.isMobile = store.state.isMobile = context.isMobile ? true : false
                // 可访问其他vuex方法


                // 对所有匹配的路由组件调用 `asyncData()`
                Promise.all(matchedComponents.map(Component => {
                    if (Component.asyncData) {
                        return Component.asyncData({
                            store,
                            route: router.currentRoute,
                            cookies: context.cookies,
                            isServer: true,
                            isClient: false,
                            isMobile: context.isMobile ? true : false
                        })
                    }
                })).then(() => {
                    console.log(`data pre-fetch: ${Date.now() - s}ms`)
                    // 在所有预取钩子(preFetch hook) resolve 后，
                    // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                    // 当我们将状态附加到上下文，
                    // 并且 `template` 选项用于 renderer 时，
                    // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                    context.state = store.state
                    context.isProd = process.env.NODE_ENV === 'production'

                    resolve(app)
                    // }).catch(reject)
                }).catch(err => {
                    // console.log('rendererror','entry-server',err);
                    //  其次，增加服务端预渲染错误标识，前端拿到标志后重新渲染
                    console.log('服务端渲染错误', err)
                    context.serverError = true;
                    // 让渲染继续执行
                    resolve(app)
                })
            }, reject)
        })
    } catch (e) {
        console.log('这是entry-server异常')
        console.log(e)
        console.log('这是entry-server异常结束')
    }
}
