import React, {useRef, useState} from 'react';
import http from "../plugins/https";
import {useNavigate} from "react-router-dom";
import useStore from "../store/useMain.js";

const UserLogin = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();
    const {setUser} = useStore(state => state);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            setError("All fields are required");
            return;
        }

        const response = await http.post("/login", {username, password});

        if (response.success) {
            console.log(response)
            localStorage.setItem("token", response.token);
            setUser(response.user);
            setSuccess(`Login successful. Redirecting...`);
            navigate("/allposts");
        } else {
            setError(response.error || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="mx-auto p-4 border rounded">
            <h2>User Login</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            {success && <p className="alert alert-success">{success}</p>}

            <div className="mb-3">
                <label>Username:</label>
                <input type="text" ref={usernameRef} placeholder="Please enter you email" className="w-100 p-1 mt-2"/>
            </div>
            <div className="mb-3">
                <label>Password:</label>
                <input type="password" ref={passwordRef} placeholder="Please enter password" className="w-100 p-1 mt-2"/>
            </div>

            <button onClick={handleSubmit} className="btn btn-secondary w-100 border-dark"> Login</button>
        </div>
    );
};

export default UserLogin;