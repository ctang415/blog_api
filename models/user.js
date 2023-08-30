const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema (
    {
        username: {type: String},
        password: { type: String},
        first_name: {type: String},
        last_name: { type: String}
    }
)

UserSchema.virtual('name').get(function () {
    let name;
    name = `${this.first_name} ${this.last_name}`
    return name
})

module.exports = mongoose.model("User", UserSchema)