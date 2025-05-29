// src/pages/Login.jsx
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogo from "../assets/Google.png";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (!result.user.emailVerified) {
        toast.warn("Please verify your email before logging in.");
        await auth.signOut();
        return;
      }

      toast.success("Login successful!");
      navigate("/Home");
    } catch (err) {
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!");
      navigate("/Home");
    } catch (err) {
      toast.error("Google sign-in failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="bg-black p-4 rounded shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 mb-2" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-3">
  <Link to="/forgot-password" className="text-warning">Forgot Password?</Link>
</p>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
          disabled={loading}
        >
          <img src={GoogleLogo} alt="Google" style={{ width: "20px", marginRight: "10px" }} />
          Continue with Google
        </button>

        <p className="mt-3 text-center">
          Don’t have an account? <a href="/Signup" className="text-info">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
