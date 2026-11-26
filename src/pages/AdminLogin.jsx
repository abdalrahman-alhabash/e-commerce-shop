import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import './AdminLogin.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 

const AdminLogin = () => {
    const [secretKey, setSecretKey] = useState("");
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        
        if (secretKey === "admin123") {
            const adminData = {
                username: "System Admin",
                role: "admin"
            };
            
            logIn(adminData);
            toast.success("Welcome to Admin Dashboard 🛠️");
            navigate("/addProduct"); 
        } else {
            toast.error("Invalid Admin Credentials ❌");
        }
    };

    return (
        <div className="adminLogin-page" >
            <h2>🔒 Admin Portal Login</h2>
            <p>Restricted area for authorized personnel only.</p>
            
            <form className="adminLogin-form" onSubmit={handleAdminSubmit}>

        <div className="password-container">
    <input 
        type={showPassword ? "text" : "password"} 
        placeholder="Enter Admin Secret Key..." 
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        required
    />
    <button 
        type="button" 
        onClick={() => setShowPassword(!showPassword)}
    >
        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
    </button>
</div>
                <button type="submit" >
                    Access Admin Panel
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;