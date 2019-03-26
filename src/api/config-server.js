var lruCache = require('lru-cache')

let api
const cached = false

const isProd = process.env.NODE_ENV === 'production'

if (process.__API__) {
    api = process.__API__
} else {
    api = process.__API__ = {
        api: isProd ? '' : '',
        port: 8888,
        timeout: 30000,
        cached:
            cached &&
            lruCache({
                max: 1000,
                maxAge: 1000 * 60 * 10
            }),
        cachedItem: {}
    }
}

module.exports = api
