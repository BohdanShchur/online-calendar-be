const RuleError = require('../../errors/ruleError');
const {BAD_REQUEST} = require('../../consts/statusCodes');
const Users = require('./users.model');

class UserService {
    async getAllUsers () {
        const items = await Users.find()
        return items
    }
    async getUserById(id) {
        const foundUser = await Users.findById(id).exec();
    
        if (!foundUser) {
          return new RuleError('Error', 404);
        }
    
        return foundUser;
    }
    async createUser(user) {
        const candidate = await Users.findOne({email: user.email});
        if(candidate) return new RuleError("User already exist", BAD_REQUEST);
        const newUser = await new Users(user).save();
        return newUser;
    }
}

module.exports = new UserService();