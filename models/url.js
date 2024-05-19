import { Schema, model } from 'mongoose';

const urlSchema = new Schema({
    shortURL: {type:String, required: true, unique: true},
    redirectURL: {type:String, required: true},
    history:[ {type: Date}],
}, {timestamps: true});

const URL = model('URL', urlSchema);

export default URL;