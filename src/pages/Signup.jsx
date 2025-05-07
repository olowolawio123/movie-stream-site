// src/pages/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/Google.png"; // Add Google logo image in assets

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!agree) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", result.user.uid), {
        username,
        email,
        isSubscribed: false,
        image: "",
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db, "users", result.user.uid), {
        username: result.user.displayName,
        email: result.user.email,
        isSubscribed: false,
        image: result.user.photoURL,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="bg-black p-4 rounded shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4 text-center">Sign Up</h2>

        {error && <div className="alert alert-danger">{error}</div>}

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
              I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
             </a>

            </label>
          </div>

          <button type="submit" className="btn btn-danger w-100 mb-2">Sign Up</button>
        </form>

        <button onClick={handleGoogleSignup} className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center">
          <img
                      src={GoogleLogo}
                      alt="Google"
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                    Continue with Google
        </button>

        <p className="mt-3 text-center">
          Already have an account? <a href="/login" className="text-info">Log in</a>
        </p>
      </div>
    </div>
  );
}
