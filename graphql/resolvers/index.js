const postsResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolverrs = require('./comments');

module.exports = {
    Post : {
      likeCount : (parent) => {
         return parent.likes.length;
      },

      commentCount : (parent) => parent.comments.length
    },

    Query : {
      ...postsResolvers.Query
    },
    Mutation : {
      ...userResolvers.Mutation,
      ...postsResolvers.Mutation,
      ...commentsResolverrs.Mutation
    },

    Subscription : {
      ...postsResolvers.Subscription
    }
    
}