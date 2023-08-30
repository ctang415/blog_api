require('dotenv').config() // allows usage of environmental variables from env file
const createError = require('http-errors'); 
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const indexRoute = require('./routes/index')
const postsRoute = require('./routes/posts')
const commentsRoute = require('./routes/comments')

mongoose.connect(`${process.env.mongodb}`, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express()
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoute)
app.use('/posts', postsRoute)
app.use('/comments', commentsRoute)

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