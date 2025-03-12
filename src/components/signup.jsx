import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router navigation
import "./style.css";
import "../App.css";

export default function Signup({ onClose }) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async () => {
  setError("");
  setLoading(true);

  if (!isLogin && password !== confirmPassword) {
    setError("Passwords do not match.");
    setLoading(false);
    return;
  }

  const endpoint = isLogin
    ? "http://localhost:5000/login"
    : "http://localhost:5000/signup";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Success:", data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      console.error("Response not OK:", data);
      setError(data.message || "Something went wrong.");
    }
  } catch (err) {
    console.error("Fetch error:", err); // Log fetch error details
    setError("Server error. Try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="signup-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {!isLogin && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}

      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
      </button>

      {error && <p className="error-message">{error}</p>}

      <p onClick={() => setIsLogin(!isLogin)} className="switch-text">
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
      </p>

      <button className="close-btn" onClick={onClose}>X</button>
    </div>
  );
}
