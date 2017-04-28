import BaseProps from '../../base-props';
import Equit from '../equit/equit';
import BattleProps from '../../battle-props';
import RoundInfo from '../../round-info';
import skill from '../../../setting/skill';
import Entity from '../entity';
import Buff from '../skill/buff/buff';
import PasstiveSkill from '../skill/passtive/passtive';
import PositiveSkill from '../skill/positive/positive';
import 直接攻击 from '../skill/positive/直接攻击';
import Skill from '../skill/skill';
import ExpSetting from '../../../setting/exp';

class Character extends Entity {
    baseProps:BaseProps
    battleProps:BattleProps
    equits:Equit[]
    skills:Skill[]
    passtiveSkills:PasstiveSkill[]
    positiveSkills:PositiveSkill[]
    buffs:Buff[]

    constructor(name:string, baseProps?:BaseProps, skills?:Skill[], equits?:Equit[]) {
        super(name);
        this.baseProps = baseProps || new BaseProps();
        this.skills = skills || [];
        this.equits = equits || [];
        this.buffs = [];
        this.init();
    }

    init() {
        this.buffs = [];
        this.passtiveSkills = [];
        this.positiveSkills = [];
        this.initBattleProps();
        this.initEquits();
        this.initSkills();
        this.initBuffs();
        this.baseProps.maxexp = ExpSetting[this.baseProps.lv];
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
                this.positiveSkills.push(<PositiveSkill>skills[i]);
            }
            if (skills[i] instanceof PasstiveSkill) {
                this.passtiveSkills.push(<PasstiveSkill>skills[i]);
            }
        }
        !this.positiveSkills.length && this.positiveSkills.push(new 直接攻击());
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

    preAttack(defender:Character) {
        var attacker = this;
        var defender = defender;
        var roundInfo = new RoundInfo();
        roundInfo.attacker = attacker;
        roundInfo.defender = defender;
        return roundInfo;
    }


    attack(roundInfo:RoundInfo) {
        var skill = this.parseNextSkill();
        var skillName = skill.name;
        roundInfo.skillName = skillName;
        roundInfo.skillLv = skill.lv;
        roundInfo.skillProp = skill.prop;
        skill.attack(roundInfo);
        return roundInfo;
    }

    defend(roundInfo:RoundInfo) {
        return roundInfo;
    }

    getRoundInfoStatus() :Character{
        var obj = JSON.parse(JSON.stringify(this));
        delete obj.equits;
        delete obj.passtiveSkills;
        delete obj.positiveSkills;
        delete obj.skills;
        delete obj.drops;
        return obj;
    }

    getCurrentStatus():Character {
        var obj = JSON.parse(JSON.stringify(this));
        return obj;
    }

}
export default Character;