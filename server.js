const mongoose = require("mongoose");
const {ApolloServer} = require("apollo-server-express");
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const express = require("express");
const app = express();

require('dotenv').config({
    path: '.env',
  });

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('MongoDB connected');
        await server.start()
        server.applyMiddleware({app});
        return app.listen({port: 5000}) 
    })
    .then(() => {
        console.log(`Server running on PORT 5000`);
    })