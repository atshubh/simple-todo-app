import React, { type FC } from "react";
import { connect } from "react-redux";
import TodoList from "../component/TodoList";
import AddTodo from "../component/AddTodoInput";

const Home: FC = () => (
  <>
    <h1>To-do list</h1>
    <div className="add-todo-container">
      <AddTodo></AddTodo>
    </div>
    <div className="todo-list-container">
      <TodoList project="inbox"></TodoList>
    </div>
  </>
);

// export default Todo;
export default connect(null)(Home);
