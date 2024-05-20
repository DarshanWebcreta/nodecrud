const express = require('express');
const app = express();
const db = require('./db');
const personRouter = require('./routes/person_routes')
const bodyparser = require('body-parser')
app.use(bodyparser.json());

app.use('/person', personRouter);
app.listen(3000, () => {
    console.log('Database is connected')
})


