import React from 'react';
import {Link} from 'react-router-dom';
import useStore from "../store/useStore.js";

const NavBar = () => {
    const {currentUser} = useStore(state => state);

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
                        <Link to="/userprofile" className="nav-link p-2"><b>User Profile</b></Link>

                        <Link to="/allusers" className="nav-link p-2"><b>All Users</b></Link>
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