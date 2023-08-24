const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/commentsController');

router.get('/comments', comment_controller.comment_list);

router.get('/comments', comment_controller.comment_create_get);

router.post('/comments', comment_controller.comment_create_post);

router.get('/comments/:commentid', comment_controller.comment_delete_get);

router.delete('/comments/:commentid', comment_controller.comment_delete_delete);

module.exports = router