const { gql } = require("apollo-server");
const {userType} = require('./modules/users/users.graphql');

const typeDefs = gql`
    ${userType},
    type Query {
        getAllUsers: [User!]!,
        getUserById: User!,
        createUser: User
    }
`
module.exports = typeDefs;