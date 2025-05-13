const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        minlength: 5,
        maxlength: 100,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);},
            message: 'Por favor, ingrese un correo electrónico válido.',
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100,
        trim: true,
    },
    observations: {
        type: String,
        required: false,
        trim: true,
        maxlength: 400,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'editor'],
        default: 'user',
    },
});


module.exports = mongoose.model("User", userSchema);
