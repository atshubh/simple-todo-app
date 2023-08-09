import express from "express";
import cors from "cors";
import repository from "./repository/todo-list.repository";
import todoService from "./service/todo.service";
const toDoService = todoService(repository);

const server = () => {
  const expressServer = express();
  expressServer.use(express.json());
  expressServer.use(cors());

  const isFiniteInteger = (s: string) => s ?? isFinite(parseInt(s, 10));

  expressServer.get("/api/todo", async (_req, res) => {
    const response = await toDoService.getToDos();
    res.json(response);
  });

  expressServer.post("/api/todo/add", async (req, res) => {
    const response = await toDoService.addToDo(req.body);
    res.json(response);
  });

  expressServer.delete("/api/todo/delete", async (req, res) => {
    const idToDelete = req.query.id as string;
    if (isFiniteInteger(idToDelete))
      res.json(await toDoService.deleteToDo(parseInt(idToDelete)));
  });

  expressServer.put("/api/todo/update", async (req, res) => {
    const idToUpdate = req.query.id as string;
    if (isFiniteInteger(idToUpdate) && req.body && typeof req.body === "object")
      res.json(await toDoService.updateToDo(parseInt(idToUpdate), req.body));
  });

  return expressServer;
};

export { server };
