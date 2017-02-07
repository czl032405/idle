var express = require("express");
const Idle = require("../../core/idle");
var router = express.Router();
module.exports = function (app) {
    app.use('/hero', router);
};

router.get('*', function (req, res, next) {
    if (!req.session.user) {
        next("not login");
        return;
    }
    if (/create/.test(req.path)) {
        next();
        return;
    }
    if (!req.session.hero) {
        next("no selected hero");
        return;
    }
    next();
})

router.get('/', function (req, res, next) {
    res.send("hero")
})


router.get('/create', async function (req, res, next) {
    var name = req.query.name;
    var user = req.session.user;
    try {
        var result = await Idle.Action.Hero.create( user,name);
        res.send({ status: 1, result })
    }
    catch (e) {
        next(e)
    }
})


router.get('/select', async function (req, res, next) {
    var user = req.session.user;
    var id = req.query.id;
    try {
        var result = await Idle.Action.Hero.select(user, id);
        req.session.hero = result;
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e)
    }
})



router.get('/changeJob', async function (req, res, next) {
    var jobName = req.query.job;
    var hero = req.session.hero;
    try {
        var result = await Idle.Action.Hero.changeJob(hero, { name: jobName });
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e);
    }

})

router.get('/useSkills', async function (req, res, next) {
    var hero = req.session.hero;
    var skillsStr = req.query.skills;//a-1,b-1,c-1
    var skills = [];
    try {
        var skillStrArr = skillsStr.split(',');
        for (let i in skillStrArr) {
            var name = skillStrArr[i].split("-")[0];
            var lv = skillStrArr[i].split("-")[1];
            skills.push({ name, lv });
        }
    }
    catch (e) {
        next("ban:query err");
        return;
    }

    try {
        var result = await Idle.Action.Hero.useSkills(hero, skills);
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e);
    }

})




router.get('/useEquits', async function (req, res, next) {
    var hero = req.session.hero;
    var equitIds = req.query.equits;//233,444,555
    try {
        var result = await Idle.Action.Hero.useEquits(hero, equitIds);
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e);
    }

})

router.get('/learnJob',async function(req,res,next){
    var hero = req.session.hero;
    var jobName = req.query.job;
    try{
        var result = await Idle.Action.Hero.learnJob(hero,{job:jobName});
        res.send({status:1,result})
    }
    catch(e){
        next(e);
    }
})

router.get('/learnSkill',async function(req,res,next){
    var hero = req.session.hero;
    var skillName = req.query.skill;
    var skillLv = req.query.lv;
    try{
        var result = await Idle.Action.Hero.learnSkill(hero,{name:skillName,lv:skillLv});
        res.send({status:1,result});
    }
    catch(e){
        next(e)
    }
})


router.get('/fight',async function(req,res,next){
    var hero = req.session.hero;
    try{
        var result = await Idle.Action.Hero.fight(hero);
        res.send({status:1,result});
    }
    catch(e){
        next(e);
    }
})
