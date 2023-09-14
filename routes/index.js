require('dotenv').config
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });

// function used to authenticate
passport.use(
    new LocalStrategy(async(username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
         if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        if (!user.verifyPassword(password)) {
          return done(null, false, { message: "Incorrect password" });
        };
        return done(null, user);
      } catch(err) {
        console.log(err)
        return done(err);
      };
    })
  );


router.get('/login',  (req, res, next) => {
    res.json(req.cookies)
})

router.post('/login', async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})
    if (!user) {
        res.status(404).json({error: 'No user found with that email'})
        return
    } 
    if (user.password !== req.body.password) {
        res.status(404).json( {error: 'Incorrect password'})
        return
    }
    if (req.body.username === user.username && req.body.password === user.password) {
        console.log('success')
        const accessToken = jwt.sign( { user: user.username, id: user._id} , process.env.secretkey, {expiresIn: '1h'}, )
        console.log(accessToken)
        return res.status(200).cookie('token', accessToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000}).json({accessToken})
        /*    const refreshToken = jwt.sign( {username: user.username}, process.env.secretkeyrefresh, {expiresIn: '1d'}, (err, token) => {
            if (err) {
                console.log(err)
            }
            res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
            return res.json( {accessToken})
        }) */
    } else {
        console.log('Error: Could not log in')
    }
})

router.post('/logout', (req, res, next) => {
    req.token = null;
    res.status(200).json({ msg: 'log out success'})
})

/*
router.post('/refresh', async  (req, res, next) => {
    const user = await User.findOne( {username: 'admin'})
    if (req.cookies?.jwt) {
        const refreshToken = req.cookies.jwt
        jwt.verify(refreshToken, process.env.secretkeyrefresh, (err, decoded) => {
            if (err) {
                return res.status(406).json( {message: 'unauthorized'})
            } else {
                const accessToken = jwt.sign ( {username: user.username}, process.env.secretkey, {expiresIn: '10m'})
                return res.json( {accessToken})
            }
        }) 
    } else {
        return res.status(406).json( {message: 'unauthorized'} )
    
    }
})
*/
function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403)
    }
}

module.exports = router