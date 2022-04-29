const userService = require('./users.service');
const {BAD_REQUEST} = require('../../consts/statusCodes');
const RuleError = require('../../errors/ruleError');
const usersQuery = {
    getAllUsers: async() => {
        try{
            return userService.getAllUsers();
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    },
    getUserById: async(_, {id}) => {
        try{
            return userService.getUserById(id);
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    }
};

const usersMutations = {
    createUser: async (_, {user}) => {
        try{
            return userService.createUser(user);
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