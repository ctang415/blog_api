const Post = require('../models/post')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

exports.post_list = asyncHandler ( async (req, res, next) => {
    const posts = await Post.find({}).populate('comments').sort({ date: 1}).exec()
    res.json({post_list: posts})
})

exports.post_detail = asyncHandler ( async (req, res, next)  => {
    const post = await Post.findById(req.params.postid).populate('comments').exec()
    if (post === null) {
        const err = new Error ("Post not found!")
        err.status = 404
        return next(err)
    }
    res.json({post_detail: post})
})

exports.post_create_get = asyncHandler (async (req, res, next) => {
    res.json("Get Form")
})

exports.post_create_post = [
    body('title').trim().isLength({min: 2}).escape(),
    body('message').trim().isLength({min: 2}).escape(),
    body('visible').escape(),
    asyncHandler (async (req, res, next) => {
        const errors = validationResult(req)
        const post = new Post (
            {
                title: req.body.title,
                message: req.body.message,
                visible: req.body.visible
            }
        )
        if (!errors.isEmpty()) {
            res.json( {post: post, errors: errors.array() })
        } else {
            await post.save()
        }
    })
]

exports.post_delete_get = asyncHandler (async (req, res, next) => {
    const post = await Post.findById(req.params.postid).populate('comments').exec()
    if (post === null) {
        res.redirect('/posts')
    }
    res.json( {post: post} )
})

exports.post_delete_delete = asyncHandler (async (req, res, next) => {
    await Post.findByIdAndRemove(req.params.postid)
    res.redirect('/posts')
}) 

exports.post_update_get = asyncHandler ( async (req, res, next) => {
    const post = await Post.findById(req.params.postid).populate('comments').exec()
    if (post === null) {
        const err = new Error("Post not found")
        err.status = 404
        return next(err) 
    }
    res.json( {post: post})
})

exports.post_update_put = [
    body('title').trim().isLength({min: 2}).escape(),
    body('message').trim().isLength({min: 2}).escape(),
    body('visible').escape(),
    asyncHandler ( async (req, res, next) => {
        const errors = validationResult(req)
        const post = new Post (
            {
                title: req.body.title,
                date: req.body.date,
                message: req.body.message,
                visible: req.body.visible,
                _id: req.params.postid
            }
        )
        if (!errors.isEmpty()) {
            console.log(req) 
            res.json( {post: post, errors: errors.array()})
            return
        } else {
            console.log(req)
            const updatedPost = await Post.findByIdAndUpdate(req.params.postid, post, {})
        }
})
]
