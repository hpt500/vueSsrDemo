function getTitle (vm) {
    const { title } = vm.$options
    if (title) {
        return typeof title === 'function'
        ? title.call(vm)
        : title
    }
}

const serverTitleMixin = {
    created () {
        const title = getTitle(this)
        if (title) {
            this.$ssrContext.title = `${title} | 斗吧 发现好话题`
        }
    }
}

const clientTitleMixin = {
    mounted () {
        const title = getTitle(this)
        if (title) {
            document.title = `${title} | 斗吧 发现好话题`
        }
    }
}

export default process.env.VUE_ENV === 'server'
? serverTitleMixin
: clientTitleMixin