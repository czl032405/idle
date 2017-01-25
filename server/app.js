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


require('./static')(app);

//socket
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.emit('socket test from server', { hello: 'world' });
    socket.on('socket test from client', function (data) {
        console.log(data);
    });
});

//controllers
var controllers = glob.sync('./ctrls/*.js', { cwd: __dirname });
controllers.forEach(function (controller) {
    require(controller)(app);
});

//errors
if (/test/.test(args)) {
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {
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


server.listen(app.get('port'), () => {
    console.log("server hosted")
})

module.exports = app;