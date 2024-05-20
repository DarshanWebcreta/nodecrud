const express = require('express');
const app = express();

const db = require('./db');
require('dotenv').config()
const port = process.env.PORT ||3000;
const personRouter = require('./routes/person_routes')
const bodyparser = require('body-parser')
app.use(bodyparser.json());


app.use('/person', personRouter);

app.listen(port, () => {
    console.log('Database is connected')
})


