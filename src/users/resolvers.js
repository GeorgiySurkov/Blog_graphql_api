const { UserModel, default: user } = require('./models/user');
const { getByIdOrUserInputError, updateObjectFields } = require('../helpers');


const resolvers = {
    Query: {
        getUser: async (parent, args, context, info) => {
            const user = await getByIdOrUserInputError(UserModel, args.id);
            return user;
        }
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            const newUser = new UserModel(args.user);
            await newUser.save();
            return newUser;
        },
        deleteUser: async (parent, args, context, info) => {
            const user = await getByIdOrUserInputError(UserModel, args.id);
            await user.remove();
            return user;
        },
        updateUser: async (parent, args, context, info) => {
            const user = await getByIdOrUserInputError(UserModel, args.user.id);
            updateObjectFields(user, args.user);
            await user.save();
            return user;
        }
    }
}

module.exports = {
    resolvers
}
