const express = require('express')
const router = express.Router()
const posts_controller = require('../controllers/postsController')

router.get('/', (req, res, next) => {
    return res.json('Hi')
})

router.get('/login', (req, res, next) => {
    return res.json('Login Page')
})



module.exports = router