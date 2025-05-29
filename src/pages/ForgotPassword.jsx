// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to send password reset email.");
    }
  }; 

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="bg-black p-4 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Reset Password</h3>

        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Send Reset Link
          </button>
        </form>

        <p className="mt-3 text-center">
          <Link to="/login" className="text-info">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
