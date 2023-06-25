const mongoose = require("mongoose");
const {ApolloServer} = require("apollo-server");
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const {MONGO_URL} = require('./utils/dotEnv');
const {jwtClient} = require('./utils/jwt-client');
const RuleError = require("./errors/ruleError");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, connection }) => {
        if (connection) {
            return connection.context;
        }
        const { token } = req.headers || '';
        if (token) {
         try {
             const { userId, email } = jwtClient.decodeToken(token);
             if (!userId) {
                return null;
                }           
            return {userId, email};
        } catch (e) {
            throw new RuleError(e.message, e.statusCode);
            }
        }
    }
});

mongoose.connect(MONGO_URL)
    .then(async () => {
        console.log('MongoDB connected');
        return server.listen({port: 5001});
    })
    .then(({url}) => {
        console.log(`Server running on ${url}`);
    })