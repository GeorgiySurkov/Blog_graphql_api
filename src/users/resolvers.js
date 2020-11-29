const { UserModel, default: user } = require('./models/user');
const { getByIdOrUserInputError } = require('../helpers');


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
            const new_data = args.user;
            user.firstName = new_data.firstName ? new_data.firstName : user.firstName;
            user.lastName = new_data.lastName ? new_data.lastName : user.lastName;
            user.email = new_data.email ? new_data.email : user.email;
            await user.save();
            return user;
        }
    }
}

module.exports = {
    resolvers
}
