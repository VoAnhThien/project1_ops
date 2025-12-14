import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  // ✅ Sửa URL ở đây để gọi đúng backend Render
  useEffect(() => {
    fetch("https://project1-ops.onrender.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Lỗi khi fetch users:", err));
  }, []);

  const addUser = async () => {
    await fetch("https://project1-ops.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    setName("");
    const res = await fetch("https://project1-ops.onrender.com/users");
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
