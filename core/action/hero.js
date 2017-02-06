const Engine = require('../engine/engine.js');
const Data = require('../data/data.js');

const Hero = {

    async create(user, name) {
        var result = await Data.Hero.create(name);
        var result2 = await Data.Hero.addToUser(result, req.session.user)
        return result;

    },
    async select(user, id) {
        if (user.heros.indexOf(id)) {
            var result = await Data.Hero.findById(id);
            return result;
        }
        else {
            throw "ban:trys to select hero not yours";
        }
    },
    async changeJob(hero, job) {
        var result = null;
        for (let i in hero.learnedJobs) {
            if (hero.learnedJobs[i].name == job.name) {
                result = await Data.Hero.changeJob(hero, hero.learnedJobs[i]);
                break;
            }
        }
        if (result) {
            return result;
        }
        else {
            throw "ban:trys to change to the job not learned";
        }



    },
    async useSkills(hero, skills) {

        var result = null;
        var checked = false;
        for (let s in skills) {
            checked = false;
            for (let i in hero.learnedSkills) {
                if (hero.learnedSkills[i].name == skills[s].name && hero.learnedSkills[i].lv == skills[s].lv) {
                    checked = true;
                    break;
                }
            }
        }
        if (checked) {
            result = await Idle.Data.Hero.useSkills(hero, skills);
            return result;
        }
        else {
            throw "ban:trys to use skills not learned";
        }



    },
    async useEquits(hero, equitIds) {
        var result = null;
        var checked = false;
        var equits = [];
        for (let s in equitIds) {
            checked = false;
            for (let i in hero.bagEquits) {
                if (hero.bagEquits[i].id == equitIds[s]) {
                    checked = true;
                    equits.push(hero.bagEquits[i]);
                    break;
                }
            }
        }
        if (checked) {
            result = await Idle.Data.Hero.useEquits(hero, equits);
            return result;
        }
        else {
            throw "ban:trys to use equits not owned";
        }

    },
    async learnJob(hero, job) {
        for (let i in hero.learnedJobs) {
            if (hero.learnedJobs[i].name == job.name) {
                throw "learnJob fail:learned";
                return;
            }
        }
        for (let i in hero.canLearnJobs) {
            if (hero.canLearnJobs[i].name == job.name) {
                await Data.Hero.learnJob(hero, job);
                return hero.canLearnJobs[i]
            }
        }
        throw "ban:trys to learn job cant learn";

    },

    async learnSkill(hero, skill) {
        for (let i in hero.canLearnSkills) {
            if (hero.canLearnSkills[i].name == skill.name && hero.canLearnSkills.lv == skill.lv) {
                await Data.Hero.learnSkill(hero, skill);
                return hero.canLearnSkills[i]
            }
        }
        throw "ban:trys to learn skill cant learn";
    },
    async fight() {
        //engine parseMonster
        //engine fight
        //handleResultInfo
        //updateBaseProps
        //addEquit
        //addItem

    },




}

module.exports = Hero;