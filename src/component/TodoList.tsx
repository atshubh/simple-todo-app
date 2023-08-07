import React, { Component } from "react";
import Todo from "./Todo";
import { fetchTodos } from "../actions";
import { connect } from "react-redux";

type TodoProps = {
  fetchTodos: any;
  data: any;
};

class TodoList extends Component<TodoProps> {
  state = {};

  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const { todos } = this.props.data;
    return (
      <ul className="todo-list">
        {todos && todos.length
          ? todos.map((todo: any, index: number) => {
              return <Todo key={`todo-${index}`} todo={todo.task} />;
            })
          : "No todos, yay!"}
      </ul>
    );
  }
}

const mapStateToProps = ({ data = {}, isLoadingData = false }) => ({
  data,
  isLoadingData,
});
export default connect(mapStateToProps, {
  fetchTodos,
})(TodoList);
