import { IMonster } from '../data/monster';
import Character from '../engine/character/character';
import { print } from 'util';
import IPreSetting from '../setting/ipre';
import { IHero } from '../data/hero';
import { IUser } from '../data/user';
import Engine from '../engine/engine';
import Data from '../data/data';
import IdleSetting from '../setting/idle';
import ExpSetting from '../setting/exp';
import EquitSetting from '../setting/equit';
import ItemSetting from '../setting/item';
import JobSetting from '../setting/job';
import MapSetting from '../setting/map';
import SkillSetting from '../setting/skill';
import { BattleResult } from "../engine/battle";

class Hero {
    static async create(user: IUser, name: string) {
        var maxHero = IdleSetting.maxHero;
        if (user.heros.length >= maxHero) {
            throw "cant create more heros";
        }
        var result: IHero = await Data.Hero.create({ name });
        user.heros.push({ _id: result._id, name: result.name });
        var result2 = await user.save();
        return result;
    }
    static async del(user: IUser, id: string) {
        var hero = user.heros.find(hero => hero._id == id);
        if (hero) {
            var result: IHero = await Data.Hero.findById(id);
            user.heros = user.heros.filter(hero => hero._id != id);
            await user.save();
            if (result) {
                await result.remove();
            }
            else {
                throw "ban:trys to del hero not exist but own";
            }

            return result;
        }
        else {
            throw "ban:trys to del hero not yours"
        }

    }
    static async select(user: IUser, id: string) {
        var hero = user.heros.find(hero => hero._id == id);
        if (hero) {
            var result = await Data.Hero.findById(id);
            return result;
        }
        else {
            throw "ban:trys to select hero not yours";
        }

    }
    static async myList(user: IUser) {
        var ids: string[] = user.heros.map(hero => hero._id);
        return await Data.Hero.find({ _id: { $in: ids } });
    }
    static async mapList() {
        var maps = JSON.parse(JSON.stringify(MapSetting));
        Object.keys(maps).map(name => {
            delete maps[name].monsters;
            return maps[name];
        })
        return maps;
    }

    static async changeMap(hero: IHero, map: { name: string }) {
        if (!MapSetting[map.name]) {
            throw "ban: trys to enter map not exist";
        }
        var pass = this.handlePre(hero, MapSetting[map.name].pre);
        if (pass) {
            hero.map = map;
            await hero.save();
            return hero.map;
        }
        else {
            throw `you cant enter ${map.name}`;
        }
    }
    static async changeJob(hero: IHero, job: { name: string, date?: Date }) {
        if (hero.learnedJobs.find(learnedJob => learnedJob.name == job.name)) {
            hero.job = job;
            var result = await hero.save();
            return result.job;
        }
        else {
            throw "ban:trys to change to the job not learned";
        }
    }
    static async useSkills(hero: IHero, skills: { name: string, lv: number }[]) {
        var checked = false;
        checked = !skills.find(skill => !hero.learnedSkills.find(learnedSkill => learnedSkill.name == skill.name && learnedSkill.lv == skill.lv))
        if (checked) {
            hero.skills = skills;
            var result = await hero.save();
            return result.skills;
        }
        else {
            throw "ban:trys to use skills not learned";
        }
    }
    static async useEquits(hero: IHero, equitIds: string[]) {
        var checked = true;
        //把装备移回背包
        hero.bagEquits = hero.bagEquits.concat(hero.equits);
        hero.equits = [];
        //检查equitIds是否合法
        checked = !equitIds.find(equitId => !hero.bagEquits.find(bagEquit => bagEquit._id == equitId));
        if (checked) {
            equitIds.forEach(equitId => hero.equits.push(hero.bagEquits[equitId]));
            hero.bagEquits = hero.bagEquits.filter(bagEquit => !equitIds.find(equitId => equitId == bagEquit._id));
            var result = await hero.save();
            return result.equits;
        }
        else {
            throw "ban:trys to use equits not owned";
        }

    }
    static async learnJob(hero: IHero, job: { name: string }) {
        this.calCanLearnJobs(hero);
        var isLearned = !!hero.learnedJobs.find(learnedJob => learnedJob.name == job.name);
        if (isLearned) {
            throw "learnJob fail:learned";
        }
        if (hero.canLearnJobs.find(canLearnJob => canLearnJob.name == job.name)) {
            hero.learnedJobs.push(job);
            hero.job = job;
            var result = await hero.save();
            return result.job;
        }
        else {
            throw "ban:trys to learn job cant learn";
        }

    }

