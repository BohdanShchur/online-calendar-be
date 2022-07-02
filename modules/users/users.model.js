const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmed: Boolean,
    token: String,
});

module.exports = mongoose.model("Users", userSchema);