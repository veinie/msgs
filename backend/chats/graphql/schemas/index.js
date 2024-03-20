const { gql } = require('@apollo/server')

const rootType = `
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`;

module.exports = [rootType];
