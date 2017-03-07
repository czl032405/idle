const Engine = require('../engine/engine.js');
const Data = require('../data/data.js');
const IdleSetting = require('../setting/idle.json');
const ExpSetting = require('../setting/exp.json');
const EquitSetting = require('../setting/equit.json');
const ItemSetting = require('../setting/item.json');
const JobSetting = require('../setting/job.json');
const MapSetting = require('../setting/map.json');
const MonsterSetting = require('../setting/monster.json');
const SkillSetting = require('../setting/skill.json');


const Hero = {
    async create(user, name) {
        var maxHero = IdleSetting.maxHero;
        if (user.heros.length >= maxHero) {
            throw "cant create more heros";
        }
        else {
            var result = await Data.Hero.create({ name });
            user.heros.push({ _id: result.id, name: result.name });
            var result2 = await user.save();
            return result;
        }
    },
    async del(user, id) {
        var delIndex = -1;
        var result = null;
        for (let i in user.heros) {
            if (user.heros[i]._id == id) {
                result = await Data.Hero.findById(id);
                await result.remove();
                delIndex = i;
                break;
            }
        }
        if (delIndex >= 0) {
            user.heros.splice(delIndex, 1);
            await user.save();
            return;
        }
        throw "ban:trys to del hero not yours"

    },
    async select(user, id) {
        for (let i in user.heros) {
            if (user.heros[i]._id == id) {
                var result = await Data.Hero.findById(id);
                return result;
            }
        }
        throw "ban:trys to select hero not yours";

    },
    async myList(user) {
        var ids = user.heros.map(function (hero) {
            return hero.id;
        });
        return await Data.Hero.find({ _id: { $in: ids } });
    },
    async mapList(hero) {
        //后期修改为可见列表和hero有关
        var maps = JSON.parse(JSON.stringify(MapSetting));
        var mapsArr = [];
        for (let i in maps) {
            delete maps[i].monsters;
            maps[i].name = i;
            mapsArr.push(maps[i]);
        }
        return mapsArr;

    },

    async changeMap(hero, map) {
        if (!MapSetting[map.name]) {
            throw "ban: trys to enter map not exist";
            return;
        }
        var pre = MapSetting[map.name].pre;
        var pass = this.handlePre(hero, pre);
        if (pass) {
            hero.map = map;
            await hero.save();
            return hero.map;
        }
        else {
            throw `you cant enter ${map.name}`;
        }
    },
    async changeJob(hero, job) {
        var result = null;
        for (let i in hero.learnedJobs) {
            if (hero.learnedJobs[i].name == job.name) {
                hero.job = hero.learnedJobs[i];
                result = await hero.save();
                break;
            }
        }
        if (result) {
            return result.job;
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
            hero.skills = skills;
            result = await hero.save();
            return result.skills;
        }
        else {
            throw "ban:trys to use skills not learned";
        }
    },
    async useEquits(hero, equitIds) {
        var result = null;
        var checked = true;
        var equitIds = equitIds && equitIds.split(",");

        //把装备移回背包
        hero.bagEquits = hero.bagEquits.concat(hero.equits);
        hero.equits = [];
        for (let s in equitIds) {
            checked = false;
            var bagEquitIndex = hero.bagEquits.findIndex(bagEquit => {
                return bagEquit && bagEquit.id == equitIds[s];
            })
            if (bagEquitIndex >= 0) {
                checked = true;
                hero.equits.push(hero.bagEquits[bagEquitIndex]);
                hero.bagEquits.splice(bagEquitIndex, 1);
            }
        }

        if (checked) {
            result = await hero.save();
            return result.equits;
        }
        else {
            throw "ban:trys to use equits not owned";
        }

    },
    async learnJob(hero, job) {
        hero.canLearnJobs = this.calCanLearnJobs(hero);
        for (let i in hero.learnedJobs) {
            if (hero.learnedJobs[i].name == job.name) {
                throw "learnJob fail:learned";
                return;
            }
        }
        var learnIndex = -1;
        for (let i in hero.canLearnJobs) {
            if (hero.canLearnJobs[i].name == job.name) {
                learnIndex = i;
                break;
            }
        }
        if (learnIndex >= 0) {
            hero.learnedJobs.push(job);
            hero.job = job;
            var result = hero.canLearnJobs.splice(learnIndex, 1);
            await hero.save();
            return result;
        }


        throw "ban:trys to learn job cant learn";

    },

    async learnSkill(hero, skill) {
        //检测技能是否存在
        if (!SkillSetting[skill.name + '-' + skill.lv]) {
            throw "ban:trys to learn skill cant learn";
            return;
        }
        //检测技能点是否足够
        var cost = SkillSetting[skill.name + '-' + skill.lv].cost || 0;
        if (hero.skillPoints < cost) {
            throw "not enough skill points";
            return;
        }
        //检测是否可以学习
        hero.canLearnSkills = this.calCanLearnSkills(hero);
        var learnIndex = hero.canLearnSkills.findIndex((clSkill) => {
            return clSkill.name == skill.name && clSkill.lv == skill.lv;
        });
        if (learnIndex < 0) {
            throw "ban:trys to learn skill cant learn";
            return;
        }
        //学习
        var result = hero.canLearnSkills.splice(learnIndex, 1);
        var isSkillLevelup = false;
        for (let j in hero.learnedSkills) {
            if (hero.learnedSkills[j].name == skill.name) {
                hero.learnedSkills[j].lv = skill.lv;
                isSkillLevelup = true;
                break;
            }
        }
        for (let s in hero.skills) {
            if (hero.skills[s].name == skill.name) {
                hero.skills[s].lv = skill.lv;
                break;
            }
        }
        !isSkillLevelup && hero.learnedSkills.push(skill);
        await hero.save();
        return result;


    },
    async addEquits(hero, equits) {
        for (let i in equits) {
            hero.bagEquits.push(equits[i]);
        }

        return await hero.save();
    },
    async addItems(hero, items) {
        for (let i in items) {
            var item = items[i]
            item.count = item.count || 1;
            var hasItem = false;
            for (let j in hero.bagItems) {
                if (hero.bagItems[j].name == item.name) {
                    hero.bagItems[j].count += count;
                    hasItem = true;
                    break;
                    // return await hero.save();
                }
            }
            if (!hasItem) {
                hero.bagItems.push({ name: item, count });
            }

        }
        return await hero.save();
    },
    /**
     * @param {Object} hero
     * @param {Number[]} ids
     */
    async removeEquits(hero, ids) {

    },
    /**
     * @param {Object} hero
     * @param {Number[]} ids
     */
    async removeItem(hero, ids) {

    },
    /**
     * @param {Object} hero
     * @param {Object} hero2
     * @param {Number[]} ids
     */
    async sendEquit(hero, hero2, ids) {

    },
    /**
     * @param {Object} hero
     * @param {Object} hero
     * @param {Number[]} ids
     */
    async sendItem(hero, hero2, ids) {

    },
    handlePre(hero, pre) {
        var pass = true;
        pre = pre || {};
        if (pre.job) {
            pass = false;
            for (let i in hero.learnedJobs) {
                if (hero.learnedJobs[i].name == pre.job) {
                    pass = true;
                    break;
                }
            }
        }
        if (pre.skill) {
            var skillStrs = pre.skill.split(",");
            for (let s in skillStrs) {
                pass = false;
                var name = skillStrs[s].split("-")[0];
                var lv = skillStrs[s].split("-")[1] || 1;
                for (let i in hero.learnedSkills) {
                    if (hero.learnedSkills[i].name == name && hero.learnedSkills[i].lv >= lv) {
                        pass = true;
                        break;
                    }
                }
                if (!pass) {
                    return pass;
                }
            }

        }
        if (pre.equit) {
            pass = false;
            for (let i in hero.equits) {
                if (!EquitSetting[name]) {
                    continue;
                }
                var name = hero.equits[i].name;
                var type = EquitSetting[name].type;
                if (type == pre.equit) {
                    pass = true;
                    break;
                }
            }
        }
        if (pre.baseProps) {
            for (let i in pre.baseProps) {
                pass = false;
                if (hero.baseProps[i] >= pre.baseProps[i]) {
                    pass = true;
                }
            }
        }
        return pass;
    },
    calCanLearnJobs(hero) {
        var canLearnJobs = [];
        for (let i in JobSetting) {
            var isLearned = false;
            for (let j in hero.learnedJobs) {
                if (hero.learnedJobs[j].name == i) {
                    isLearned = true;
                    break;
                }
            }
            if (isLearned) {
                continue;
            }
            if (this.handlePre(hero, JobSetting[i].pre)) {
                canLearnJobs.push({ name: i })
            }
        }
        return canLearnJobs;
    },
    calCanLearnSkills(hero) {
        var canLearnSkills = [];
        for (let i in SkillSetting) {
            var name = i.split("-")[0];
            var lv = i.split("-")[1] || 1;
            var cost = SkillSetting[i].cost || 0;
            var learnedIndex =  hero.learnedSkills.findIndex(skill => skill.name == name && skill.lv >= lv);
            if (learnedIndex>-1) {
                continue;
            }
            if (SkillSetting[i].pre && this.handlePre(hero, SkillSetting[i].pre)) {
                canLearnSkills.push({ name, lv, cost });
                continue;
            }
            if(!SkillSetting[i].pre && Engine.buildSkill(name,lv).pre()){
                canLearnSkills.push({ name, lv, cost });
                 continue;
            }
        }
        return canLearnSkills;

    },
    parseNextEngineMonster(hero) {
        var monsters = MapSetting[hero.map.name].monsters;
        var randomTotal = 0;
        var random = 0;
        var target = 0;
        var targetMonsters = {};
        for (let i in monsters) {
            if (monsters[i].minLevel <= hero.baseProps.lv) {
                randomTotal += monsters[i].appear || 0;
                targetMonsters[i] = monsters[i]
            }
        }
        random = Math.floor(Math.random() * randomTotal) + 1;
        for (let i in targetMonsters) {
            target += targetMonsters[i].appear;
            if (target >= random) {
                var name = i;
                var maxLv = targetMonsters[i].maxLevel || 1;
                var minLv = targetMonsters[i].minLevel || 1;
                var lv = Math.floor(Math.random() * (maxLv - minLv + 1)) + minLv;
                return Engine.buildMonster(i, lv);
            }
        }
        throw "error:parse no monster"
    },
    parseEngineHero(hero) {
        hero = JSON.parse(JSON.stringify(hero));
        var engineHero = Engine.buildHero(hero.name, hero.baseProps,  hero.skills, hero.equits,hero.job);
        engineHero.map = hero.map;
        return engineHero;
    },

    async handleBattleResult(hero, result) {
        var resultInfo = result.resultInfo;
        var now = new Date();
        hero.lastActionDate = now;
        hero.nextActionDate = now;
        hero.nextActionDate.setSeconds(now.getSeconds() + resultInfo.battleDelay / 1000 + resultInfo.duration / 1000);
        if (resultInfo.dropEquits.length > 0) {
            await this.addEquits(hero, resultInfo.dropEquits);
        }
        if (resultInfo.dropItems.length > 0) {
            await this.addItems(hero, resultInfo.dropItems);
        }
        if (resultInfo.dropExp > 0) {
            hero.baseProps.exp += resultInfo.dropExp;
        }
        if (hero.baseProps.exp > ExpSetting[hero.baseProps.lv]) {
            hero.baseProps.lv++;

            var levelUpProps = JobSetting[hero.job.name].levelup.baseProps;
            for (let i in levelUpProps) {
                if (hero.baseProps[i] != undefined) {
                    hero.baseProps[i] += levelUpProps[i];
                }
            }
            hero.skillPoints += Math.ceil(hero.baseProps.lv / 10);
        }
        //WASTE CPU
        hero.canLearnJobs = this.calCanLearnJobs(hero);
        hero.canLearnSkills = this.calCanLearnSkills(hero);
        await hero.save();
    },
    async fight(hero) {
        if (new Date() < new Date(hero.nextActionDate)) {
            return hero.nextActionDate;
        }


        var engineMonster = this.parseNextEngineMonster(hero);
        var engineHero = this.parseEngineHero(hero);
        var battle = Engine.buildBattle(engineHero, engineMonster);
        var result = battle.run();
        await this.handleBattleResult(hero, result);
        return result;
    },





}

module.exports = Hero;