const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    api: isProd ? '' : '',
    timeout: 30000,
}
