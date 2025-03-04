import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="login-card p-4 shadow-lg"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-4 text-primary fw-bold"
        >
          Welcome Back!
        </motion.h2>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-3"
          >
            <label className="form-label">Email</label>
            <input 
            id="t"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-3"
          >
            <label className="form-label">Password</label>
            <input id="t"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 123, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary w-100 mt-3"
          >
            Login
          </motion.button>
        </form>

        <div className="text-center mt-3">
          <a href="#" className="text-black text-decoration-none ">Forgot Password?</a>
        </div>

        <div className="text-center mt-3">
          <span className="text-black">Don't have an account? </span>
          <a href="/signup" className="text-primary fw-bold text-decoration-none">Sign Up</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
