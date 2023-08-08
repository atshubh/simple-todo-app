const todoList = {
  todos: [
    {
      title: "This is a todo example",
    },
  ],
};

module.exports = {
  getTodos: () => Promise.resolve(todoList),
};
