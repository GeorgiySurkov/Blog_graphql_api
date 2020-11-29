const {getByIdOrUserInputError, updateObjectFields} = require('../helpers');
const {PostModel} = require('./models');
const {UserModel} = require('../users/models');
const {CommentModel} = require('../comments/models');
const {AuthenticationError} = require('apollo-server');


const resolvers = {
    Post: {
        author: async (parent, args, context, info) => {
            return await UserModel.findById(parent.author);
        },
        replies: async (parent, args, context, info) => {
            return await CommentModel.find({
                "post": parent._id
            });
        }
    },
    Query: {
        getPost: async (parent, args, context, info) => {
            return await getByIdOrUserInputError(PostModel, args.id, 'Post not found');
        }
    },
    Mutation: {
        createPost: async (parent, args, context, info) => {
            const author = await getByIdOrUserInputError(UserModel, args.userId, 'User not found');
            const newPost = new PostModel({...args.post, author: author._id});
            await newPost.save();
            return newPost;
        },
        deletePost: async (parent, args, context, info) => {
            // const author = await getByIdOrUserInputError(UserModel, args.user_id);
            const post = await getByIdOrUserInputError(PostModel, args.id, 'Post not found');
            if (args.userId !== post.author.toString()) {
                throw new AuthenticationError('You can\'t delete someone else\'s posts');
            }
            await post.remove();
            return post;
        },
        updatePost: async (parent, args, context, info) => {
            const post = await getByIdOrUserInputError(PostModel, args.post.id, 'Post not found');
            if (args.userId !== post.author.toString()) {
                throw new AuthenticationError('You can\'t update someone else\'s posts');
            }
            updateObjectFields(post, args.post);
            await post.save();
            return post;
        }
    }
}

module.exports = {
    resolvers
};
