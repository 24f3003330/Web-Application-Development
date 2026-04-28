import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", completed: false }
  ]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (!text.trim()) return;
    // ✅ FIX: [Date.now](http://Date.now)() → Date.now()
    setTasks([{ id: Date.now(), text, completed: false }, ...tasks]);
    setText("");
  };

  const toggleTask = (id) => {
    // ✅ FIX: [tasks.map](...) → tasks.map(...) (link artifact wrapped in array brackets)
    // ✅ FIX: [t.id](http://t.id) → t.id
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filtered = tasks.filter(t =>
    filter === "All" ? true : filter === "Pending" ? !t.completed : t.completed
  );

  return (
    <div>
      {/* ✅ FIX: [e.target](http://e.target) → e.target */}
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTask}>Add</button>

      {/* ✅ FIX: JSX structure was completely broken — </div> and ))} were before
          the filter map's opening {, and the wrapping <div> was never properly closed */}
      <div>
        {["All", "Pending", "Completed"].map(f => (
          <button key={f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {/* ✅ FIX: [filtered.map](http://filtered.map) → filtered.map */}
      {filtered.map(t => (
        // ✅ FIX: [t.id](http://t.id) → t.id (× 2)
        <div key={t.id} onClick={() => toggleTask(t.id)}>
          {t.text} {t.completed && "✔"}
        </div>
      ))}
    </div>
  );
}

export default App;
