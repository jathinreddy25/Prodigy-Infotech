import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginForm.css'; 
import { useNavigate } from 'react-router-dom';
const uri= import.meta.env.VITE_API_URL;
function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const onLogin = (user) => {
          navigate('/', { state: { user } }); 
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${uri}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });
        const data = await response.json();
        if (data.message === 'Login successful') {
            localStorage.setItem('token', data.token);
            alert("Successful Login");
            onLogin(data.user); // Handle post-login actions (e.g., storing token, redirecting)
        } else {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>

            {/* Links to Register and Forgot Password */}
            <div className="login-links">
                <p>
                    Don't have an account? <Link to="/register" className="link">Register here</Link>
                </p>
                <p>
                    Forgot your password? <Link to="/forgot-password" className="link">Reset it here</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
