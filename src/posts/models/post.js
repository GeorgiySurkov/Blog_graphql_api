const { model, Schema } = require("mongoose");


const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: () => new Date(),
    }
});

module.exports = {
    PostModel: model('Post', PostSchema)
}