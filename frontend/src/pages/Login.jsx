import { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:5000/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [fade, setFade] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      if (res.data.success) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);
        if (remember) localStorage.setItem("remember", "true");
        setFade(true);
        setTimeout(onLogin, 400);
      }
    } catch {
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div
      className={`flex items-center justify-center h-screen bg-gradient-to-br from-[#0e0e10] via-[#111827] to-[#1e1b4b] transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <form
        onSubmit={handleLogin}
        className="bg-gray-900/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700 w-80 text-center"
      >
        <h1 className="text-2xl mb-6 text-blue-400 font-semibold">🎥 Movie Planner</h1>
        <input
          className="w-full mb-3 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-200"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-3 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-200"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="flex items-center text-gray-400 text-sm mb-3">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mr-2 accent-blue-500"
          />
          Lembrar-me
        </label>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
