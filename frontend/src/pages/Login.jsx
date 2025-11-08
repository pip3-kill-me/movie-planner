import { useState } from "react";
import axios from "axios";
import { API_URL } from "./lib/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("user", res.data.username);
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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#1a1a1a] p-8 rounded-2xl shadow-lg w-80 border border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && (
          <p className="text-red-500 mb-2 text-center text-sm">{error}</p>
        )}
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-[#0f0f0f] border border-gray-700 focus:border-blue-500 outline-none"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-5 rounded bg-[#0f0f0f] border border-gray-700 focus:border-blue-500 outline-none"
        />
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
