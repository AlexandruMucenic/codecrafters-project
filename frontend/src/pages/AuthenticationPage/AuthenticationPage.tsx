import React, { useEffect, useState } from "react";
import "./AuthenticationPage.css";
import { usersURL } from "../../urls";
import { useNavigate } from "react-router";

type Mode = "login" | "register" | "reset";

export const AuthenticationPage = () => {
  const [mode, setMode] = useState<Mode>("login");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`${usersURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      setMessage(`${data.message}`);
      setMode("login");
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage(`${error.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${usersURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEmail("");
        setPassword("");
        throw new Error(data.message);
      }

      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("storage"));
      setIsLoggedIn(true);

      setMessage("");
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error: any) {
      setMessage(`${error.message}`);
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch(`${usersURL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEmail("");
        setNewPassword("");
        setMessage(`${data.message}`);
        throw new Error(data.message);
      }

      setMessage(`${data.message}`);
      setMode("login");
      setEmail("");
      setNewPassword("");
    } catch (error: any) {
      setMessage(`${error.message}`);
    }
  };

  const backToLogin = () => {
    setMode("login");
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  const redirectToRegister = () => {
    setMode("register");
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  const redirectToReset = () => {
    setMode("reset");
    setEmail("");
    setNewPassword("");
  };

  if (isLoggedIn) {
    return (
      <div className="auth-container">
        <h1>Login successful</h1>
        <p>Have a nice shopping</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h1>
        {mode === "login"
          ? "Login"
          : mode === "register"
          ? "Register"
          : "Reset Password"}
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {mode === "register" && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      {(mode === "login" || mode === "register") && (
        <>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}

      {mode === "register" && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}

      {mode === "reset" && (
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      )}

      <button
        onClick={() => {
          if (mode === "login") handleLogin();
          else if (mode === "register") handleRegister();
          else if (mode === "reset") handleResetPassword();
        }}
      >
        {mode === "login"
          ? "Login"
          : mode === "register"
          ? "Register"
          : "Reset Password"}
      </button>

      <div className="switch">
        {mode === "login" && (
          <>
            <button onClick={redirectToRegister}>Go to Register</button>
            <button onClick={redirectToReset}>Forgot Password?</button>
          </>
        )}
        {mode === "register" && (
          <button onClick={backToLogin}>Back to Login</button>
        )}
        {mode === "reset" && (
          <button onClick={backToLogin}>Back to Login</button>
        )}
      </div>

      <p className="message">{message}</p>
    </div>
  );
};

export default AuthenticationPage;
