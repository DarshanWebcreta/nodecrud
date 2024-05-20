const express = require('express');
const app = express();

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


app.use('/person', personRouter);

app.listen(port, () => {
    console.log('Database is connected')
})


