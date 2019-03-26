/**
 * 如果你有什么疑问,请联系Mr.许<hpt500-565420423@qq.com>
 * 封装方法公共仓库
 */
const isProd = process.env.NODE_ENV === 'production'
const cookieDomain = isProd ? 'doubapk.com' : ''
export class Utils {
   getTopURL () {
     let url = window.location.host
     if (!url) {
       return
     }
     let domains = url.split('.')
     if (domains.length <= 1) return url
     console.log('domains', domains)
     if (domains[domains.length-2].indexOf('//') != -1) {
       domains[domains.length-2] = domains[domains.length-2].split('//')[1]
     }
     console.log('urlrrr', domains[domains.length-2] + '.' + domains[domains.length-1])
     return domains[domains.length-2] + '.' + domains[domains.length-1]
   }
    // 获取滚动条当前的位置
    getScrollTop () {
        let scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
        scrollTop = document.body.scrollTop
        }
        return scrollTop
    }
    // 获取当前可视范围的高度
    getClientHeight () {
        let clientHeight = 0
        if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
        } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
        }
        return clientHeight
    }
    // 获取文档完整的高度
    getScrollHeight () {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    }
    // 获取当前机型是否移动端
    isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    }
    isHeight(){
        const bh = document.body.clientHeight,
        wh = document.documentElement.clientHeight;
        if(bh < wh){
            console.log("需进行底部固定化")
            document.body.classList.add("addHeight")
        }else{
            document.body.classList.remove("addHeight")
        }
    }
    // 获取文件上传绝对路径
    getObjectURL(file) {
        var url = null;
        if(window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if(window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if(window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url
    }
    setCookie(name, value, day) {
        if(day !== 0){     
            //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
            var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date()+expires);
            document.cookie = name + "=" + value + ";expires=" + date.toUTCString()+";path=/"+ ";domain=" + cookieDomain;
        }else{
            document.cookie = name + "=" + value;
        }
    }
    getCookie(name) {
        var strcookie = document.cookie;//获取cookie字符串
        var arrcookie = strcookie.split(";");//分割
        //遍历匹配
        for ( var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0].trim() == name){
                return arr[1];
            }
        }
        return "";
    }
    clearCookie(name) {  
        this.setCookie(name, "", -1);  
    }
    getArrIndex(arr, obj) {
        let index = null;
        let key = Object.keys(obj)[0];
        arr.every(function(value, i) {
            if (value[key] === obj[key]) {
                index = i;
                return false;
            }
            return true;
        });
        return index;
    }
}






