const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Soda = require('./soda');

const DinerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    sodas: [{
        type: Schema.Types.ObjectId,
        ref: 'Soda'
    }]
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const Diner = mongoose.model('Diner', DinerSchema);

module.exports = Diner;