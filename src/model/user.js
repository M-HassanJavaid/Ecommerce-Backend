const mongoose = require('mongoose');
const validator = require('validator');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
        trim: true,
    },


    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,

        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid!')
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,

        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password is not strong!')
            }
        }

    },

    role: {
        type: String,
        enum: ['user'],
        default: 'user',

    }
},
    {
        collection: 'users',
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};