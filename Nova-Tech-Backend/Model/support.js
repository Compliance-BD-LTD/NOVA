const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SupportSchema = Schema({
    SupportType: { type: String, enum: ['Techinal Assitance','Repair & Maintenance','Sales & Billing Support'] },
    contactNumber:String,
    email:String,
    model:String,
    description:String
},
    {
        timestamps: true
    }
)

const Supports = mongoose.model('supports', SupportSchema)

module.exports = {
    Supports
}