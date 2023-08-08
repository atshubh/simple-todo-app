import { Repository, RepositoryBase } from "../interfaces/repository.interface";

let id = 1;

const db: RepositoryBase = {
  toDos: [
    {
      id: 1,
      title: "This is a todo example",
      completed: false,
      project: "inbox",
      deleted: false,
      dateCreated: new Date(),
    },
  ],
};

const repository: Repository = {
  getToDos: () => Promise.resolve(db),
};

module.exports = repository;
