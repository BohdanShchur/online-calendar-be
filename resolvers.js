const {usersQuery, usersMutations} = require('./modules/users/users.resolver');
const {eventsQuery, eventsMutations} = require('./modules/events/events.resolver');

const resolvers = {
  Query: {
      ...usersQuery,
      ...eventsQuery,
  },
  Mutation: {
      ...usersMutations,
      ...eventsMutations
  },
  UserResult: {
    __resolveType: obj => {
      if (obj._id) {
        return 'User';
      }
      return 'Error';
    }
  },
  EventResult: {
    __resolveType: obj => {
      if (obj._id) {
        return 'Event';
      }
      
      return 'Error';
    }
  },
}

module.exports = resolvers;