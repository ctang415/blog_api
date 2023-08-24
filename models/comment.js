const mongoose = require('mongoose')
const { DateTime } = require('luxon')
const Schema = mongoose.Schema

const CommentSchema = new Schema (
    {
        author: {type: String, default: "Anonymous"},
        date: { type: Date, default: Date.now},
        message: {type: String, minLength: 2, required: true},
        post: { type: Schema.Types.ObjectId, ref: "Post" }
    }
)

CommentSchema.virtual("url").get(function () {
    return `/comments/${this._id}`
})

CommentSchema.virtual('date_formatted').get( function () {
    return DateTime.fromJSDate(this.date).toFormat('yyyy-MM-dd')
})

module.exports = mongoose.model("Comment", CommentSchema)