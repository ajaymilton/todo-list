const API_BASE_URL = "http://localhost:8080/api/v1/todo";

// Fetch all todos
export const fetchTodos = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (todo) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: todo }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create todo: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const updateTodo = async (id, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updates.title }),  // Ensure the correct key is used
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete todo: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
