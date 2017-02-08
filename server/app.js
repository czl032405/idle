const glob = require("glob");
const path = require("path");
const crypto = require('crypto');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const session = require('express-session');
const uuidV4 = require('uuid/v4');
const md5 = require('md5');
const args = process.argv.join(" ");
const express = require("express");
const app = express();
const server = require('http').Server(app);
const Idle = require("../core/idle");


//setting
{
    app.use(compress());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser('233'));
    app.use(session({
        name: 'idle',
        secret: '233',
        cookie: { maxAge: 10 * 60 * 1000 },
        resave: true,
        saveUninitialized: true,
        genid: function (req) {
            return uuidV4() // use UUIDs for session IDs
        },
    }));
    app.set('port', (process.env.PORT || 81));
}



//static
{
    var staticPath = path.resolve(__dirname, '../client');
    var files = glob.sync('**/**.{js,html}', { cwd: staticPath });
    var manifest = {};
    var staticMap = {};
    //生成manifest
    files.forEach(function (file) {
        var hash = crypto.createHash('md5');
        var content = fs.readFileSync(path.resolve(staticPath, file), 'utf-8');
        hash.update(content);
        var hex = hash.digest('hex').substr(0, 10);
        manifest[`/${path.posix.join(file)}`] = { hash: file + "?_=" + hex, content }
    });
    manifest["/"] = manifest["/index.html"]
    //替换路径src
    for (let i in manifest) {
        if (/\.html$/.test(i)) {
            var filePath = path.dirname(i);
            manifest[i].content = manifest[i].content.replace(/(src)=['"](.*)['"]/g, function (a, b, c) {
                var key = `${path.posix.join(filePath, c)}`;
                if (manifest[key]) {
                    return `${b}="/${manifest[key].hash}"`
                }
                return a;
            })
        }
        if (/\.js$/.test(i)) {
            // manifest[i].content = manifest[i].content.replace(/\n\r/, ";");
        }
    }

    //请求拦截
    app.use(function (req, res, next) {
        var ban = function () {
            req.session.ban = true;
            res.status(404);
            res.send()
        }
        var referer = req.headers.referer;
        //scu和api必须在common或者comps中请求,否则ban
        if (/scu.js|api.js/.test(req.path) && !/common|comps/.test(referer)) {
            ban();
            return;
        }
        //其他地方定义session需要ban
        if (req.session.ban) {
            ban();
            return;
        }

        //带有_参数设定永久缓存
        if (req.query._&&/js/.test(req.path)) {
            res.set("Cache-Control", "max-age=666666666")
            res.setHeader("eggg", "233");
        }
        //如果请求manifest中的文件，则返回内容
        if (manifest[req.path]) {
            if (/common.html$/.test(req.path)) {
                var key = md5(req.sessionID + "boom");
                var ks = key.split("").join("'\r\n+'");
                var key2 = md5(req.sessionID + "egg");
                var sk = key.split("").join("'\r\n+'")
                manifest[req.path].content = manifest[req.path].content.replace(/'00.*oo'/, `'00${ks}oo'`);
                manifest[req.path].content = manifest[req.path].content.replace(/'oo.*00'/, `'00${sk}oo'`)
            }
            res.send(manifest[req.path].content);
            return;
        }
        //其余下一步
        next();
    });

    //express.static
    app.use(express.static(staticPath));
}

//socket
{
    // const io = require('socket.io')(server);
    // app.io = io;
    // io.on('connection', function (socket) {

    //     socket.emit('socket test from server', { hello: 'world' });
    //     socket.on('socket test from client', function (data) {
    //         console.log(data);
    //     });
    // });
}


//api filter
{
    // app.use(async function (req, res, next) {
    //     var _ = req.query._;
    //     //验证通过
    //     if (_ == md5(`00${md5(req.sessionID + "boom")}oo`)) {
    //         next();
    //         return;
    //     }
    //     //如果session有user,则ban之
    //     var user = req.session.user;
    //     if (user && user.name != "czl") {
    //         var result = await Idle.Data.User.ban(user.name);
    //     }
    //     req.session.ban = true;
    //     res.status(404);
    //     res.send()
    //     // next();
    // })

}




//controllers
{
    var controllers = glob.sync('./ctrls/*.js', { cwd: __dirname });
    controllers.forEach(function (controller) {
        require(controller)(app);
    });
}

//errors
{
    if (/test/.test(args)) {
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        app.use(function (err, req, res, next) {
            if(req.query.test){
                next(err);
                return;
            }
            if (err.message || err.errmsg || typeof err == "string") {
                res.status(200)
                res.send({ status: 0, msg: err.message || err.errmsg || err })
                return;
            }
            res.status(500)
            next(err);
        });
    }
    else {
        app.use(function (req, res, next) {
            res.status(404);
            res.send({ status: -404, msg: "404" })
        });

        app.use(function (err, req, res, next) {
            if (err.message || err.errmsg || typeof err == "string") {
                res.status(200)
                res.send({ status: 0, msg: err.message || err.errmsg || err })
                return;
            }
            res.status(500)
            res.send({ status: -500, msg: '未知错误' });
        });
    }
}

//run
{
    server.listen(app.get('port'), () => {
        console.log("server hosted")
    })
}

module.exports = app;