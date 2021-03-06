import * as express from "express";
var router = express.Router();
import Idle from "../../core/idle";
import * as md5  from 'md5';
export default function (app) {
    app.use('/api/admin', router);
};

router.get('*', async (req, res, next) => {
    var user = req.session.user;
    if (!user) {
        throw "not login";
    }
    if (user.name == 'czl') {
        next();
        return;
    }
    else {
        throw "ban:trys to use admin";
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
        throw "请输入名字";
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
