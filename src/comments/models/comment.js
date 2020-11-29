const { model, Schema } = require("mongoose");


const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectID,
        ref: 'Post',
        required: true
    },
    replyToComment: {
        type: Schema.Types.ObjectID,
        ref: 'Comment',
        required: false
    },
    author: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: () => new Date()
    }
});

module.exports = {
    CommentModel: model('Comment', CommentSchema)
};
