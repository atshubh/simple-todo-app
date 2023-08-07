import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import TodoApp from "./TodoApp";

const container = document.getElementById("root");

const root = createRoot(container as Element);
root.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>
);
