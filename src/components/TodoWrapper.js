import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
//import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoApi,
} from "./api";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setIsLoading(false)
      }
    };
    loadTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const newTodo = await createTodo({ task: todo, completed: false });
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
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

  return (
    <div className="TodoWrapper">
      <h1>Getting Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <Todo
              key={todo.id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
            />
          )
        )
      )}
    </div>
  );
};