const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// Hardcoded data
const divers = [
  {
    id: "1",
    name: "John Snow",
    location: "jamestow",
    date: "nov-6,2018",
    notes: "F... Awesome, but winter is comning."
  },
  {
    id: "2",
    name: "Aviva",
    location: "Praia",
    date: "fev-17,2015",
    notes: "Amazing!"
  },
  {
    id: "3",
    name: "Sara",
    location: "North Carolina",
    date: "jul-24,2018",
    notes: "Cant wait to go again!"
  }
];
// Customer Type
const diverType = new GraphQLObjectType({
  name: "Diver",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    date: { type: GraphQLString },
    notes: { type: GraphQLString }
  })
});
// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    diver: {
      type: diverType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < divers.length; i++) {
          if (divers[i].id == args.id) {
            return divers[i];
          }
        }
      }
    }
  }
});

module.export = new GraphQLSchema({
  query: RootQuery
});
