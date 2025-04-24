import React from "react";
import Todo from "../components/views/Todo";
import { tasks } from "../data/tasks";
import "./TodoPage.css";

const TodoPage = () => {
  return (
    <div className="todo-page">
      <h1>Gestión de Tareas</h1>
      <Todo tasks={tasks} />
    </div>
  );
};

export default TodoPage;
