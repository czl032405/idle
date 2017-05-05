import * as mongoose from 'mongoose';
import { SkillSchema,EquitSchema } from './hero';
const Schema = mongoose.Schema;


interface IMonster extends mongoose.Document {
    _id: string
    name: string
    lv: number
    exp:number
    levelUpProps: {
        str: number
        int: number
        agi: number
        vit: number
        dex: number
        luk: number
    }
    skills: { name: string, lv: number, date?: Date }[]
    equits:{_id:string,name:string,lv:number,date?:Date}[]
}

var Monster = mongoose.model<IMonster>('Monster', new Schema({
    name: { type: String, required: true, unique: true },
    lv: { type: Number, default: 1 },
    exp:{ type: Number, default: 1 },
    levelUpProps: {
        str: { type: Number, default: 1, },
        int: { type: Number, default: 1, },
        agi: { type: Number, default: 1, },
        vit: { type: Number, default: 1, },
        dex: { type: Number, default: 1, },
        luk: { type: Number, default: 1, },
    },
     equits: [
        EquitSchema
    ],
    skills: {
        type: [
            SkillSchema
        ],
        default: {}
    },
}, { versionKey: false }))

export { IMonster }
export default Monster;

