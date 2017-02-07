const express = require("express");
const router = express.Router();
const Idle = require("../../core/idle");
const md5 = require('md5');
module.exports = function (app) {
    app.use('/user', router);

};

router.get('*', (req, res, next) => {
    var user = req.session.user;
    if (/create|login/.test(req.path)) {
        next();
        return;
    }
    if (!user) {
        next("not login");
        return;
    }
    next();
})

router.get('/get', async (req, res, next) => {
    var id = req.query.id||req.session.user.id;
    try {
        var result =await Idle.Action.User.get(id);

        res.send({status:1,result})
    }
    catch (e) {
        next(e)
    }
})

router.get('/create', async (req, res, next) => {
    var name = req.query.name || "";
    var pw = req.query.pw || "";
    if (!name) {
        next("请输入名字");
        return;
    }
    if (!pw) {
        next("请输入密码");
        return;
    }
    if (pw.length < 6) {
        next("密码长度必须大于6");
        return;
    }
    try {
        var result = await Idle.Action.User.create(name, pw);
        result = await Idle.Action.User.get(result.id);
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e);
    }
})


router.get('/login', async (req, res, next) => {
    var name = req.query.name || "";
    var pw = req.query.pw || "";
    if (!name) {
        next("请输入名字");
        return;
    }
    if (!pw) {
        next("请输入密码");
        return;
    }
    try {
        var result = await Idle.Action.User.login(name, pw);
        var date = new Date();
        var maxAge = 30 * 24 * 60 * 1000;
        res.cookie('u', result.id, { maxAge });
        res.cookie('d', date.getTime(), { maxAge });
        res.cookie('k', md5(result.id + date.getTime() + "boom"), { maxAge });
        req.session.user = result;
        result = await Idle.Action.User.get(result.id);
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e)
    }
});

