import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoApi,
} from "./api";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, []);

  const addTodo = async (todo) => {
    const newTodo = await createTodo({ task: todo, completed: false });
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id) => {
    await deleteTodoApi(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = await updateTodo(id, { completed: !todo.completed });
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (task, id) => {
    const updatedTodo = await updateTodo(id, { task });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...updatedTodo, isEditing: false } : todo
      )
    );
  };

  // Rest of the component remains the same...
};
