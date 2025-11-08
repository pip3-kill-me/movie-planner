import { useState, useEffect } from "react";
import Planner from "./Planner";
import Login from "./pages/Login";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  useEffect(() => {
    if (!localStorage.getItem("remember")) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("username");
    }
  }, []);

  return loggedIn ? (
    <Planner username={username} />
  ) : (
    <Login
      onLogin={() => {
        setLoggedIn(true);
        setUsername(localStorage.getItem("username"));
      }}
    />
  );
}
