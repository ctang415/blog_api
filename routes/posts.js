const express = require('express')
const router = express.Router()
const post_controller = require('../controllers/postsController')
const commentsRoute = require('./comments')

router.get('/', post_controller.post_list)

router.get('/:postid', post_controller.post_detail)

router.get('/', post_controller.post_create_get)

router.post('/', post_controller.post_create_post)

router.get('/:postid', post_controller.post_delete_get)

router.delete('/:postid', post_controller.post_delete_delete)

router.get('/:postid', post_controller.post_update_get)

router.put('/:postid', post_controller.post_update_put)

router.get('/:postid', post_controller.post_draft_get)

router.put('/:postid', post_controller.post_draft_put)

router.use('/:postid/comments', commentsRoute)

module.exports = router