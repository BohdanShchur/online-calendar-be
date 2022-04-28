const Users = require('./users.model');

class UserService {
    async getAllUsers () {
        const items = await Users.find()
        console.log("items", items)
        return items
    }
    async getUserById() {
        const foundUser = await Users.findById("626b15acad168c3ab26ed5f9").exec();
    
        if (!foundUser) {
          console.log("NOT FOUND")
        }
    
        return foundUser;
    }
    async createUser() {
        const newUser = await new Users({
            firstName: 'test',
            lastName: 'test'
        }).save();
        return newUser;
    }
}

module.exports = new UserService()