const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
        
});

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;

