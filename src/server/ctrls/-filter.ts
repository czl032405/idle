import * as express from "express";
var router = express.Router();
import Idle from "../../core/idle";
import * as md5 from 'md5';
export default function (app) {
    app.use('/api', router);
};

router.all('*',(req,res,next)=>{
    res.setHeader('Cache-Control','max-age=0')
    next();
})

router.all('*', async function (req, res, next) {
    if (!req.session.user) {
        var u = req.cookies["u"];
        var d = req.cookies["d"];
        var k = req.cookies["k"];
        var passDate = new Date(d);
        passDate.setDate(new Date().getDate() + 100);
        if (k == md5(u + d + "boom") && new Date() < passDate) {
            var user = await Idle.Action.Admin.User.get(u);
            req.session.user = user;
        }
    }
    next();
})

router.all('*', async function (req, res, next) {
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

