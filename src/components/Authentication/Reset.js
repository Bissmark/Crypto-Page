import React, { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset  } from "../../firebase";
import "./Reset.css"

function Reset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);

    return (
        <div className="reset">
            <div className="reset_container">
                <input
                    type="text"
                    className="reset_textBox"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    placeholder="Email address"
                />
                <button 
                    className="reset_btn" 
                    onClick={ () => sendPasswordReset(email) }
                >
                    Send password reset email
                </button>
                <div className="no_account">
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Reset;