const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a name']
    },
    email:{
        type:String,
        required:[true,'Please provide a valid user id'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail,'Provide a valid email']
    },
    photo:String,
    password:{
        type:String,
        required: [true, 'Please provide a passowrd'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        select:false,
        validate:{
            validator:function(el){
                return el === this.password; 
            },
            message:`Passwords don't match`
        }
    }
});

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = await bcrypt.hash(this.passwordConfirm,12);

    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model('User',userSchema);

module.exports = User;
