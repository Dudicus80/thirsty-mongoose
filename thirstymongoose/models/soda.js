const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Diner = require('./diner');

const commentSchema = new Schema ({
    content: {
        type: String
    },
    rating: {
        type: Number
    }
}, {timestamps: {createdAt: 'created_at'}})


const SodaSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    diners: [
        {
        type: Schema.Types.ObjectId,
        ref:'Diner'
        }
    ],
    comments: [commentSchema]
}, {timestamps: {createdAt: 'created_at'}});

const Soda = mongoose.model('Soda', SodaSchema);

module.exports = Soda;