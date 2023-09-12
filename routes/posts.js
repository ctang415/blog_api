const express = require('express')
const router = express.Router()
const post_controller = require('../controllers/postsController')
const commentsRoute = require('./comments')
const jwt =  require('jsonwebtoken')

router.get('/', verifyToken, post_controller.post_list)

router.get('/:postid', verifyToken, post_controller.post_detail)

router.get('/', post_controller.post_create_get)

router.post('/', verifyToken, post_controller.post_create_post)

router.get('/:postid/delete',  post_controller.post_delete_get)

router.post('/:postid/delete', verifyToken, post_controller.post_delete_delete)

router.get('/:postid/update', post_controller.post_update_get)

router.post('/:postid/update', verifyToken, post_controller.post_update_put)

router.use('/:postid/comments', verifyToken, commentsRoute)

function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    // console.log(req.headers.cookie)
    console.log('bearerhead top')
    console.log(bearerHeader)
    console.log(req.headers.authorization)
    console.log('bearer header top end')
    /*
    const cookieSplit = req.headers.cookie.split('token=')
    const cookie = cookieSplit[1]
    req.cookie = cookie
    next()
    */
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        console.log('bearer error check')
        console.log(bearerHeader)
        console.log(req.headers.authorization)
        console.log('bearer error chek end')
        req.token = req.headers.cookie
        console.log('bearer error')
        res.sendStatus(403)
    }
}

module.exports = router