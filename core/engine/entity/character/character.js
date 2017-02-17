var path = require('path');
var Entity = require('../entity.js');
var RoundInfo = require('../../round-info.js');
var BattleProps = require('./battle-props.js');
var PositiveSkill = require('../skill/positive/positive.js')
var PasstiveSkill = require('../skill/passtive/passtive.js');
var BaseProps = require('./base-props.js');
var 直接攻击 = require('../skill/positive/直接攻击.js');
const ExpSetting = require('../../../setting/exp.json');
class Character extends Entity {
    constructor(name, baseProps, skills, equits) {
        super(name);
        this.baseProps = baseProps || new BaseProps();
        this.skills = skills || [];
        this.equits = equits || [];
        this.skills.push(new 直接攻击());
        this.buffs=[];
        this.init();
    }

    init() {
        this.buffs = [];
        this.initBattleProps();
        this.initEquits();
        this.initSkills();
        this.initBuffs();
        this.baseProps.maxexp= ExpSetting[this.baseProps.lv];
    }

    initBattleProps() {
        this.battleProps = new BattleProps(this.baseProps)
    }
    initEquits() {
        var equits = this.equits;
        for (let i in equits) {
            equits[i].apply(this);
        }
    }
    initSkills() {
        var positiveSkills = this.positiveSkills = [];
        var passtiveSkills = this.passtiveSkills = [];
        var skills = this.skills;
        for (let i in skills) {
            if (skills[i] instanceof PositiveSkill) {
                this.positiveSkills.push(skills[i]);
            }
            if (skills[i] instanceof PasstiveSkill) {
                this.passtiveSkills.push(skills[i]);
            }
        }

        for (let i in passtiveSkills) {
            passtiveSkills[i].apply(this);
        }
    }

    initBuffs() {
        var buffs = this.buffs;
        for (let i in buffs) {
            buffs[i].apply(this, this);
        }
    }

    parseNextSkill() {
        var index = Math.floor(Math.random() * this.positiveSkills.length);
        return this.positiveSkills[index];
    }

    preAttack(defender) {
        var attacker = this;
        var defender = defender;
        var roundInfo = new RoundInfo();
        roundInfo.attacker = attacker;
        roundInfo.defender = defender;
        return roundInfo;
    }


    attack(roundInfo) {
        var skill = this.parseNextSkill();
        var skillName = skill.__proto__.constructor.name;
        roundInfo.skillName = skillName;
        skill.attack(roundInfo);
        return roundInfo;
    }

    defend(roundInfo) {
        return roundInfo;
    }

    getRoundInfoStatus() {
        var obj = JSON.parse(JSON.stringify(this));
        delete obj.equits;
        delete obj.passtiveSkills;
        delete obj.positiveSkills;
        delete obj.skills;
        delete obj.drops;
        return obj;
    }

    getCurrentStatus() {
         var obj = JSON.parse(JSON.stringify(this));
        return obj;
    }

}
module.exports = Character;