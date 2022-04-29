const userType = `
    type User {
        _id: ID!,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        confirmed: Boolean,
        rememberMe: Boolean
    }
`;
const userInput = `
    input UserInput {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        confirmed: Boolean,
        rememberMe: Boolean
    }
`

module.exports = {
    userType,
    userInput
}