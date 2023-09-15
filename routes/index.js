require('dotenv').config
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../models/user')

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
        const accessToken = jwt.sign( { user: user.username, id: user._id} , process.env.secretkey, {expiresIn: '1h'}, )
        return res.status(200).cookie('token', accessToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000}).json({accessToken})
    }
})

router.post('/logout', (req, res, next) => {
    req.token = null;
    res.status(200).json({ msg: 'log out success'})
})

module.exports = router