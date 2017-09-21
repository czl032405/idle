import * as express from "express";
var router = express.Router();
import Idle from "../../core/idle";
import * as md5 from 'md5';
export default function (app) {
    app.use('/api/hero', router);
};

router.get('*', async function (req, res, next) {
    if (!req.session.user) {
        throw "not login";
    }
    if (/create/.test(req.path)) {
        next();
    }
    var user = req.session.user;
    if (user.heros.length > 0 && !req.session.hero) {
        try {
            var hero = await Idle.Action.Hero.select(user, user.heros[0]._id)
            req.session.hero = hero;
        }
        catch (e) {
            next(e)
        }
    }

    if (!req.session.hero) {
        throw "no hero to selecte";
    }
    next();
})


router.get('/create', async function (req, res, next) {
    var name = req.query.name;
    var user = req.session.user;
    if (!name) {
        throw "请输入名字";

    }

    try {
        var result = await Idle.Action.Hero.create(user, name);
        req.session.hero = result;
        res.send({ status: 1, result })
    }
    catch (e) {
        if (/duplicate key/.test(e.message)) {
            throw "名字已经被使用，请换一个";
        }
        next(e)
    }
})

router.get('/del', async function (req, res, next) {
    var id = req.query.id;
    var user = req.session.user;
    try {
        var result = await Idle.Action.Hero.del(user, id);
        delete req.session.hero;
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e)
    }

})


router.get('/select', async function (req, res, next) {
    var user = req.session.user;
    var hero = req.session.hero;
    var id = req.query.id;
    if (!id) {
        var result = await Idle.Action.Hero.select(user, hero._id);
        res.send({ status: 1, result });
        return;
    }
    try {
        var result = await Idle.Action.Hero.select(user, id);
        req.session.hero = result;
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e)
    }
})


router.get('/myList', async function (req, res, next) {
    var user = req.session.user;
    try {
        var result = await Idle.Action.Hero.myList(user);
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e)
    }
})


router.get('/changeJob', async function (req, res, next) {
    var jobName = req.query.job;
    var hero = req.session.hero;
    if (!jobName) {
        throw "请输入职业名称";
    }
    try {
        var result = await Idle.Action.Hero.changeJob(hero, { name: jobName });
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e);
    }

})

router.get('/changeMap', async function (req, res, next) {
    var mapName = req.query.map;
    var hero = req.session.hero;
    if (!mapName) {
        throw "请输入地图名称";
    }
    try {
        var result = await Idle.Action.Hero.changeMap(hero, { name: mapName });
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e);
    }

})

router.get('/mapList', async function (req, res, next) {
    var hero = req.session.hero;
    try {
        var result = await Idle.Action.Hero.mapList();
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
    var skillsMap = {};
    if (!skillsStr) {
        throw "请输入技能";
    }

    try {
        var skillStrArr = skillsStr.split(',');
        for (let i in skillStrArr) {
            var name = skillStrArr[i].split("-")[0];
            var lv = skillStrArr[i].split("-")[1] || 1;
            skillsMap[name] = lv;
            skills.push({ name, lv });
        }
        if (Object.keys(skillsMap).length != skills.length) {
            throw "ban:query err";
        }
    }
    catch (e) {
        next(e);
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
    if (!equitIds) {
        throw "请输入装备";
    }
    equitIds = equitIds.split(",");
    try {
        var result = await Idle.Action.Hero.useEquits(hero, equitIds);
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e);
    }

})

router.get('/learnJob', async function (req, res, next) {
    var hero = req.session.hero;
    var jobName = req.query.job;
    if(!jobName){
        throw "请输入职业名称";
    }
    try {
        var result = await Idle.Action.Hero.learnJob(hero, { name: jobName });
        res.send({ status: 1, result })
    }
    catch (e) {
        next(e);
    }
})

router.get('/learnSkill', async function (req, res, next) {
    var hero = req.session.hero;
    var skillName = req.query.skill;
    var skillLv = req.query.lv;
    if(!skillName){
        throw "请输入技能名称";
    }
    if(!skillLv){
        throw "请输入技能等级";
    }
    try {
        var result = await Idle.Action.Hero.learnSkill(hero, { name: skillName, lv: skillLv });
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e)
    }
})


router.get('/fight', async function (req, res, next) {
    var hero = req.session.hero;
    console.info('fight ' + new Date());
    try {
        var result = await Idle.Action.Hero.fight(hero);
        res.send({ status: 1, result });
    }
    catch (e) {
        next(e);
    }
})


