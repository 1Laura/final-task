import React, {useRef, useState} from 'react';
import useStore from "../store/useStore.js";
import http from "../plugins/https.js";

const ProfilePage = () => {
    const {setCurrentUser, currentUser} = useStore(state => state);//gaunu username ir _id
    // console.log(currentUser)
    const newUsernameRef = useRef(null);
    const newImageRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const [username, setUsername] = useState(currentUser.username);
    const [image, setImage] = useState(currentUser.image);

    const resetMessages = () => {
        setSuccess("");
        setError("");
    };

    async function changeUsername() {
        resetMessages();
        const username = newUsernameRef.current.value.trim();
        if (!username) {
            setError("Username cannot be empty");
            return;
        }
        if (username.length < 4 || username.length > 20) {
            setError("Username must be between 4 and 20 characters");
            return;
        }

        try {
            const response = await http.postToken("/updateprofile", {username});
            console.log(response);

            if (response.success) {
                setUsername(response.user.username);
                setCurrentUser(response.user);
                setSuccess("Username updated successfully");
                newUsernameRef.current.value = "";
            } else {
                setError("Failed to update username");
            }
        } catch (err) {
            // console.log(err);
            setError("Something went wrong while updating username");
        }
    }

    async function changeImage() {
        resetMessages();
        const image = newImageRef.current.value.trim();
        if (!image) {
            alert("Image URL cannot be empty");
            return;
        }
        if (!image.startsWith("http")) {
            alert("Image URL must start with http or https");
            return;
        }
        try {
            const response = await http.postToken("/updateprofile", {image});
            // console.log(response.user.image);
            if (response.success) {
                setImage(response.user.image);
                setSuccess("Image updated successfully");
                newImageRef.current.value = "";
            } else {
                setError("Failed to update image");
            }
        } catch (err) {
            console.log(err);
            setError("Something went wrong while updating image");
        }
    }

    async function changePassword() {
        resetMessages();
        const password = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (!password || !confirmPassword) {
            alert("Both password fields are required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await http.postToken("/updateprofile", {password, confirmPassword});
            console.log(response);
            setSuccess("Password changed successfully");
            setError("");
            newPasswordRef.current.value = "";
            confirmPasswordRef.current.value = "";
        } catch (err) {
            console.log(err);
            setSuccess("");
            setError("Failed to change password");
        }
    }

    return (
        <div className="container pt-5">
            <h2>Profile page</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            {success && <p className="alert alert-success">{success}</p>}

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