import React, { type FC } from "react";
import "./styles.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const TodoApp: FC = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default TodoApp;
