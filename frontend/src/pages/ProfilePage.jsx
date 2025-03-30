import React, { useRef, useState} from 'react';
import useStore from "../store/useStore.js";
import http from "../plugins/https.js";

const ProfilePage = () => {
    const {setCurrentUser, currentUser} = useStore(state => state);//gaunu username ir _id
    // console.log(currentUser)
    const newUsernameRef = useRef(null);
    const newImageRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [username, setUsername] = useState(currentUser.username);
    const [image, setImage] = useState(currentUser.image);


    async function changeUsername() {
        const username = newUsernameRef.current.value;
        const response = await http.postToken("/updateprofile", {username});
        // console.log(response);
        setUsername(response.user.username);
        setCurrentUser(response.user);
    }

    async function changeImage() {
        const image = newImageRef.current.value;
        const response = await http.postToken("/updateprofile", {image});
        // console.log(response.user.image);
        setImage(response.user.image);
    }

    async function changePassword() {
        const password = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        await http.postToken("/updateprofile", {password, confirmPassword});
    }


    return (
        <div className="container pt-5">
            <h2>Profile page</h2>

            <div className="d-flex column-gap-3">
                <div className="flex-grow-1 text-center w-50">
                    <img src={image} className="img-thumbnail rounded-5 w-75 mb-3" alt=""/>
                    <h5>Username: <b>{username}</b></h5>
                </div>

                <div className="flex-grow-1 w-50">
                    <h3>Update Profile</h3>
                    <div className="m-2">
                        <label className="me-2">New username:</label>
                        <input type="text" className="w-100 p-1 mt-2" ref={newUsernameRef}/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-secondary w-50 border-dark" onClick={changeUsername}>Change username</button>
                    </div>

                    <div className="m-2">
                        <label className="me-2">New image URL:</label>
                        <input type="text" className="w-100 p-1 mt-2" ref={newImageRef}/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-secondary w-50 border-dark" onClick={changeImage}>Change photo</button>
                    </div>

                    <div className="m-2">
                        <label className="me-2">New password:</label>
                        <input type="password" className="w-100 p-1 mt-2" ref={newPasswordRef}/>
                    </div>
                    <div className="m-2">
                        <label className="me-2">Confirm new password:</label>
                        <input type="password" className="w-100 p-1 mt-2" ref={confirmPasswordRef}/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-secondary w-50 border-dark" onClick={changePassword}>Change password</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProfilePage;