const {CommentModel} = require('./models');
const {PostModel} = require('../posts/models');
const {UserModel} = require('../users/models');
const {getByIdOrUserInputError, updateObjectFields} = require('../helpers');
const {AuthenticationError} = require('apollo-server');


const resolvers = {
    Repliable: {
        __resolveType: async (obj, context, info) => {
            if (obj.title) {
                return 'Post';
            } else {
                return 'Comment';
            }
        }
    },
    Comment: {
        post: async (parent, args, context, info) => {
            return await PostModel.findById(parent.post);
        },
        replyTo: async (parent, args, context, info) => {
            if (parent.replyToComment) {
                return await CommentModel.findById(parent.replyToComment);
            } else {
                return await PostModel.findById(parent.post);
            }
        },
        author: async (parent, args, context, info) => {
            return await UserModel.findById(parent.author);
        },
        replies: async (parent, args, context, info) => {
            return await CommentModel.find({
                'replyToComment': parent._id
            });
        }
    },
    Query: {
        getComment: async (parent, args, context, info) => {
            return await getByIdOrUserInputError(CommentModel, args.id, 'Comment not found');
        }
    },
    Mutation: {
        createComment: async (parent, args, context, info) => {
            const author = await getByIdOrUserInputError(UserModel, args.userId, 'User not found');
            const post = await getByIdOrUserInputError(PostModel, args.comment.postId, 'Post not found');
            const replyToComment = args.comment.replyToComment ? await getByIdOrUserInputError(
                CommentModel, args.comment.replyToComment, 'Comment not found'
            ) : null;
            const newComment = new CommentModel({
                ...args.comment,
                post: post._id,
                replyToComment: replyToComment ? replyToComment._id : replyToComment,
                author: author._id
            });
            await newComment.save();
            return newComment;
        },
        updateComment: async (parent, args, context, info) => {
            const comment = await getByIdOrUserInputError(CommentModel, args.comment.id, 'Comment not found');
            const post = await PostModel.findById(comment.post);
            if (comment.author.toString() !== args.userId) {
                throw new AuthenticationError('You can\'t update this comment.');
            }
            updateObjectFields(comment, args.comment);
            await comment.save();
            return comment;
        },
        deleteComment: async (parent, args, context, info) => {
            const comment = await getByIdOrUserInputError(CommentModel, args.id, 'Comment not found');
            const post = await PostModel.findById(comment.post);
            if (comment.author.toString() !== args.userId && post.author.toString() !== args.userId) {
                throw new AuthenticationError('You can\'t delete this comment.');
            }
            await comment.remove();
            return comment;
        }
    }
};

module.exports = {
    resolvers
};
