const {usersQuery} = require('./modules/users/users.resolver');

const resolvers = {
    Query: {
        ...usersQuery,
    }
}

module.exports = resolvers;