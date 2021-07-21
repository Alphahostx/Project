const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A product must have a name'],
        unique:true
    },
    description:{
        type:String,
        required:[true,'Please provide a description']
    },
    rating:{
        type:Number,
        default:4.5
    },
    price: {
        type:Number,
        required:[true,'A product must have a price']
    },
    imageCover:{
        type:String,
        required:[true,'Please provide an image for the product']
    }
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;
