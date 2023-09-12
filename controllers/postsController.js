const Post = require('../models/post')
const Comment = require('../models/comment')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const { isValidObjectId } = require('mongoose' )
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.post_list = asyncHandler ( async (req, res, next) => {
    const posts = await Post.find({}).populate('comments').sort({ date: 1}).exec()
    jwt.verify(req.token, process.env.secretkey, (err, authData) => {
        if (err) {
            res.status(403).json({error: 'error'})
            console.log('Error: Could not connect to protected route')
            return
        }
            console.log(authData)
            res.status(200).json({post_list: posts, authData})
    })    
})

exports.post_detail = asyncHandler ( async (req, res, next)  => {
    const [ post, allCommentsInPost ] = await Promise.all (
        [
            Post.findById(req.params.postid).populate('comments').exec(),
            Comment.find({ post: req.params.postid}).exec()
        ]
    )
    jwt.verify(req.token, process.env.secretkey, (err, authData) => {
        if (err) {
            res.status(403).json({error: 'Could not connect to protected route'})
            return
        } else {
            if (isValidObjectId(req.params.postid) === false) {
                res.status(404).json({error: "Post does not exist"})
                return
            }
            if (post === null) {
                res.status(404).json({error: "Post not found"})
                return
            }
            res.json({post_detail: post, comment_list: allCommentsInPost})
        }
    })
})

exports.post_create_get = asyncHandler (async (req, res, next) => {
    res.json("Get Form")
})

exports.post_create_post = [
        (req, res, next) => {
        jwt.verify(req.token, process.env.secretkey, (err, authData) => {
        if (err) {
            res.status(403).json({error: 'error'})
            console.log('Error: Could not connect to protected route')
            return
        } 
            console.log('success create')
            body('title', 'Title must be at least 2 characters').trim().isLength({min: 2}).escape(),
            body('message', 'Message must be at least 2 characters').trim().isLength({min: 2}).escape(),
            body('visible').escape(),
            asyncHandler (async (req, res, next) => {
            console.log('hello')
                const errors = validationResult(req)
            const post = new Post (
            {
                title: req.body.title,
                message: req.body.message,
                visible: req.body.visible
            }
        )
        if (!errors.isEmpty()) {
            res.status(400).json( {post: post, errors: errors.array()})
            return
        } else {
            await post.save()
            res.status(200).json(post)
        }
    })
    }) },
    
]

exports.post_delete_get = asyncHandler (async (req, res, next) => {
    const post = await Post.findById(req.params.postid).populate('comments').exec()
    if (post === null) {
        res.redirect('/posts')
    }
    res.json( {post: post} )
})

exports.post_delete_delete = asyncHandler (async (req, res, next) => {
    jwt.verify(req.token, process.env.secretkey, async (err, token) => {
        if (err) {
            res.status(403).json({error: 'Could not connect to protected route'})
            return
        } 
        await Post.findByIdAndRemove(req.params.postid)
        res.status(200).json({success: true})
    
    })
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
    (req, res, next) => {
        jwt.verify(req.token, process.env.secretkey, (err, token) => {
            if (err) {
                res.status(403).json({error: 'Could not connect to protected route'})
                return
            }
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
            res.json( {post: post, errors: errors.array()})
            return
        } else {
            const updatedPost = await Post.findByIdAndUpdate(req.params.postid, post, {})
            res.json(updatedPost)
        }
})
        })
    }
    
]
