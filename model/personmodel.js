const mongoose = require('mongoose');


const personModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            enum: ['manager', 'employee', 'hr'],
            required: true
        },
        salary: {
            
            type: Number,
            required: true
        }

    }
)

const Person = mongoose.model('Person', personModel);
module.exports = Person;