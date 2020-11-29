const { UserInputError } = require('apollo-server');


async function getByIdOrUserInputError(model, id) {
    const document = await model.findById(id);
    if (document === null) {
        throw new UserInputError('User not found')
    }
    return document;
}

module.exports = {
    getByIdOrUserInputError
}