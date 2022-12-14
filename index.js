const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const {PubSub} = require('graphql-subscriptions');

const typeDefs = require('./graphql/typeDefs');
const {MONGODB} = require('./config');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer(
    {
    typeDefs,
    resolvers,
    context : ({req}) => ({req, pubsub})
    }
);

mongoose.connect(MONGODB, {useNewUrlParser : true})
 .then(() => {
    console.log('Succesfully connected to MongoDB')
    return server.listen({port : PORT});
 })
 .then(res => {
    console.log('Server running at ' + res.url);
})
 .catch(err => {
    console.error(err);
 } )