const mongoose = require("mongoose");
const {ApolloServer, AuthenticationError} = require("apollo-server");
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const {SECRET, MONGO_URL} = require('./utils/dotEnv');
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
             const { userId } = jwtClient.decodeToken(String(token));
             if (!userId) {
                return null;
                }           
            return {userId};
        } catch (e) {
            throw new RuleError(e.message, e.statusCode);
            }
        }
    }
});

mongoose.connect(MONGO_URL)
    .then(async () => {
        console.log('MongoDB connected');
        return server.listen({port: 5000}) 
    })
    .then(({url}) => {
        console.log(`Server running on ${url}`);
    })