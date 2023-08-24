const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const Schema = mongoose.Schema

const PostSchema = new Schema (
    {
        title: { type: String, minLength: 2, required: true},
        date: { type: Date, default: Date.now},
        message: { type: String, minLength: 2, required: true },
        visible: { type: Boolean, default: false },
        comments: [ { type: Schema.Types.ObjectId, ref: "Comment"} ]
    }
)

PostSchema.virtual('date_formatted').get( function () {
    return DateTime.fromJSDate(this.date).toFormat('yyyy-MM-dd')
})

PostSchema.virtual('url').get(function () {
    return `/posts/${this._id}`
})

module.exports = mongoose.model("Post", PostSchema)