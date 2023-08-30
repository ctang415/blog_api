const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/commentsController');

router.get('/', comment_controller.comment_list);

router.get('/:commentid', comment_controller.comment_detail)

router.get('/', comment_controller.comment_create_get);

router.post('/', comment_controller.comment_create_post);

router.get('/:commentid', comment_controller.comment_delete_get);

router.delete('/:commentid', comment_controller.comment_delete_delete);

module.exports = router