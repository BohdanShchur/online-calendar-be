const userService = require('./users.service');

const usersQuery = {
    getAllUsers: async() => {
        try{
            return await userService.getAllUsers();
        } catch(e) {
            console.log("ERROR", e)
        }
    },
    getUserById: async() => {
        try{
            return await userService.getUserById();
        } catch(e) {
            console.log("ERROR", e)
        }
    },
    createUser: async () => {
        try{
            return await userService.createUser();
        } catch(e) {
            console.log("ERROR", e)
        }
    }

}

module.exports = {
    usersQuery
}