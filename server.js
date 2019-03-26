const express = require('express')
const path = require('path')
const axios = require('axios')
const LRU = require('lru-cache')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')
const net = require('net')
const compression = require('compression');
// Vue打包文件cdn资源路径
const cdnSrcDist = ""
const isProd = process.env.NODE_ENV === 'production'

const config = require('./src/api/config-server')

// 添加cookie值
var cookieParser = require('cookie-parser') // express 处理cookie

const template = fs.readFileSync('./src/index.template.html', 'utf-8')

const server = express()
// cookie 解析中间件
server.use(cookieParser())

//引入request模块
var request = require("request");
// 后台接口url
const sxApi = isProd ? '' : '';

const cookieDomain = isProd ? '' : ''

// 引入 socket.io
// const http = require('http').Server(server)
// const io = require('socket.io')(http)

server.use(async (req, rex, next) => {
    try {
        // console.log('server.js', '++++++++++++++++++++++++++++')
        // console.log(`request with path ${req.path}`)
        await next()
    } catch (err) {
        // console.log(err)
        rex.status = 500
        if (isProd) {
            rex.body = err.message
        } else {
            rex.bosy = 'please try again later'
        }
    }
})

function getTopURL(url) {
    if (!url) {
        return
    }
    let domains = url.split('.')
    if (domains.length <= 1 || domains.length >= 4) return url

    console.log('domains', domains)
    if (domains[domains.length - 2].indexOf('//') != -1) {
        domains[domains.length - 2] = domains[domains.length - 2].split('//')[1]
    }
    return domains[domains.length - 2] + '.' + domains[domains.length - 1]
}

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        template: template,
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        /*basedir: resolve('./dist'),*/
        /*添加cdn地址*/
        basedir: resolve(isProd ? cdnSrcDist : './dist'),
        runInNewContext: false
    }))
}

let renderer;

let readyPromise
if (isProd) {
    // const bundles = require("http://leitaicdn.youshist.cn/dist/vue-ssr-server-bundle.json")
    // console.log('bundles',bundles)

    // 采用cdn
    let bundle, clientManifest
    axios.get(cdnSrcDist + 'vue-ssr-server-bundle.json').then((res) => {
        bundle = res.data
        axios.get(cdnSrcDist + 'vue-ssr-client-manifest.json').then((res) => {
            clientManifest = res.data
            renderer = createRenderer(bundle, {
                clientManifest
            })
            console.log('bundle', bundle)
        })
    })

    // promise 方法
    /*let bundle = new Promise((resolve) => {
      axios.get(cdnSrcDist + 'vue-ssr-server-bundle.json').then((res) => {
        resolve(res.data)
      })
    })
  
    let clientManifest = new Promise((resolve) => {
      axios.get(cdnSrcDist + 'vue-ssr-client-manifest.json').then((res) => {
        resolve(res.data)
      })
    })
  
    Promise.all([bundle,clientManifest]).then(([bundl,clientManifes]) => {
      console.log('bundl', bundl)
      console.log('clientManifes', clientManifes)
      renderer = createRenderer(bundl, {
        clientManifes
      })
    })*/



    // 采用服务器
    /*const bundle = require('./dist/vue-ssr-server-bundle.json')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {
      clientManifest
    })*/


} else {
    readyPromise = require('./build/setup-dev-server')(server, (bundle, options) => {
        renderer = createRenderer(bundle, options)
    })
}


/*const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})
// 资料路径问题 若资源存于云服务器则可替换
server.use(compression({threshold: 0}))
server.use('/dist', serve('./dist', true))
server.use('/static', serve('./src/static', true))
server.use('/service-worker.js', serve('./dist/service-worker.js'))*/


function getToken(cookies) {
    return new Promise((resolve, reject) => {
        console.log("enter promise")
        if (cookies.token && cookies.token != "") {
            resolve()
        } else {
            // 初入斗吧进行访问接口
            console.log('采用request访问后台接口')
            request(sxApi + '', function(error, response, body) {
                
            })
        }
    })
}

server.get('*', (req, res) => {
    var deviceAgent = req.headers['user-agent'].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    console.log('cookie message')
    console.log(req)

    const context = {
        title: 'VueSsr',
        url: req.url,
        ltClass: agentID ? 'lt-mobile-light' : 'lt-pc-dark',
        cookies: req.cookies, // 将http请求中的cookie传入context，等待下一步处理
        isMobile: agentID,
    }
    console.log('rendererrendererrenderer', renderer)
    renderer.renderToString(context, (err, html) => {
        console.log(`whole request: ${Date.now() - 1}ms`)
        if (err) {
            console.log('err', err)
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(html)

        if (!isProd) {
            console.log(`whole request: ${Date.now() - 1}ms`)
        }
    })

})


// function probe(port, callback) {
//     let servers = net.createServer().listen(port)
//     let calledOnce = false
//     let timeoutRef = setTimeout(function () {
//         calledOnce = true
//         callback(false, port)
//     }, 2000)
//     timeoutRef.unref()
//     let connected = false

//     servers.on('listening', function () {
//         clearTimeout(timeoutRef)
//         if (servers)
//             servers.close()
//         if (!calledOnce) {
//             calledOnce = true
//             callback(true, port)
//         }
//     })

//     servers.on('error', function (err) {
//         clearTimeout(timeoutRef)
//         let result = true
//         if (err.code === 'EADDRINUSE')
//             result = false
//         if (!calledOnce) {
//             calledOnce = true
//             callback(result, port)
//         }
//     })
// }
// const checkPortPromise = new Promise((resolve) => {
//     (function serverport(_port = 6180) {
//         // let pt = _port || 8080;
//         let pt = _port;
//         probe(pt, function (bl, _pt) {
//             // 端口被占用 bl 返回false
//             // _pt：传入的端口号
//             if (bl === true) {
//                 // console.log("\n  Static file server running at" + "\n\n=> http://localhost:" + _pt + '\n');
//                 resolve(_pt);
//             } else {
//                 serverport(_pt + 1)
//             }
//         })
//     })()

// })

const port = process.env.PORT || config.port || 6180
console.log(port)
server.listen(port)

// checkPortPromise.then(data => {
//     uri = 'http://localhost:' + data;
//     console.log('启动服务路径' + uri)
//     server.listen(data);
// });




