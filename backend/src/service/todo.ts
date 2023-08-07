const todoService = (repository: any) => {
  return {
    getTodos: async () => {
      return await repository.getTodos();
    },
  };
};

module.exports = todoService;
