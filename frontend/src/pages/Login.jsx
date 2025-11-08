import { useState } from "react";
import axios from "axios";
import { API_URL } from "../lib/api"; // adjust to ./lib/api if not inside /pages

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      if (res.data.success) {
        if (remember) localStorage.setItem("user", res.data.username);
        onLogin(res.data.username);
      } else {
        setError("Usuário ou senha incorretos");
      }
    } catch (err) {
      console.error(err);
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#000] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#181818]/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80 border border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">🎬 Movie Planner</h2>
        {error && (
          <p className="text-red-500 mb-3 text-center text-sm">{error}</p>
        )}
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 rounded-lg bg-[#0f0f0f] border border-gray-700 focus:border-blue-500 outline-none"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 rounded-lg bg-[#0f0f0f] border border-gray-700 focus:border-blue-500 outline-none"
        />
        <label className="flex items-center text-sm mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mr-2 accent-blue-500"
          />
          Lembrar login
        </label>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
