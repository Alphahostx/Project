const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../../models/productModel');


process.on('uncaughtException',err => {
    console.log('UNCAUGHT EXCEPTION! TERMINATING PROCESS...');
    console.log(err.name,err.message);
    process.exit(1);
});

dotenv.config({path:'./config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful!')
);

const products = JSON.parse(fs.readFileSync(`${__dirname}/products-simple.json`, 'utf-8'));
const importData = async () => {
    try{
        await Product.create(products);
        console.log('Data successfully loaded')
    }catch(err){
console.log(err);
    }
    process.exit(1);
};

const deleteData = async () => {
    try{
        await Product.deleteMany();
        console.log('Data successfully deleted');
    }catch(err){
console.log(err);
    }
    process.exit(1);
};
