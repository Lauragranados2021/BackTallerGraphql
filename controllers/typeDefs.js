const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Alquiler {
    id: ID!
    ContractStartDate: String
    ContractEndDate: String
    price: Int
  }
  type Oficina {
    id: ID!
    name: String
    direccion: String
    capacidad: Int
    alquiler: [Alquiler]
  }
  type Query {
    hello: String
    getOficinas: [Oficina]
    getOficina(id: ID): Oficina
    getAlquilers: [Alquiler]
    getAlquiler(id: ID): Alquiler
  }
  type Mutation {
    createOficina(
      id: ID!
      name: String
      direccion: String
      capacidad: Int
    ): Oficina
    createAlquiler(
      id: ID!
      ContractStartDate: String
      ContractEndDate: String
      price: Int
      IDoficina: ID
    ): Alquiler
    deleteOficina(id: ID!): Oficina
    deleteAlquiler(id: ID!): Alquiler
    updateOficina(
      id: ID!
      name: String
      direccion: String
      capacidad: Int
    ): Oficina
    updateAlquiler(
      id: ID!
      ContractStartDate: String
      ContractEndDate: String
      price: Int
      IDoficina: ID
    ): Alquiler
  }

`;
module.exports = { typeDefs };
