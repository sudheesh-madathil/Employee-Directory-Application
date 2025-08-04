const { ApolloServer } = require('apollo-server');
const { connectToDatabase } = require('./db');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

async function startServer() {
    const db = await connectToDatabase();
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ db }),
    });

    server.listen({ port: 4000 }).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
}

startServer();