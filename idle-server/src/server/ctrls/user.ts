import * as express from "express";
import Idle from "../../core/idle";
import * as md5  from 'md5';
var router = express.Router();
export default function (app) {
    app.use('/api/user', router);

};

router.get('*', (req, res, next) => {
    var user = req.session.user;
    if (/create|login/.test(req.path)) {
        next();
        return;
    }
    if (!user) {
        throw "not login";
    }
    next();
})

router.get('/get', async (req, res, next) => {
    var id = req.query.id;
    try {
        var result = null;
        if (id) {
            result = await Idle.Action.User.get(id);
        }
        else {
            result = await Idle.Action.User.get(req.session.user._id);
        }

        res.send({ status: 1, result })
    }
    catch (e) {
        next(e)
    }
})

router.get('/create', async (req, res, next) => {
    var name = req.query.name || "";
    var pw = req.query.pw || "";
    if (!name) {
        throw "请输入名字";
    }
    if (!pw) {
        throw "请输入密码";
    }
    if (pw.length < 6) {
        throw "密码长度必须大于6";
    }
    try {
        var result = await Idle.Action.User.create(name, pw);
        result = await Idle.Action.User.get(result._id);
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
        throw "请输入名字";
    }
    if (!pw) {
        throw "请输入密码";
    }
    try {
        var result = await Idle.Action.User.login(name, pw);
        var date = new Date();
        var maxAge = 30 * 24 * 60 * 60 * 1000;
        res.cookie('u', result._id, { maxAge });
        res.cookie('d', date.getTime(), { maxAge });
        res.cookie('k', md5(result._id + date.getTime() + "boom"), { maxAge });
        req.session.user = result;
        result = await Idle.Action.User.get(result._id);
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e)
    }
});

