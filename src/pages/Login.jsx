import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './LogIn.css'

const Login = () => {
    const [username, setUsername] = useState("");
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        const userData = {
            username: username,
            role: "user" 
        };

        logIn(userData);
        navigate("/");
    };

    const handleGoogleLogin = () => {
        const googleUserData = {
            username: "Google User",
            role: "user"
        };
        logIn(googleUserData);
        navigate("/");
    };

    return (
        <div className="logIn-page" >
            <h2>Login to Your Account 🔐</h2>
            <form className="logIn-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter your username..." 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="submit" >
                    Login
                </button>
            </form>
            <hr style={{ margin: '20px 0', borderColor: '#eee' }} />
            <button className="google-btn" onClick={handleGoogleLogin} >
                Sign in with Google 🌐
            </button>
        </div>
    );
};

export default Login;