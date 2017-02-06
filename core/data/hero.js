const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var SkillSchema = new Schema({ name: String, lv: Number, date: { type: Date, default: Date.now } })
var EquitSchema = new Schema({ name: String, lv: Number, date: { type: Date, default: Date.now } })
var JobSchema = new Schema({ name: { type: String, default: '初心者', }, date: { type: Date, default: Date.now } });
var ItemSchema = new Schema({ name: String, count: { type: Number, default: 1 }, date: { type: Date, default: Date.now } })
var Hero = mongoose.model('Hero', new Schema({
    name: { type: String, required: true, unique: true },
    baseProps: {
        lv: Number,
        exp: Number,
        str: Number,
        int: Number,
        agi: Number,
        vit: Number,
        dex: Number,
        luk: Number,
    },
    job: { type: JobSchema, default: {} },
    skills: [
        SkillSchema
    ],
    equits: [
        EquitSchema
    ],
    canLearnJobs: [
        JobSchema
    ],
    learnedJobs: [
        JobSchema
    ],
    canLearnSkills: [
        SkillSchema
    ],
    learnedSkills: [
        SkillSchema
    ],
    bagEquits: [
        EquitSchema
    ],
    bagItems: [
        ItemSchema
    ],
    creatdDate: { type: Date, default: Date.now },
}));



module.exports = {
    /**
     * @param {Object} condition
     */
    async find(condition) {
        return Hero.find(condition || {})
    },
    /**
    * @param {String} id
    */
    async findById(id) {
        return await Hero.findById(id);
    },
    /**
     * @param {String} name
     */
    async create(name) {
        return await Hero.create({ name })
    },
    /**
     * @param {Object} hero
     * @param {Object} user
     */
    async addToUser(hero, user) {
        user.heros.push(hero.id);
        return await user.save();
    },
    /**
     * @param {Object} hero
     * @param {Object} baseProps
     * @param {Number} baseProps.lv
     * @param {Number} baseProps.exp
     * @param {Number} baseProps.str
     * @param {Number} baseProps.int
     * @param {Number} baseProps.agi
     * @param {Number} baseProps.vit
     * @param {Number} baseProps.dex
     * @param {Number} baseProps.luk
     */
    async updateBaseProps(hero, baseProps) {
        Object.assign(hero, { baseProps });
        return await hero.save();
    },
    /**
     * @param {Object} hero
     * @param {Object} job
     * @param {String} job.name
     */
    async changeJob(hero, job) {
        hero.job = job;
        return await hero.save();
    },
    /**
     * @param {Object} hero
     * @param {Object[]} skills
     * @param {String} skills[].name
     * @param {lv} skills[].lv
     */
    async useSkills(hero, skills) {
        hero.skills = skills;
        return await hero.save();
    },
    /**
     * @param {Object} hero
     * @param {Object[]} equits
     * @param {String} equits[].name
     * @param {Number} equits[].lv
     */
    async useEquits(hero, equits) {
        hero.equits = equits;
        return await hero.save();
    },
    /**
     * @param {Object} hero
     * @param {Object} job
     * @param {String} job.name
     */
    async learnJob(hero, job) {

        hero.learnedJobs.push(job);
        return await hero.save();
    },
    /**
     * @param {Object} hero
     * @param {Object} skill
     * @param {String} skill.name
     * @param {Number} skill.lv
     */
    async learnSkill(hero, skill) {
        for (let i in hero.learnedSkills) {
            if (hero.learnedSkills[i].name == skill.name) {
                hero.learnedSkills[i].lv = skill.lv;
                return await hero.save();
            }
        }
        hero.learnedSkills.push(skill);
        return await hero.save();
    },
    /**
     * @param {Object} hero
     * @param {Object} equit
     * @param {String} equit.name
     * @param {Number} equit.lv
     */
    async addEquit(hero, equit) {
        hero.bagEquits.push(equit);
        return await hero.save();
    },
    /**
     * @param {Object} hero
     * @param {Object} item
     * @param {String} item.name
     * @param {Number} item.count
     */
    async addItem(hero, item) {
        item.count = item.count || 1;
        for (let i in hero.bagItems) {
            if (hero.bagItems[i].name == item.name) {
                hero.bagItems[i].count += count;
                return await hero.save();
            }
        }
        hero.bagItems.push({ name: item, count });
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

};