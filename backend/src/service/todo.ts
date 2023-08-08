import { Repository } from "../interfaces/repository.interface";

const todoService = (repository: Repository) => {
  return {
    getToDos: async () => {
      return await repository.getToDos();
    },
  };
};

module.exports = todoService;
