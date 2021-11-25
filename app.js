const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
var path = require('path')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
var cors = require('cors')

app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'react/build')));

app.use('/api', authRoute)

app.use(express.static('uploads'));

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'react/build/index.html'))
})

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const { message } = error;
    const { data } = error;
    res.status(status).json({ message, data });
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const server = app.listen(8080, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});

mongoose.connect('mongodb://localhost:27017/hospital', {
    useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})


module.exports = app;
