import { useState } from "react";
import axios from "axios";
import { API_URL } from "../lib/api";

export default function Login({ onLogin }) {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      if (res.data.success) {
        onLogin(res.data.username);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#111] text-white">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">🎬 nossa lista</h1>

      <form
        onSubmit={handleLogin}
        className="bg-[#1a1a1a]/70 backdrop-blur-md p-8 rounded-xl w-80 border border-gray-800 shadow-lg"
      >
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUser(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-[#111] border border-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-[#111] border border-gray-700 text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 rounded py-2 transition-all"
        >
          Entrar
        </button>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
      </form>
    </div>
  );
}
