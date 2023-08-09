import React, { Component, type ReactNode } from "react";
import Todo from "./Todo";
import { type ConnectedProps, connect } from "react-redux";
import { fetchToDos } from "../features/todo-list/todo-list.slice";
import { type RootState } from "../store";

interface TodoProps extends PropsFromRedux {
  project: string;
}

class TodoList extends Component<TodoProps> {
  componentDidMount = async () => {
    await this.props.fetchToDos();
  };

  render(): ReactNode {
    const toDos = [...this.props.todoList]
      .filter((task) => !task.deleted)
      .sort((a, b) => (a.completed && !b.completed ? 1 : -1));

    return (
      <ul className="todo-list">
        {toDos.map((todo) => {
          return <Todo key={todo.id} id={todo.id} />;
        })}
      </ul>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    todoList: state.todoList.list,
  };
};

const connector = connect(mapStateToProps, { fetchToDos });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TodoList);
