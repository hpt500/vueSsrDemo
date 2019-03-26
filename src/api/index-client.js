import axios from 'axios'
import qs from 'qs'
import config from './config-client'
import { showMsg } from '~utils'

// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials=true;

function getCookie(name) {
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split(";");//分割
    //遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0].trim() == name) {
            return arr[1];
        }
    }
    return "";
}

axios.interceptors.request.use(
    config => {
        // 接口响应前
        // --可做的操作>

        // -->
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {

    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -404,
            message: response.statusText,
            data: ''
        }
    }
}

function checkCode(res) {
    
    let data
    if (!res) {
        return
    }
    if (res.status === 200 && res.data) {
        data = JSON.parse(res.data)
        let errno = data.errno
        if (data && errno == 70003 || errno == 70072 || errno == 50001) {
            window.location.href = '/404'
            return
        }
    }

    return res
}

export default {
    post(url, data, fileBool = false) {
        let headerFn = fileBool ? {
            'Content-Type': 'multipart/form-data'
        } : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        return axios({
            method: 'post',
            url: config.api + url,
            data: fileBool ? data : qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                ...headerFn
            }
        }).catch((err) => {
            console.log('index-client', err)
        })
            .then(checkStatus)
            .then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(checkStatus)
            .then(checkCode)
    }
}