    static async learnSkill(hero: IHero, skill: { name: string, lv: number }) {
        //检测技能是否存在
        if (!(SkillSetting[skill.name] && SkillSetting[skill.name][skill.lv])) {
            throw "ban:trys to learn skill cant learn";
        }

        //检测技能点是否足够
        var cost = SkillSetting[skill.name][skill.lv].cost || 0;
        if (hero.skillPoints < cost) {
            throw "not enough skill points";
        }
        //检测是否可以学习
        this.calCanLearnSkills(hero);
        var canLearn = !!hero.canLearnSkills.find(canLearnSkill => canLearnSkill.name == skill.name && canLearnSkill.lv == skill.lv)
        if (canLearn) {
            var learnedSkill = hero.learnedSkills.find(learnedSkill => learnedSkill.name == skill.name)
            if (learnedSkill) {
                learnedSkill.lv = skill.lv;
                var equitedSkill =hero.skills.find(s=>s.name==skill.name);
                equitedSkill && (equitedSkill.lv=skill.lv);
            }
            else {
                hero.learnedSkills.push(skill);
            }
            this.calCanLearnSkills(hero);
            var result = await hero.save();
            return skill;
        }
        else {
            throw "ban:trys to learn skill cant learn";
        }

    }
    static async addEquits(hero: IHero, equits: { name: string, lv: number }[]) {
        equits.forEach(equit => hero.bagEquits.push(equit));
        return await hero.save();
    }
    static async addItems(hero: IHero, items: { name: string, count: number }[]) {
        items.forEach(item => {
            var bagItem = hero.bagItems.find(bagItem => bagItem.name == item.name);
            if (bagItem) {
                bagItem.count += item.count;
            }
            else {
                hero.bagItems.push(item);
            }
        })
        return await hero.save();
    }

    static async removeEquits(hero: IHero, ids: string[]) {
        hero.equits = hero.equits.filter(equit => !ids.find(id => equit._id == id))
        return await hero.save();
    }
    static async removeItem(hero: IHero, ids: string[]) {
        hero.bagItems = hero.bagItems.filter(item => !ids.find(id => item._id == id))
        return await hero.save();
    }

    static async useMonsters(hero: IHero, ids: string[]) {
        if (ids.length > IdleSetting.maxBattleMonster) {
            throw "ban:trys to use too many monsters";
        }
        var checked = !ids.find(id => !hero.monsters.find(monster => monster._id == id));
        if (checked) {
            hero.battleMonsters = hero.monsters.filter(monster => ids.find(id => monster._id == id))
        }
        else {
            throw "ban:trys to use monsters not yours";
        }
    }


    static async fight(hero: IHero) {
        if (new Date() < new Date(hero.nextActionDate)) {
            return hero.nextActionDate;
        }

        var monsters = await Data.Monster.find({ _id: { $in: hero.battleMonsters.map(m => m._id) } });
        var engineHeroMonsters = monsters.map(monster => this.parseEngineMonster(monster));
        var engineHero = this.parseEngineHero(hero);
        var engineMonsters = this.parseNextMapEngineMonster(hero);

        var battle = Engine.buildBattle([].concat(engineHero).concat(engineHeroMonsters), engineMonsters);
        var result = battle.run();
        await this.handleBattleResult(hero, result);
        return result;
    }

    static async fightTvT(A: IHero[], B: IHero[]) {
        var teamA = A.map(hero => this.parseEngineHero(hero));
        var teamB = B.map(hero => this.parseEngineHero(hero));
        var battle = Engine.buildBattle(teamA, teamB);
        var result = battle.run();
        await this.handleBattleResultTvT(A, B, result);
        return result;

    }

