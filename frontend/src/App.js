import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const addUser = async () => {
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    setName("");
    const res = await fetch("http://localhost:5000/users");
    setUsers(await res.json());
  };

  return (
    <div>
      <h1>Danh sách Users</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addUser}>Thêm</button>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
