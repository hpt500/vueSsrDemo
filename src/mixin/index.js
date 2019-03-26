export const mixins = {
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to,
                isMobile: this.$store.state.isMobile
            }).then(next).catch(next)
        } else {
            next()
        }
    },
    beforeMount() {
        const { asyncData } = this.$options
        if (asyncData) {
            // 将获取数据操作分配给 promise
            // 以便在组件中，我们可以在数据准备就绪后
            // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route,
                isMobile: this.$store.state.isMobile
            })
        }
    }
}