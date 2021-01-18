import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
    userId: String,
    contactId: String,
    status: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

export default mongoose.model('contact', ContactSchema, 'contact')