const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        avatar : {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        street: {
            type : String,
            required: true
        },
        guarantor: {
            type : String,
            required: true
        },
          phone: {
            type : Number,
            required: true
        },
    },
    { timestamps: true }
);
const User = mongoose.model('User', UserSchema)
module.exports = User;