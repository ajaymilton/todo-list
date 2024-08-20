const API_BASE_URL = "https://your-backend-api-url.com";

export const fetchTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  return response.json();
};

export const createTodo = async (todo) => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const updateTodo = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${API_BASE_URL}/todos/${id}`, { method: "DELETE" });
};
