// src/pages/Signup.jsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/Google.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!agree) return toast.error("You must agree to the terms and conditions");

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", result.user.uid), {
        username,
        email,
        isSubscribed: false,
        image: "",
      });

      await sendEmailVerification(result.user);
      toast.success("Signup successful! Please verify your email.");

      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await setDoc(doc(db, "users", result.user.uid), {
        username: result.user.displayName,
        email: result.user.email,
        isSubscribed: false,
        image: result.user.photoURL,
      });

      toast.success("Signed up with Google!");
      navigate("/Login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="bg-black p-4 rounded shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
            <label className="form-check-label">
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button type="submit" className="btn btn-danger w-100 mb-2" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
          disabled={loading}
        >
          <img src={GoogleLogo} alt="Google" style={{ width: "20px", marginRight: "10px" }} />
          Continue with Google
        </button>

        <p className="mt-3 text-center">
          Already have an account? <a href="/Login" className="text-info">Log in</a>
        </p>
      </div>
    </div>
  );
}
