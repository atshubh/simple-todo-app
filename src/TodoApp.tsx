import React from "react";
import TodoList from "./component/TodoList";
import "./styles.css";

const TodoApp = () => {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
}

export default TodoApp;