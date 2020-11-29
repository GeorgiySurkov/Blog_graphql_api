const {UserModel} = require('./models/user');
const {PostModel} = require('../posts/models');
const {getByIdOrUserInputError, updateObjectFields} = require('../helpers');
const {UserInputError} = require('apollo-server')


const resolvers = {
    User: {
        posts: async (parent, args, context, info) => {
            return await PostModel.find({
                'author': parent._id
            });
        }
    },
    Query: {
        getUser: async (parent, args, context, info) => {
            return await getByIdOrUserInputError(UserModel, args.id, 'User not found');
        }
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            const newUser = new UserModel(args.user);
            await newUser.save();
            return newUser;
        },
        deleteUser: async (parent, args, context, info) => {
            const user = await getByIdOrUserInputError(UserModel, args.id, 'User not found');
            if (args.userId !== user._id.toString()) {
                throw new UserInputError('You can\'t delete this user.')
            }
            await user.remove();
            return user;
        },
        updateUser: async (parent, args, context, info) => {
            const user = await getByIdOrUserInputError(UserModel, args.user.id, 'User not found');
            if (args.userId !== user._id.toString()) {
                throw new UserInputError('You can\'t update this user.')
            }
            updateObjectFields(user, args.user);
            await user.save();
            return user;
        }
    }
}

module.exports = {
    resolvers
}
