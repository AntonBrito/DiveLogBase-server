const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// Hardcode data

cosnt dives = [
  {id:'1', name:'John Snow', location:'narraganset', note:'amazing experience'},
  {id:'2', name:'Anton brito', location:'Jamestown', note:'Dope'},
  {id:'3', name:'Riley', location:'QuebraCanela', note:'Cant wait to go again'}
];


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
    type:DiveType
  }
});

module.exports = new GraphQLSchema({});
