import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider as googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import GoogleLogo from "../assets/Google.png"; // Add Google logo image in assets

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/Home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-dark text-white d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Login
          </button>
        </form>

        <div className="my-3 text-center">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-light w-100 d-flex align-items-center justify-content-center"
        >
          <img
            src={GoogleLogo}
            alt="Google"
            style={{ width: "20px", marginRight: "10px" }}
          />
          Continue with Google
        </button>

        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-info">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
