const Comment = require('../models/comment')
const Post = require('../models/post')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.comment_list = asyncHandler ( async (req, res, next ) => {
    const comments = await Comment.find({}).populate('post').exec()
    res.json( {comment_list: comments})
})

exports.comment_detail = asyncHandler ( async (req, res, next ) => {
    const [comment, allCommentsInPost] = await Promise.all(
        [
            Comment.findById(req.params.id).populate('post').exec(),
            Post.find({comment: req.params.id}, "author message date").exec()
        ]
    )
    if (comment === null) {
        const err = new Error("Comment does not exist")
        err.status = 404;
        return next(err)
    }
    res.json({ comment: comment, comment_list: allCommentsInPost })
})

exports.comment_create_get = asyncHandler ( async (req, res, next ) => {
    res.json('Create comment form')
})

exports.comment_create_post = [
    body('author').trim().escape(),
    body('message').trim().isLength({min: 2}).escape(),
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
            res.json( {comment: comment, errors: errors.array()} )
        } else {
            await comment.save()
        }
    })
]

exports.comment_delete_get = asyncHandler ( async (req, res, next ) => {
    console.log(req)
    const comment = await Comment.findById(req.params.id).populate('post').exec()
    if (comment === null) {
        res.redirect(`/posts/${comment.post}`)
    }
    res.json( {comment: comment})
})

exports.comment_delete_delete = asyncHandler ( async (req, res, next) => {
    await Comment.findByIdAndRemove(req.params.id)
    res.redirect('/')
})

