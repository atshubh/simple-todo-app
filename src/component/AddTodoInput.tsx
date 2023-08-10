import { type ConnectedProps, connect } from "react-redux";
import React, { useState } from "react";
import { addToDo } from "../features/todo-list/todo-list.slice";
import { generateID } from "../utilities/id";

interface AddToDoProps extends PropsFromRedux {}

const AddToDoInput = (props: AddToDoProps) => {
  const [titleValue, setTitleValue] = useState("");
  const { addToDo } = props;
  const addSubmitHandler = async (e: any) => {
    e.preventDefault();
    await addToDo({ id: generateID(), title: titleValue });
    setTitleValue("");
  };
  return (
    <form onSubmit={addSubmitHandler}>
      <label htmlFor="add-todo-text-field" style={{ display: "none" }}>
        Add To-do
      </label>
      <input
        className="add-todo"
        type="text"
        placeholder="Add To-do"
        id="add-todo-text-field"
        name="add-todo-text-field"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
    </form>
  );
};

const connector = connect(null, { addToDo });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddToDoInput);
