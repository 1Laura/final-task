import React, {useRef, useState} from 'react';
import http from "../plugins/https";

const UserRegister = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async () => {
        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (!username || !password || !confirmPassword) {
            setError("All fields are required");
            setSuccess("");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setSuccess("");
            return;
        }

        setError("");

        try {
            const userInfo = {
                username: username,
                password: password
            }
            // console.log("Sending to /register:", userInfo);

            const response = await http.post("/register", userInfo);
            console.log(response)
            if (response.success) {
                setSuccess("Registration successful!");
                setError("");
                usernameRef.current.value = "";
                passwordRef.current.value = "";
                confirmPasswordRef.current.value = "";
            } else {
                setError("Registration failed. Please try again.");
                setSuccess("");
            }
            console.log(response)

        } catch (err) {
            console.log(err);
            setSuccess("");
            setError("User exists");
        }
    };

    return (
        <div className="mx-auto p-4 border rounded">
            <h2>User Registration</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            {success && <p className="alert alert-success">{success}</p>}

            <div className="mb-3">
                <label>Username:</label>
                <input type="text" ref={usernameRef} placeholder="Please enter uniq username" className="w-100 p-1 mt-2"/>
            </div>

            <div className="mb-3">
                <label>Password:</label>
                <input type="password" ref={passwordRef} placeholder="Please enter password" className="w-100 p-1 mt-2"/>
            </div>
            <div className="mb-3">
                <label>Confirm Password:</label>
                <input type="password" ref={confirmPasswordRef} placeholder="Please confirm password" className="w-100 p-1 mt-2"/>
            </div>

            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary w-50 border-dark" onClick={handleSubmit}> Register</button>
            </div>
        </div>
    );
};

export default UserRegister;