const mongoose = require("mongoose");
const {ApolloServer, AuthenticationError} = require("apollo-server");
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
// const express = require("express");
// const app = express();

require('dotenv').config({
    path: '.env',
  });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    contex: async ({ req, connection }) => {
        if (connection) {
            return connection.context;
          }
          const { token } = req.headers || '';
      
          if (token) {
            try {
              const { userId } = jwtClient.decodeToken(token, process.env.SECRET);
      
              if (!userId) {
                return null;
              }
              return userId;
            } catch (e) {
              throw new AuthenticationError("Invalid/Expired token")
            }
          }
        }
    }
);

mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('MongoDB connected');
        // await server.start()
        // server.applyMiddleware({app});
        return server.listen({port: 5000}) 
    })
    .then(({url}) => {
        console.log(`Server running on ${url}`);
    })