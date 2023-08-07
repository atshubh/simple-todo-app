import React from "react";
import { connect } from "react-redux";

const Todo = ({ todo }: any) => (
  <li className="todo-item">
    <span className="todo-item__text">{todo}</span>
  </li>
);

// export default Todo;
export default connect(null)(Todo);
