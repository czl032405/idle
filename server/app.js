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
    app.set('port', (process.env.PORT || 80));
}


//ban filter
{
        //验证
    app.use(function (req, res, next) {
        if (req.session.ban) {
            next("ban: session ban");
            return;
        }
        next();
    });

    // app.use(async function (req, res, next) {
    //     var _ = req.query._;
    //     //验证通过
    //     if (!/api/.test(req.path) || _ == md5(`00${md5(req.sessionID + "boom")}oo`)) {
    //         next();
    //         return;
    //     }
    //     next("ban:api valid err");
    // })

}


//static
{
    //manifest
    var manifest = {};
    const staticPath = path.resolve(__dirname, '../client');
    const hashMap = {};
    const files = glob.sync('**/**.{js,html,less,css,json}', { cwd: staticPath });
    //生成manifest
    files.forEach(function (file) {
        var hash = crypto.createHash('md5');
        var content = fs.readFileSync(path.resolve(staticPath, file), 'utf-8');
        hash.update(content);
        var hex = hash.digest('hex').substr(0, 10);
        hashMap[`/${path.posix.join(file)}`] = { hash: hex };
        /manifest/.test(file) && (hashMap[`/${path.posix.join(file)}`].content=content);
    });
    hashMap["/"] = hashMap["/index.html"];
    manifest = JSON.parse(hashMap['/manifest.json'].content);
    delete hashMap['/manifest.json'];
    manifest.files = hashMap;

    app.use('/manifest', function (req, res, next) {
        res.setHeader('cache-control',`max-age=${3}`);
        res.send(manifest);
    })

    //express.static
    app.use(express.static(staticPath));
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

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(async function (err, req, res, next) {
        //ban
        if (/ban/.test(err)) {
            var user = req.session.user;
            if (user && user.name != "czl") {
                var result = await Idle.Data.User.ban(user.name);
            }

        }
        next(err);
    });

    app.use(async function (err, req, res, next) {
        if (/api/.test(req.path) && err.message || err.errmsg || typeof err == "string") {
            res.status(200)
            res.send({ status: 0, msg: err.stack || err.errmsg || err })
            return;
        }
        res.status(err.status || 500);
        next(err);

    });

    if (!/test/.test(args)) {
        app.use(function (err, req, res, next) {
            res.send();
        })
    }


}

//run
{
    server.listen(app.get('port'), () => {
        console.log(`server hosted ${app.get('port')}`)
    })
}

module.exports = app;