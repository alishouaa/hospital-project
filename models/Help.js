const mongoose = require('mongoose');
const Schema = mongoose.Schema

const HelpSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        type: {
            type: String,
            required: true,
        },
        priceTotal: {
            type: Number,
            required: true,
        },
        priceHelp: {
            type: Number,
            required: true,
        },

    },
    { timestamps: true }
);
const Helps = mongoose.model('Helps', HelpSchema)
module.exports = Helps;