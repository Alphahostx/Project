const User = require('./../models/userModel');
const cloudinary = require('cloudinary').v2;
const fileUpload = require("express-fileupload");

cloudinary.config({ 
    cloud_name: 'dgtvidcuo', 
    api_key: '779465152135873', 
    api_secret: 'S49NBMBGNWIsNRwh10MKV9N1rBM' 
  });

exports.getAllUsers =  async (req,res)=>{
    try{
    const users = await User.find();
    res.status(200).json({
        status:'success',
        results: users.length,
        data:{
            users
        }
    });
}catch(err){
    res.status(404).json(({
        status:'fail',
        message:err
    }))
}
};

exports.getUser =  async (req,res) => {
    try{
        const user = await User.findById(req.params.id);

        res.status(200).json({
            status:"success",
            data:[
                user
            ]
        })
    }catch(err){
        res.status(404).json(({
            status:'fail',
            message:err
        }))
    }
};

exports.updateUser = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        await cloudinary.uploader.destroy(user.cloudinary.id);
        const result = await cloudinary.uploader.upload(req.files.path);
        res.status(200).json({
        status:'success',
        data:{
            user
        }
    });
}catch(err){
    res.status(400).json({
        status:'fail',
        message:"Invalid data sent"
    })
}
};

exports.deleteUser = async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        await cloudinary.uploader.destroy(user.cloudinary.id);
        res.status(204).json({
            status:'success',
            data:'null'
        });
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message:"Invalid data sent"
        })
    }
}
