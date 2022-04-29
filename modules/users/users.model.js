const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmed: Boolean,
    rememberMe: Boolean,
});

module.exports = mongoose.model("Users", userSchema);