var express = require("express");
var router = express.Router();
const Idle = require("../../core/idle");
const md5 = require('md5');
module.exports = function (app) {
    app.use('/', router);
};

router.get('*', async function (req, res, next) {
    if (!req.session.user) {
        var u = req.cookies["u"];
        var d = req.cookies["d"];
        var k = req.cookies["k"];
        var passDate = new Date(parseInt(d));
        passDate.setDate(100);
        if (k == md5(u + d + "boom") && new Date() < passDate) {
            var user = await Idle.Action.Admin.User.get(u);
            req.session.user = user;
        }
    }

    next();
})

router.get('*', async function (req, res, next) {
    var user = req.session.user;
    var hero = req.session.hero;

    if (user && !user.id && user._id) {
        user = new Idle.Data.User(user);
        user.isNew = false;
        req.session.user = user;
    }
    if (hero && !hero.id && hero._id) {
        hero = new Idle.Data.Hero(hero);
        hero.isNew = false;
        req.session.hero = hero;
    }
    next();
})