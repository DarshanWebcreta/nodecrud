const mongoose = require('mongoose')
require('dotenv').config();//jya jya aa use kariye tya tya aa mukvu pdse 
//const mongoUrl = 'mongodb://localhost:27017/hotels';
//hotes karish  to ana nam nu db bnse and ana andar default person hase 
const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl)

const db = mongoose.connection;
db.on('connected',()=>{
    console.log("db connected")
});
db.on('error',(err)=>{
    console.log("db error:",err)
});
db.on('disconnected',()=>{
    console.log("db disconnected")
});

module.exports = db;