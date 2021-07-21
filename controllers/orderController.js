const Order = require('../models/orderModel');

exports.getAllOrders = async (req,res)=>{
    try{
    const orders = await Order.find();

    res.status(200).json({
        status:'success',
        data:{
            orders
        }
    });
}catch(err){
    res.status(404).json(({
        status:'fail',
        message:err
    }))
}
};

exports.createOrder = async (req,res) => {

    try {const newOrder = await Order.create(req.body)
  
  
  
      res.status(201).json({
          status:'success',
          data:{
              order: newOrder
          }
      })
  }catch(err){
      res.status(400).json({
          status:'fail',
          message:"Invalid data sent"
      })
  }
  };