const express = require('express');
const app = express();
const passport = require('./auth')
const db = require('./db');
require('dotenv').config()

const port = process.env.PORT ||3000;
const personRouter = require('./routes/person_routes')
const bodyparser = require('body-parser')
app.use(bodyparser.json());

const logrequest = (req,res,next)=>{
    console.log('Request received');
    console.log(`${new Date()} and its url ${req.originalUrl}`);
    next();
}
app.use(logrequest);
//one kind of intercepor if aapde request pachhi and responce pela 
//koi pan task perform karvo hoi to aa use thase 
//jem upper karyu chhe 



app.use(passport.initialize());
app.use('/files',express.static('./upload'))
const middleware = passport.authenticate('local',{session:false})
//local atle stratagy define kari chhe 
app.get('/',middleware,(req,res)=>{
    res.status(200).json({status:200,message:'Api called successfully'})
})
app.use('/person', personRouter);

app.listen(port, () => {
    console.log('Database is connected')
})


