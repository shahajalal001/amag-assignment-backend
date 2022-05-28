import {model, Schema} from 'mongoose'

let auditLogSchema = new Schema({
    site: {
        type: Schema.Types.ObjectId,
        ref: 'site',
    },
    old_data: {
        name: String,
        city: String,
        description: String,
        lat: Number,
        lng: Number,
    },
    new_data: {
        name: String,
        city: String,
        description: String,
        lat: Number,
        lng: Number,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    action: {
        type: String,
        enum: ['add', 'update']
    }
}, {timestamps: true})
const AuditLog = model('auditlog', auditLogSchema)
export default AuditLog