const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RuleError = require('../../errors/ruleError');
const {BAD_REQUEST} = require('../../consts/statusCodes');
const Users = require('./users.model');

require('dotenv').config({
    path: '.env',
});
class UserService {
    async getUserById(id) {
        const foundUser = await Users.findById(id).exec();
    
        if (!foundUser) {
          return new RuleError('Error', 404);
        }
    
        return foundUser;
    }
    async registerUser(user) {
        const candidate = await Users.findOne({email: user.email});
        if(candidate) {
            return new RuleError("User already exist", BAD_REQUEST);
        }

        let encryptedPassword = await bcrypt.hash(user.password, 10);

        const newUser = new Users({
            ...user,
            password: encryptedPassword
        });

        const token = jwt.sign(
            {userId: newUser._id, email: user.email},
            process.env.SECRET,
            { expiresIn: "1h"}
        )
        newUser.token = token;
        const res = await newUser.save();
        return res
    }
    async loginUser({email, password}) {
        const user = await Users.findOne({email});
        if (user && (await bcrypt.compare(password, user.password))) {
    
            const token = jwt.sign(
                {userId: user._id, email},
                process.env.SECRET,
                { expiresIn: "1h"}
            )
            user.token = token;
            return user;
        }

        return new RuleError("Incorrect Password", BAD_REQUEST);
    }
}

module.exports = new UserService();