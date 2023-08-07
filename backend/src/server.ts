import express from "express";
const cors = require("cors");
const repository = require("./repository/todo");
const todoService = require("./service/todo")(repository);

const server = () => {
  const expressServer = express();
  expressServer.use(express.json());
  expressServer.use(cors());

  expressServer.get("/api/todo", async (req, res) => {
    res.json(await todoService.getTodos());
  });

  return expressServer;
};

export { server };
