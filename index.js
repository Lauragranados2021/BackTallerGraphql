const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./controllers/typeDefs.js");
const { resolvers } = require("./controllers/resolvers");
require("./drivers/conect-db");

const app = express();

async function start() {
  app.use(cors());
  app.use(express.json());
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });
  await apollo.start();
  apollo.applyMiddleware({ app });
  app.set("port", process.env.PORT || 4000);
  app.use("/", (req, res) => res.json({ response: "back de graphql" }));
  const port = app.get("port");
  app.listen(port, () => console.log(`Server on port ${port}`));
}

start();
