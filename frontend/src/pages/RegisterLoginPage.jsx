import React from 'react';
import UserRegister from "../components/UserRegister.jsx";
import UserLogin from "../components/UserLogin.jsx";

const RegisterLoginPage = () => {
    return (
        <div className="container pt-5">
            <div className="d-flex gap-5">
                <div className="flex-grow-1">
                    <UserRegister/>
                </div>
                <div className="flex-grow-1">
                    <UserLogin/>
                </div>
            </div>
        </div>
    );
};

export default RegisterLoginPage;