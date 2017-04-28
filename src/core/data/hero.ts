import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;



interface IHero extends mongoose.Document {
    _id:string
    name: string
    baseProps: {
        lv: number
        exp: number
        str: number
        int: number
        agi: number
        vit: number
        dex: number
        luk: number
    }
    job: {
        name: string
        date?: Date
    }
    map:{
        name:string
        date?:Date
    }
    skills:{name:string,lv:number,date?:Date}[]
    equits:{_id:string,name:string,lv:number,date?:Date}[]
    canLearnJobs:{name:string,date?:Date}[]
    learnedJobs:{name:string,date?:Date}[]
    skillPoints:number
    canLearnSkills:{name:string,lv:number,date?:Date}[]
    learnedSkills:{name:string,lv:number,date?:Date}[]
    bagEquits:{_id?:string,name:string,lv:number,date?:Date}[]
    bagItems:{_id?:string,name:string,count:number}[]
    lastActionDate:Date
    nextActionDate:Date
}



var SkillSchema = new Schema({ name: { type: String, default: '直接攻击' }, lv: { type: Number, default: 1 }, cost: { type: Number, default: 0 }, date: { type: Date, default: Date.now } })
var EquitSchema = new Schema({ name: String, lv: Number, date: { type: Date, default: Date.now } })
var JobSchema = new Schema({ name: { type: String, default: '初心者', }, date: { type: Date, default: Date.now } });
var MapSchema = new Schema({ name: { type: String, default: '新手村', }, date: { type: Date, default: Date.now } });
var ItemSchema = new Schema({ name: String, count: { type: Number, default: 1 }, date: { type: Date, default: Date.now } })
var Hero = mongoose.model<IHero>('Hero', new Schema({
    name: { type: String, required: true, unique: true },
    baseProps: {
        lv: { type: Number, default: 1, },
        exp: { type: Number, default: 1, },
        str: { type: Number, default: 1, },
        int: { type: Number, default: 1, },
        agi: { type: Number, default: 1, },
        vit: { type: Number, default: 1, },
        dex: { type: Number, default: 1, },
        luk: { type: Number, default: 1, },
    },
    job: { type: JobSchema, default: {} },
    map: { type: MapSchema, default: {} },
    skills: {
        type: [
            SkillSchema
        ],
        default: {}
    },
    equits: [
        EquitSchema
    ],
    canLearnJobs: [
        JobSchema
    ],
    learnedJobs: {
        type: [
            JobSchema
        ],
        default: {},
    },
    skillPoints: {
        type: Number, default: 0,
    },
    canLearnSkills: [
        SkillSchema
    ],
    learnedSkills: {
        type: [
            SkillSchema
        ],
        default: {}
    },
    bagEquits: [
        EquitSchema
    ],
    bagItems: [
        ItemSchema
    ],
    lastActionDate: { type: Date, default: Date.now },
    nextActionDate: { type: Date, default: Date.now },
    creatdDate: { type: Date, default: Date.now },
}, { versionKey: false }));


export {IHero};
export default Hero;
