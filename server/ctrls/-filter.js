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

router.get('*',async function(req,res,next){
    var user = req.session.user;
    var hero = req.session.hero;
    
    if(user&&!user.id&&user._id){
        // req.session.user = Idle.Data.User.hydrate(user);
      req.session.user =await Idle.Action.Admin.User.get(user._id);
    }
    if(hero&&!hero.id&&hero._id){
        // req.session.hero =  Idle.Data.Hero.hydrate(hero);
        req.session.hero =await Idle.Action.Admin.Hero.get(hero._id);
    }
    next();
})