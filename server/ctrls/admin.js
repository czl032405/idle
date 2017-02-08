var express = require("express");
const Idle = require("../../core/idle");
var router = express.Router();
module.exports = function (app) {
    app.use('/admin', router);
};

router.get('*', async (req, res, next) => {
    var user = req.session.user;
    if (!user) {
        next("not login");
        return;
    }
    if (user.name == 'czl') {
        next();
        return;
    }
    else {
        next("ban:trys to use admin");
        return;
    }

})

router.get('/user/list', async (req, res, next) => {
    try {
        var result = await Idle.Action.Admin.User.list();
        res.send({ status: 1, result })
    }
    catch (e) {
        next(e)
    }

})


router.get('/user/ban', async (req, res, next) => {
    var name = req.query.name;
    if (!name) {
        next("请输入名字");
        return;
    }
    try {
        var result = await Idle.Action.Admin.User.ban(name);
        res.send({ status: 1, result });

    }
    catch (e) {
        next(e)
    }
})


router.get('/hero/list', async (req, res, next) => {
    try {
        var result = await Idle.Action.Admin.Hero.list();
        res.send({ status: 1, result })
    }
    catch (e) {
        next(e);
    }

})
