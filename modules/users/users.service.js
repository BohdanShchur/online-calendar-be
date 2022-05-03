const bcrypt = require('bcryptjs');
const RuleError = require('../../errors/ruleError');
const {BAD_REQUEST} = require('../../consts/statusCodes');
const Users = require('./users.model');
const { JWTClient } = require('../../utils/jwt-client');
const {validateLogin, validateUser} = require('../../validators/user.validator');
const sendMail = require('../../utils/email');

class UserService {
    async getUserById(id) {
        const foundUser = await Users.findById(id).exec();
    
        if (!foundUser) {
          return new RuleError('Error', 404);
        }
    
        return foundUser;
    }
    async registerUser(user) {
        const invalid = validateUser(user);
        if (invalid) {
            throw invalid;
        }
        const candidate = await Users.findOne({email: user.email});
        if(candidate) {
            return new RuleError("User already exist", BAD_REQUEST);
        }

        let encryptedPassword = await bcrypt.hash(user.password, 10);

        const newUser = new Users({
            ...user,
            password: encryptedPassword
        });

        const token = new JWTClient(user.userId, user.email)
        newUser.token = token.createToken();
        const res = await newUser.save();
        await sendMail(user.email, token)
        return res
    }
    async loginUser({email, password}) {
        const invalid = validateLogin({email, password});
        if (invalid) {
            throw invalid;
        }
        const user = await Users.findOne({email});
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = new JWTClient(user._id, user.email);
            user.token = token.generateAccessToken();
            return user;
        }

        return new RuleError("Incorrect Email or Password", BAD_REQUEST);
    }
}

module.exports = new UserService();