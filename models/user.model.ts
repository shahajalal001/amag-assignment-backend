import {model, Schema} from 'mongoose'

let userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String
}, {timestamps: true})
const User = model('user', userSchema)
export default User