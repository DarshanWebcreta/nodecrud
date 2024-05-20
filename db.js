const mongoose = require('mongoose')

const mongoUrl = 'mongodb://localhost:27017/hotels';

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