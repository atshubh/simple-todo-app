import React, { type ChangeEvent } from "react";
import { type ConnectedProps, connect } from "react-redux";
import { type RootState } from "../store";
import {
  deleteToDo,
  toDoCheckUpdate,
} from "../features/todo-list/todo-list.slice";

interface ToDoProps extends PropsFromRedux {
  id: number;
}

const Todo = (props: ToDoProps) => {
  const { todo, id, toDoCheckUpdate, deleteToDo } = props;

  const checkboxHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const checkboxStatus = e?.target?.checked;
    await toDoCheckUpdate({ id, completed: checkboxStatus });
  };

  const deleteHandler = async () => {
    await deleteToDo(id);
  };

  return (
    <>
      <li id={`todo-id-${id}`} className="todo-item">
        <label>
          <input
            type="checkbox"
            className="task-checkbox"
            checked={todo?.completed}
            name={`todo-checkbox-${id}`}
            onChange={checkboxHandler}
          />
          {todo?.completed ? <s>{todo?.title}</s> : todo?.title}
        </label>
        <button className="delete-button" onClick={deleteHandler}>
          X
        </button>
      </li>
    </>
  );
};
const mapStateToProps = (state: RootState, ownProps: { id: number }) => {
  const { id } = ownProps;
  return {
    todo: state.todoList.list.find((item) => item.id === id),
  };
};

const connector = connect(mapStateToProps, { toDoCheckUpdate, deleteToDo });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Todo);

// export default Todo;
