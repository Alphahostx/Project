const express = require('express');
const orderController = require('./../controllers/orderController');

const router = express.Router();

router
.route('/')
.get(orderController.getAllOrders) 
//only for testing view orders we are creating post orders
.post(orderController.createOrder);

module.exports = router;