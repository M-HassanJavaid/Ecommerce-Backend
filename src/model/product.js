const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    }
},
    {
        collection: 'products',
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = {
    Product
}
