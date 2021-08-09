const {promisify} = require('util');
const util = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { token } = require('morgan');
const cloudinary = require('cloudinary').v2;
const fileUpload = require("express-fileupload");
const { result } = require('lodash');

cloudinary.config({
    cloud_name:'dgtvidcuo',
    api_key:'779465152135873',
    api_secret:'S49NBMBGNWIsNRwh10MKV9N1rBM'
});

const signToken = id => {
    return  jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    }); 
}

exports.signup = catchAsync (async (req,res,next) => {

    if(req.files)
    {
        const file = req.files.photo;
        cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
            console.log(result);
        })
        console.log(req.files)
        res.send('image uploaded')
    }
    
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        imagePath:result.url
    });

    const token = signToken(newUser._id);
    res.status(201).json({
        status:'success',
        token,
        data:{
            user:newUser
        }
    });
});

exports.login = catchAsync(async(req,res,next) => {
    const {email,password} = req.body;

    //checking if email and password exist
    if(!email || !password){
        next(new AppError('Please provide email and password!', 400));
    };

    //checking if user exists and password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !( await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email or password',401));
    }
    
    //sending token to client
    const token = signToken(user._id);
    res.status(200).json({
        status:'success',
        token
    });
});

exports.protect = catchAsync(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('You are not logged in! Login to get access.',401));
    }
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(new AppError('The user belonging to this token no longer exists.',401));
    }

    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next (new AppError('User recently changed password! Please login again.',401));
    }

    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action',403))
        }
        next();
    };
};



