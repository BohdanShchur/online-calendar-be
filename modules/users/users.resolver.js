const userService = require('./users.service');
const {BAD_REQUEST} = require('../../consts/statusCodes');
const RuleError = require('../../errors/ruleError');
const usersQuery = {
    getUserById: async(_, {id}) => {
        try{
            return userService.getUserById(id);
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    },

    loginUser: async(_, {loginInput}) => {
        try{
            return userService.loginUser(loginInput);
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    }
};

const usersMutations = {
    registerUser: async (_, {user}) => {
        try{
            return userService.registerUser(user);
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    }
}

module.exports = {
    usersQuery,
    usersMutations
}