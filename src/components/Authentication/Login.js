import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/dashboard');
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login_container">
        <input
          type="text"
          className="login_textBox"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Email Address"
        />
        <input
          type="password"
          className="login_textBox"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Password"
        />
        <div className="login_forgot">
          <Link to="/reset" className="link-forgot">Forgot Password?</Link>
        </div>
        <button
          className="login_btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login_btn login_google" onClick={signInWithGoogle} >
          Login with Google
        </button>
        
        <div className="login_register">
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;