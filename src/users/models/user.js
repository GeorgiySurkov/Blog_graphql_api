const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

module.exports = {
    UserModel: model("User", UserSchema)
};
