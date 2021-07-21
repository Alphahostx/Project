const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        status:'success',
        results:'users.length',
        data:{
            users
        }
    });
});

exports.getUser = (req,res)=>{
    res.status(500).json({
        status:'err',
        message:'this route is not defined',
    });
};

exports.createUser = (req,res)=>{
    res.status(500).json({
        status:'err',
        message:'this route is not defined',
    });
};

exports.updateUser = (req,res)=>{
    res.status(500).json({
        status:'err',
        message:'this route is not defined',
    });
};

exports.deleteUser = (req,res)=>{
    res.status(500).json({
        status:'err',
        message:'this route is not defined',
    });
};
