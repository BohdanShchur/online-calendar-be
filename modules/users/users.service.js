const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const RuleError = require('../../errors/ruleError');
const { BAD_REQUEST } = require('../../consts/statusCodes');
const Users = require('./users.model');
const { JWTClient } = require('../../utils/jwt-client');
const { validateLogin, validateUser } = require('../../validators/user.validator');
const { sendConfirmEmail } = require('../../utils/email');
const { GOOGLE_CLIEN_ID } = require('../../utils/dotEnv');

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
        const candidate = await Users.findOne({ email: user.email });
        if (candidate) {
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
        await sendConfirmEmail(user.email, token.createToken())
        return res
    }

    async loginUser({ email, password }) {
        const invalid = validateLogin({ email, password });
        if (invalid) {
            throw invalid;
        }
        const user = await Users.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = new JWTClient(user._id, user.email);
            user.token = token.generateAccessToken();
            return user;
        }

        return new RuleError("Incorrect Email or Password", BAD_REQUEST);
    }

    async loginGoogleUser(idToken, rememberMe) {
        const client = new OAuth2Client(GOOGLE_CLIEN_ID);
        const ticket = await client.verifyIdToken({
            idToken,
            expectedAudience: GOOGLE_CLIEN_ID,
        });
        const dataUser = ticket.getPayload();
        if (!(await Users.findOne({ email: dataUser.email }).exec())) {
            await this.registerUser({
                firstName: dataUser.given_name,
                lastName: dataUser.family_name,
                email: dataUser.email,
            });
        }
        const user = await Users.findOne({ email: dataUser.email });
        if (user) {
            const token = new JWTClient(user._id, user.email);
            user.token = token.generateAccessToken();
            return user;
        }
        return new RuleError("Incorrect Email or Password", BAD_REQUEST);
    }
}

module.exports = new UserService();