
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
interface IUser extends mongoose.Document {
    _id:string
    name:string
    pw:string
    heros:{_id:string,name:string}[]
    status:number
    createDate:Date
}

const User = mongoose.model<IUser>('User', new Schema({
    name: { type: String, required: true, unique: true },
    pw: { type: String, minlength: 6 },
    heros: [{ _id: String ,name:String}],
    status: { type: Number, default: 1 },
    creatdDate: { type: Date, default: Date.now },
},{ versionKey: false }));


export  {IUser};
export default User;
