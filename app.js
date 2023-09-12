require('dotenv').config() // allows usage of environmental variables from env file
const createError = require('http-errors'); 
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const indexRoute = require('./routes/index')
const postsRoute = require('./routes/posts')

mongoose.connect(`${process.env.mongodb}`, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express()
app.use(cors({origin: true, credentials: true}))
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRoute)
app.use('/posts', postsRoute)

app.use(function(req, res, next) {
  res.locals.user = req.user || null;
  console.log(res.locals.user)
  next();
});

app.use(function(req, res, next) {
    next(createError(404));
  });

app.listen('3000', () => {
    console.log("Now listening on port 3000")
}) 

module.exports = app