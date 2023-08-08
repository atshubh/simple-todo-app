import React, { Component } from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import { Task } from "../features/todo-list/task.interface";
import { fetchToDos } from "../features/todo-list/todo-list.slice";
import { RootState } from "../store";

type TodoProps = {
  fetchToDos: Function;
  todoList: Task[];
};

class TodoList extends Component<TodoProps> {
  componentDidMount() {
    this.props.fetchToDos();
  }

  render() {
    const toDos = this.props.todoList;
    console.log(this.props);
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

const mapStateToProps = (state: RootState) => ({
  todoList: state.todoList.list,
});

export default connect(mapStateToProps, { fetchToDos })(TodoList);
