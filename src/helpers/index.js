const { UserInputError } = require('apollo-server');


async function getByIdOrUserInputError(model, id) {
    const document = await model.findById(id);
    if (document === null) {
        throw new UserInputError('User not found')
    }
    return document;
}

function updateObjectFields(obj, ...updateObjects) {
    for (let i = 0; i < updateObjects.length; i++) {
        const currUpdateObj = updateObjects[i]
        for (let field in currUpdateObj) {
            if (currUpdateObj.hasOwnProperty(field)) {
                let val = updateObjects[i][field];
                if (typeof val === 'object') {
                    if (typeof obj[field] !== 'object') {
                        if (Array.isArray(val)) {
                            obj[field] = [];
                        } else {
                            obj[field] = {};
                        }
                    }
                    updateObjectFields(obj[field], val);
                } else {
                    obj[field] = val;
                }
            }
        }
    }
}

module.exports = {
    getByIdOrUserInputError,
    updateObjectFields
}