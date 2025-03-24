import React from 'react';
import {Link} from 'react-router-dom';
import useStore from "../store/useMain.js";

const NavBar = () => {
    const {user} = useStore(state => state);

    return (
        <div className="d-flex justify-content-between p-3 mb-5">
            <div className="d-flex gap-2">
                {!user && (<Link to="/" className="p-2">Register/Login</Link>)}

                {user && (
                    <>
                        <Link to="/userprofile" className="p-2">User Profile</Link>
                        <Link to="/allposts" className="p-2">All Posts</Link>
                        <Link to="/createpost" className="p-2">Create Post</Link>
                        <Link to="/allusers" className="p-2">All Users</Link>
                    </>
                )}
            </div>
            <div>
                {user?.username ? (
                    <>Logged in as: <b>{user.username}</b></>
                ) : (
                    <b>Not logged in</b>
                )}
            </div>
        </div>
    );
};

export default NavBar;