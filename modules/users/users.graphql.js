const userType = `
    type User {
        _id: ID!,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        confirmed: Boolean,
        rememberMe: Boolean,
        token: String
    }
`;
const userInput = `
    input UserInput {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        confirmed: Boolean,
    }

    input LoginInput {
        email: String,
        password: String,
        rememberMe: Boolean
    }
`

module.exports = {
    userType,
    userInput
}