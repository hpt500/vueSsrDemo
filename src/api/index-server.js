import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from './config-server'
// import { sleep } from '~utils'
// const SSR = global.__VUE_SSR_CONTEXT__
// const SSRCookies = SSR.cookies || {}

// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials=true;

const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie += item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {}

export const api = (cookies) => {
    return {
        cookies,
        api: axios.create({
            baseURL: config.api,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                // cookie: parseCookie(cookies),
                // 可从enter入口文件中获取请求头需要设置的数据 -- xyx
                // Authorization -- 进行设置
            },
            timeout: config.timeout
        }),
        getCookes() {
            return this.cookies
        },
        post(url, data) {
            const cookies = this.getCookes() || {}
            const aid = cookies.aid || ''
            const key = md5(url + JSON.stringify(data) + aid)
            if (config.cached && data.cache && config.cached.has(key)) {
                return Promise.resolve(config.cached.get(key))
            }
            return this.api({
                method: 'post',
                url,
                data: qs.stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(res => {
                if (config.cached && data.cache) config.cached.set(key, res)
                
                return res
            })
            .catch(error => {
                console.log(error);
            });
        },
         async get(url, params) {
            const cookies = this.getCookes() || {}
            const aid = cookies.aid || ''
            const key = md5(url + JSON.stringify(params) + aid)
            if (config.cached && params.cache && config.cached.has(key)) {
                return Promise.resolve(config.cached.get(key))
            }
            return this.api({
                method: 'get',
                url,
                params
            }).then(res => {
                if (config.cached && params.cache) config.cached.set(key, res)
              console.log('服务器我来', res)
              return res
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}
