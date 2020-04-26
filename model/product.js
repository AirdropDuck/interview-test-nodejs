const mongoose = require('mongoose');

// Product schema
const productSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Product = module.exports = mongoose.model('Product', productSchema);