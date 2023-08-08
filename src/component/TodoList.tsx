import React, { Component } from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import { Task } from "../features/todo-list/task.interface";
import {
  ToDoListState,
  fetchToDos,
} from "../features/todo-list/todo-list.slice";

type TodoProps = {
  fetchToDos: any;
  todoList: Task[];
};

class TodoList extends Component<TodoProps> {
  state = {};

  componentDidMount() {
    this.props.fetchToDos();
  }

  render() {
    const toDos = this.props.todoList;
    return (
      <ul className="todo-list">
        {toDos && toDos.length
          ? toDos.map((todo: Task) => {
              return <Todo key={`todo-${todo.id}`} todo={todo.title} />;
            })
          : "No todos, yay!"}
      </ul>
    );
  }
}

const mapStateToProps = (state: ToDoListState) => ({
  todoList: state.list,
});

export default connect(mapStateToProps, { fetchToDos })(TodoList);
