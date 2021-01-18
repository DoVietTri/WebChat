import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {type: String},
    password: String,
    name: String, 
    gender: {type: String, default:'male'},
    phone: {type: String, default: null},
    avatar_link: {type: String, default: 'avatar-link.jpg'},
},{
    timestamps: true
})

const User = mongoose.model('users', UserSchema, 'user')

export default User
