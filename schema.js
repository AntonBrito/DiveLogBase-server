const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// Hardcode data

// Dive Type

const DivelogType = new GraphQlObjectType({
  name: "Dive",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    note: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQlObjectType({
  name: "RootQueryType",
  dive: {
    type: DiveType
  }
});

module.exports = new GraphQLSchema({});
