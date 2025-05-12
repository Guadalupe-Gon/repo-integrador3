const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    descriptionShort: {
        type: String,
        trim: true,
        required: true,
    },
    descriptionDetailed: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

})


module.exports = mongoose.model('Product', productSchema);
