const API_URL = "/api/todos";

export async function fetchTodos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createTodo(title: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function deleteTodo(id: string) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export async function toggleTodo(id: string, completed: boolean) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return res.json();
}
