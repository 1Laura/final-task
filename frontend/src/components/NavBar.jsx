import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useStore from "../store/useStore.js";

const NavBar = () => {
    const {currentUser, logout} = useStore(state => state);
    const navigate = useNavigate();
    function userLogout(){
        logout();
        navigate("/");
    }
    return (
        <div className="navbar navbar-light bg-secondary-subtle d-flex justify-content-between px-5 py-0">
            <div className="d-flex gap-2 navbar-nav flex-row align-items-center">
                <div className="d-inline">
                    <img src="/paw.svg" className=" navbar-brand w-25" alt="icon"/>
                </div>

                {!currentUser && (<Link to="/" className="nav-link p-2 "><b>Register/Login</b></Link>)}

                {currentUser && (
                    <>
                        <Link to="/allposts" className="nav-link p-2"><b>All Posts</b></Link>
                        <Link to="/createpost" className="nav-link p-2"><b>Create Post</b></Link>
                        <Link to="/profile" className="nav-link p-2"><b>Profile</b></Link>

                        <Link to="/favorites" className="nav-link p-2"><b>Favorites</b></Link>
                        <button onClick={userLogout} className="btn btn-outline-secondary btn-sm ms-3">
                            Logout
                        </button>
                    </>
                )}
            </div>
            <div>
                {currentUser?.username ? (
                    <>Logged in as: <b>{currentUser.username}</b></>
                ) : (
                    <b>Not logged in</b>
                )}
            </div>
        </div>
    );
};

export default NavBar;