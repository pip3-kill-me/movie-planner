import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Planner from "./Planner";

export default function App() {
  const [username, setUsername] = useState(null);

  // Restore saved session
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUsername(saved);
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
    localStorage.setItem("user", name);
  };

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Planner username={username} onLogout={handleLogout} />
      )}
    </div>
  );
}
