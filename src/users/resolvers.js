const { UserModel, default: user } = require('./models/user');
const { getByIdOrUserInputError, updateObjectFields } = require('../helpers');


const resolvers = {
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
            await user.remove();
            return user;
        },
        updateUser: async (parent, args, context, info) => {
            const user = await getByIdOrUserInputError(UserModel, args.user.id, 'User not found');
            updateObjectFields(user, args.user);
            await user.save();
            return user;
        }
    }
}

module.exports = {
    resolvers
}
