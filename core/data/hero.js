const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var SkillSchema = new Schema({ name: String, lv: Number, date: { type: Date, default: Date.now } })
var EquitSchema = new Schema({ name: String, lv: Number, date: { type: Date, default: Date.now } })
var JobSchema = new Schema({ name: { type: String, default: '初心者', }, date: { type: Date, default: Date.now } });
var MapSchema = new Schema({ name: { type: String, default: '新手村', }, date: { type: Date, default: Date.now } });
var ItemSchema = new Schema({ name: String, count: { type: Number, default: 1 }, date: { type: Date, default: Date.now } })
var Hero = mongoose.model('Hero', new Schema({
    name: { type: String, required: true, unique: true },
    baseProps: {
        lv:  { type: Number, default: 1, },
        exp: { type: Number, default: 1, },
        str: { type: Number, default: 1, },
        int: { type: Number, default: 1, },
        agi: { type: Number, default: 1, },
        vit: { type: Number, default: 1, },
        dex: { type: Number, default: 1, },
        luk: { type: Number, default: 1, },
    },
    job: { type: JobSchema },
    map:{type: MapSchema},
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


module.exports = Hero;
