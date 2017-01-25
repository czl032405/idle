const glob = require("glob");
const path = require("path");
const crypto = require('crypto');
const fs = require('fs');
const express = require("express");
const uuidV4 = require('uuid/v4');
const md5 = require('md5');
const args = process.argv.join(" ");
const Idle = require("../core/idle");

module.exports = function (app) {

    //static
    var staticPath = path.resolve(__dirname, '../client');
    var files = glob.sync('**/**.{js,html}', { cwd: staticPath });
    var manifest = {};
    var staticMap = {};
    files.forEach(function (file) {
        var hash = crypto.createHash('md5');
        var content = fs.readFileSync(path.resolve(staticPath, file), 'utf-8');
        hash.update(content);
        var hex = hash.digest('hex').substr(0, 10);
        manifest[`/${path.posix.join(file)}`] = { hash: file + "?_=" + hex, content }
    });
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

    app.use(function (req, res, next) {
        var ban = function () {
            req.session.ban = true;
            res.status(404);
            res.send()
        }
        var referer = req.headers.referer;
        if (/scu|api/.test(req.path) && !/common|comps/.test(referer)) {
            ban();
            return;
        }
        if (req.session.ban) {
            ban();
            return;
        }
        if (req.query._) {
            res.set("Cache-Control", "max-age=666666666")
            res.setHeader("eggg", "233");
        }
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
        next();
    })
    app.use(express.static(staticPath));


    //scure
    app.use(async function (req, res, next) {
        var _ = req.query._;
        if (req.query._) {
            if (_ == md5(`00${md5(req.sessionID + "boom")}oo`)) {
                next();
                return;
            }
            // if (_ == md5(`oo${md5(req.sessionID + "egg")}00`)) {
            //     next();
            //     return;
            // }
        }
        var user = req.session.user;
        if (user && user.name != "czl") {
            var result = await Idle.Data.User.ban(user.name);
        }
        req.session.ban = true;
        res.status(404);
        res.send()
        // next();
    })

}
