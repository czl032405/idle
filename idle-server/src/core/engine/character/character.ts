import BaseProps from '../base-props';
import Equit from '../equit/equit';
import BattleProps from '../battle-props';
import RoundInfo from '../round-info';
import skill from '../../setting/skill';
import Entity from '../entity';
import Buff from '../skill/buff/buff';
import PasstiveSkill from '../skill/passtive/passtive';
import PositiveSkill from '../skill/positive/positive';
import 直接攻击 from '../skill/positive/直接攻击';
import Skill from '../skill/skill';
import ExpSetting from '../../setting/exp';
import Item from '../item/item';
class Character extends Entity {
    protected readonly baseProps: BaseProps
    protected readonly equits: Equit[]
    protected readonly skills: Skill[]

    index: number //对战标识
    protected drops: { name: string, lv: number, percent: number }[]
    protected levelUpProps: BaseProps
    battleProps: BattleProps
    passtiveSkills: PasstiveSkill[]
    positiveSkills: PositiveSkill[]
    buffs: Buff[]


    constructor(name: string, baseProps?: BaseProps, skills?: Skill[], equits?: Equit[]) {
        super(name);
        this.baseProps = baseProps || new BaseProps();
        this.skills = skills || [];
        this.equits = equits || [];
        this.buffs = [];
        this.drops = [];
        this.levelUpProps = {
            str: 1,
            agi: 1,
            dex: 1,
            int: 1,
            luk: 1,
            vit: 1,
        }

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
            buffs[i].apply(this);
        }
    }

    parseNextSkill() {
        var index = Math.floor(Math.random() * this.positiveSkills.length);
        return this.positiveSkills[index];
    }




    preAttack(friends: Character[], enimies: Character[]) {
        var attacker = this;
        var skill = this.parseNextSkill();
        var defenders = skill.parseDefenders(enimies);
        var roundInfo = new RoundInfo(this, defenders);
        roundInfo.skill = skill;
        this.battleProps.nextInterval = this.battleProps.interval;
        return roundInfo;
    }


    attack(roundInfo: RoundInfo) {
        roundInfo.skill instanceof PositiveSkill && roundInfo.skill.attack(roundInfo);
        return roundInfo;
    }

    defend(roundInfo: RoundInfo) {
        return roundInfo;
    }

    drop() {
        var dropExp = this.baseProps.exp;
        var dropEquits: Equit[] = [];
        var dropItems: Item[] = [];

        for (let i in this.drops) {
            var random = Math.random();
            var drop = this.drops[i]
            if (random < drop.percent) {
                var equit = Equit.build(drop.name, drop.lv);
                equit && dropEquits.push(equit);
                var item = Item.build(drop.name, drop.lv);
                item && dropItems.push(item);
            }
        }

        return {
            dropExp,
            dropItems,
            dropEquits,
        }
    }

    levelUp() {
        var currentLv = this.baseProps.lv;
        var baseProps: BaseProps = this.levelUpProps;
        var skills: { name: string, lv: number }[] = [];
        var skillPoints: number = Math.ceil((this.baseProps.lv + 1) / 10);;
        return {
            skillPoints,
            baseProps,
            skills
        }
    }


    getStatus(): Character {
        var obj = JSON.parse(JSON.stringify(this));
        // delete obj.baseProps;
        delete obj.equits;
        delete obj.passtiveSkills;
        delete obj.positiveSkills;
        delete obj.skills;
        delete obj.drops;
        delete obj.levelUpProps;
        // delete obj.race;
        return obj;
    }

}
export default Character;