import React, { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import "./Register.css"

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);

    return (
        <div className="register">
            <div className="register_container">
                <input
                    type="text"
                    className="register_textBox"
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                    placeholder="Full Name"
                />
                <input
                    type="text"
                    className="register_textBox"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    placeholder="Email Address"
                />
                <input
                    type="password"
                    className="register_textBox"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    placeholder="Password"
                />
                <button className="register_btn" onClick={ register }>
                    Signup
                </button>
                <button
                    className="register_btn register_google"
                    onClick={ signInWithGoogle }
                >
                    Signup with Google
                </button>
                <div  className="login_register">
                    Already have an account? <Link to="/login">Login</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Register;