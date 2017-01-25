const express = require("express");
const router = express.Router();
const Idle = require("../../core/idle");
const md5 = require('md5');
module.exports = function (app) {
    app.use('/user', router);

};

router.get('*', (req, res, next) => {
    var user = req.session.user;
    if(/create|login/.test(req.url)){
        next();
        return;
    }
    if(!user){
        next("not login");
        return;
    }
    if(user.name=="czl"){
        next();
        return;
    }
    
    next("not auth");

    
})

router.get('/list', async (req, res, next) => {
    var result = await Idle.Data.User.find();
    result = JSON.parse(JSON.stringify(result));
    for (let i in result) {
        delete result[i].pw;
    }
    res.send({ status: 1, result })

})

router.get('/get', async (req, res, next) => {
    var id = req.query.id;
    var result = await Idle.Data.User.find({ id });
    res.send({ status: 1, result })
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
        var result = await Idle.Data.User.create(name, pw);
        result = JSON.parse(JSON.stringify(result));
        delete result.pw;
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e)
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
        var result = await Idle.Data.User.login(name, pw);
        if (result) {
            result = JSON.parse(JSON.stringify(result));
            delete result.pw;

            var date = new Date();
            var maxAge = 30 * 24 * 60 * 1000;
            res.cookie('u', result._id, { maxAge });
            res.cookie('d', date.getTime(), { maxAge });
            res.cookie('k', md5(result._id + date.getTime() + "boom"), { maxAge });
            req.session.user = result;
            res.send({ status: 1, result });
        }
        else {
            next("账号或密码不正确");
        }
    }
    catch (e) {
        next(e)
    }
});

router.get('/ban', async (req, res, next) => {
    var name = req.query.name;
    if (!name) {
        next("请输入名字");
        return;
    }
    try {
        var result = await Idle.Data.User.ban(name);
        if (result) {
            result = JSON.parse(JSON.stringify(result));
            delete result.pw;

            res.send({ status: 1, result });
        }
        else {
            next("用户不存在");
        }

    }
    catch (e) {
        next(e)
    }
})