    private static handlePre(hero: IHero, pre?: IPreSetting) {
        var pass = true;
        pre = pre || {};
        if (pre.jobs) {
            pass = !pre.jobs.find(job => !hero.learnedJobs.find(learnedJob => learnedJob.name == job.name));
        }
        if (pre.skills) {
            pass = !pre.skills.find(skill => !hero.learnedSkills.find(learnedSkill => learnedSkill.name == skill.name && learnedSkill.lv >= skill.lv));
        }
        if (pre.equit) {
            pass = !!hero.equits.find(equit => Engine.buildEquit(equit.name, equit.lv).type == pre.equit)
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
    }

    private static calCanLearnJobs(hero: IHero) {
        var canLearnJobs = [];
        Object.keys(JobSetting).forEach(jobName => {
            var isLearned = false;
            isLearned = !!hero.learnedJobs.find(learnedJob => learnedJob.name == jobName);
            if (isLearned) return;

            if (this.handlePre(hero, JobSetting[jobName].pre)) {
                canLearnJobs.push({ name: jobName });
            }

        })
        hero.canLearnJobs = canLearnJobs;

    }
    private static calCanLearnSkills(hero: IHero) {
        var canLearnSkills = [];
        Object.keys(SkillSetting).forEach(skillName => {
            Object.keys(SkillSetting[skillName]).forEach(lvKey => {
                var lv = parseInt(lvKey);
                var isLearned = hero.learnedSkills.find(learnedSkill => learnedSkill.name == skillName && learnedSkill.lv >= lv)
                if (isLearned) return;
                var pass1 = this.handlePre(hero, SkillSetting[skillName][lv].pre);
                var pass2 = Engine.buildSkill(skillName, lv).pre(this.parseEngineHero(hero));
                if (pass1 && pass2) {
                    canLearnSkills.push({ name: skillName, lv });
                }
            })
        })
        hero.canLearnSkills = canLearnSkills;
    }
    private static parseNextMapEngineMonster(hero: IHero) {
        var teams = MapSetting[hero.map.name].teams.filter(team => this.handlePre(hero, team.pre));
        var randomTotal = teams.reduce((acc, team) => { return acc + team.appear }, 0);
        var random = Math.floor(Math.random() * randomTotal) + 1;;
        var target = 0;
        for (let i in teams) {
            target += teams[i].appear;
            if (target >= random) {
                var result: Character[] = [];
                var team = teams[i];
                team.monsters.forEach(ms => {
                    var count = Math.floor(Math.random() * (ms.maxCount - ms.minCount + 1) + ms.minCount);
                    for (let i = 0; i < count; i++) {
                        var lv = Math.floor(Math.random() * (ms.maxLevel - ms.minLevel + 1)) + ms.minLevel;
                        result.push(Engine.buildMonster(ms.name, lv));
                    }
                })
                return result;
            }
        }
        throw "error:parse no monster"
    }
    private static parseEngineMonster(monster: IMonster) {
        monster = JSON.parse(JSON.stringify(monster));
        var engineMonster = Engine.buildMonster(monster.name, monster.lv, monster.levelUpProps);
        monster.lastActionHp!=0 && (engineMonster.battleProps.hp = monster.lastActionHp);
        return engineMonster;
    }
    private static parseEngineHero(hero: IHero) {
        hero = JSON.parse(JSON.stringify(hero));
        var baseProps = Engine.buildBaseProps(hero.baseProps);
        var skills = hero.skills.map(skill => Engine.buildSkill(skill.name, skill.lv));
        var equits = hero.equits.map(equit => Engine.buildEquit(equit.name, equit.lv));
        var job = hero.job.name;
        var engineHero = Engine.buildHero(hero.name, baseProps, skills, equits, job);
        hero.lastActionHp!=0 && (engineHero.battleProps.hp = hero.lastActionHp);
        return engineHero;
    }

    private static async handleBattleResult(hero: IHero, result: BattleResult) {
        var resultInfo = result.resultInfo;
        var monsters = await Data.Monster.find({ _id: { $in: hero.battleMonsters.map(m => m._id) } });
        var now = new Date();
        hero.lastActionDate = now;
        hero.nextActionDate = now;
        hero.nextActionDate.setSeconds(now.getSeconds() + resultInfo.battleDelay / 1000 + resultInfo.duration / 1000);
        var lastEngineHero = resultInfo.A.find(c => c.name == hero.name && c.hasOwnProperty("job"));
        lastEngineHero && (hero.lastActionHp = lastEngineHero.battleProps.hp);
        monsters.forEach(m => {
            var lastEngineMonster = resultInfo.A.find(c => c.name == m.name && c.hasOwnProperty("race"))
            lastEngineMonster&& (m.lastActionHp = lastEngineMonster.battleProps.hp);
        })

        if (resultInfo.dropEquits.length > 0) {
            await this.addEquits(hero, resultInfo.dropEquits);
        }
        if (resultInfo.dropItems.length > 0) {
            await this.addItems(hero, resultInfo.dropItems);
        }
        if (resultInfo.dropExp > 0) {
            hero.baseProps.exp += resultInfo.dropExp;
            while (hero.baseProps.exp > ExpSetting[hero.baseProps.lv]) {
                hero.baseProps.lv++;
                var engineHero = this.parseEngineHero(hero);
                var { skillPoints, baseProps } = engineHero.levelUp();
                hero.skillPoints += skillPoints;
                Object.keys(baseProps).forEach(key => {
                    if (hero.baseProps[key] != undefined) {
                        hero.baseProps[key] += baseProps[key];
                    }
                });
            }
            monsters.forEach(monster => {
                monster.exp += resultInfo.dropExp;
                while (monster.exp > ExpSetting[monster.lv]) {
                    monster.lv++;
                    var engineMonster = this.parseEngineMonster(monster);
                    var { skills } = engineMonster.levelUp();
                    monster.skills = monster.skills.concat(skills)
                }

            })

            this.calCanLearnJobs(hero);
            this.calCanLearnSkills(hero);
        }




        await hero.save();
    }

    private static async handleBattleResultTvT(A: IHero[], B: IHero[], result: BattleResult) {

    }

}

export default Hero;