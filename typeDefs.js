const { gql } = require("apollo-server");
const {userType, userInput} = require('./modules/users/users.graphql');
const {eventInput, eventType} = require('./modules/events/events.graphql');

const typeDefs = gql`
    scalar Date

    ${userType}
    ${userInput}
    ${eventInput}
    ${eventType}

    type Error {
    statusCode: Int
    message: String
    }

    union UserResult = User | Error
    union EventResult = Event | Error

    type Query {
        # User Queries
        getAllUsers: [User!]!,
        getUserById(id: ID!): UserResult,

        #Event Queries
        getEventsByUserId(userId: ID!): [Event!]!,
    }

    type Mutation {
        # User Mutations
        createUser(user: UserInput!): UserResult

        #Events Mutations
        createEvent(event: EventInput!, userId: ID!): EventResult
        deleteEvent(id: ID!): EventResult
        updateEvent(event: EventInput!, id: ID!): EventResult
    }


`
module.exports = typeDefs;