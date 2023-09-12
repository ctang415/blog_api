const express = require('express')
const router = express.Router()
const post_controller = require('../controllers/postsController')
const commentsRoute = require('./comments')
const jwt =  require('jsonwebtoken')

router.get('/', post_controller.post_list)

router.get('/:postid', post_controller.post_detail)

router.get('/', verifyToken, post_controller.post_create_get)

router.post('/', verifyToken, post_controller.post_create_post)

router.get('/:postid/delete',  post_controller.post_delete_get)

router.post('/:postid/delete', verifyToken, post_controller.post_delete_delete)

router.get('/:postid/update', post_controller.post_update_get)

router.post('/:postid/update', verifyToken, post_controller.post_update_put)

router.use('/:postid/comments', commentsRoute)

function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        req.token = req.headers.cookie
        console.log('bearer error')
        res.sendStatus(403)
    }
}

module.exports = router