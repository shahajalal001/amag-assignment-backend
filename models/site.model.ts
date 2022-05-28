import mongoose, {model, Schema} from 'mongoose'
const AutoIncrement = require('mongoose-sequence')(mongoose)

let siteSchema = new Schema({
    id: Number,
    name: String,
    city: String,
    description: String,
    lat: Number,
    lng: Number,
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
}, {timestamps: true})
siteSchema.plugin(AutoIncrement, {inc_field: 'id'})
const Site = model('site', siteSchema)
export default Site