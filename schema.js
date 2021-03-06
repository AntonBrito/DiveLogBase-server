const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// Hardcoded data

/*
const divers = [
  {
    id: "1",
    name: "John Snow",
    location: "jamestow",
    date: "nov-6,2018",
    note: "F... Awesome, but winter is comning."
  },
  {
    id: "2",
    name: "Aviva",
    location: "Praia",
    date: "fev-17,2015",
    note: "Amazing!"
  },
  {
    id: "3",
    name: "Sara",
    location: "North Carolina",
    date: "jul-24,2018",
    note: "Cant wait to go again!"
  }
];
*/

// Diver Type
const DiverType = new GraphQLObjectType({
  name: "Diver",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    date: { type: GraphQLString },
    note: { type: GraphQLString }
  })
});
// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    diver: {
      type: DiverType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        /*
        for (let i = 0; i < divers.length; i++) {
          if (divers[i].id == args.id) {
            return divers[i];
          }
        }
        */

        return axios
          .get("http://localhost:3000/divers/" + args.id)
          .then(res => res.data);
      }
    },
    divers: {
      type: new GraphQLList(DiverType),
      resolve(parentValue, args) {
        return axios.get("http://localhost:3000/divers").then(res => res.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDiver: {
      type: DiverType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:3000/divers", {
            name: args.name,
            location: args.location,
            notes: args.notes
          })
          .then(res => res.data);
      }
    },
    deleteDiver: {
      type: DiverType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return axios
          .delete("http://localhost:3000/divers" + args.id)
          .then(res => res.data);
      }
    },
    editDiver: {
      type: DiverType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        notes: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios
          .patch("http://localhost:3000/divers/" + args.id, args)
          .then(res => res.data);
      }
    }
  }
});

module.export = new GraphQLSchema({
  query: RootQuery,
  mutation
});
