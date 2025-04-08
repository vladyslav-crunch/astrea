import { useEffect, useState } from "react";
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
} from "./services/todoService";

type Todo = {
  _id: string;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    const newTodo = await createTodo(title);
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t._id !== id));
  };

  const handleToggle = async (id: string, current: boolean) => {
    const updated = await toggleTodo(id, !current);
    setTodos(todos.map(t => (t._id === id ? updated : t)));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h1>📝 Todo List</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo._id} style={{ marginTop: "1rem" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo._id, todo.completed)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                marginLeft: "0.5rem",
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => handleDelete(todo._id)}
              style={{ marginLeft: "1rem", color: "red" }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
