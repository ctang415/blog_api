const Comment = require('../models/comment')
const Post = require('../models/post')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.comment_list = asyncHandler ( async (req, res, next ) => {
    const comments = await Comment.find({}).populate('post').exec()
    res.json( {comment_list: comments})
})

exports.comment_detail = asyncHandler ( async (req, res, next ) => {
    const comment = await Comment.findById(req.params.commentid).populate('post').exec()
    if (comment === null) {
        const err = new Error("Comment does not exist")
        err.status = 404;
        return next(err)
    }
    res.json({ comment: comment })
})

exports.comment_create_get = asyncHandler ( async (req, res, next ) => {
    res.json('Create comment form')
})

exports.comment_create_post = [
    body('author').trim().escape(),
    body('message', "Message must be at least 2 characters").trim().isLength({min: 2}).escape(),
    asyncHandler (async (req, res, next ) => {
        const errors = validationResult(req);
        const comment =  new Comment (
            {
                author: req.body.author,
                message: req.body.message,
                post: req.body.post
            }
        )
        if (!errors.isEmpty()) {
            res.status(400).json( {comment: comment, errors: errors.array()} )
            return
        } else {
            await comment.save()
            res.json(comment)
        }
    })
]

exports.comment_delete_get = asyncHandler ( async (req, res, next ) => {
    const comment = await Comment.findById(req.params.commentid).populate('post').exec()
    if (comment === null) {
        res.redirect(`/posts/${comment.post}`)
    }
    res.json({comment: comment})
})

exports.comment_delete_delete = asyncHandler ( async (req, res, next) => {
    jwt.verify(req.token, process.env.secretkey, async (err, token) => {
        if (err) {
            res.status(403).json( {error: 'Could not connect to protected route'})
            return
        }
    let deletedComment = await Comment.findByIdAndRemove(req.params.commentid)
    res.status(200).json( {success: true})
    })
})

