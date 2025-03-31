import React, {useEffect, useRef, useState} from 'react';
import mainStore from "../store/useStore.js";
import http from "../plugins/https.js";
import {useParams} from "react-router-dom";

const UserPage = () => {
    const {username} = useParams();

    const {currentUser} = mainStore(state => state);
    const [userPosts, setUserPosts] = useState([]);
    const messageRef = useRef();

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (currentUser) {
                const response = await http.getToken(`/user/${username}/posts`);
                setUserPosts(response.posts);
                console.log(response);
            }
        };
        fetchUserPosts();
    }, []);


    async function sendMessage() {
        const messageText = messageRef.current.value.trim();
        if (!messageText) return;

        const response = await http.postToken("/createmessage", {
            receiverUsername: username,
            text: messageText
        });

        if (response.success) {
            messageRef.current.value = "";
            alert("Message sent!");
        }
    }

    return (
        <div className="container pt-5">
            <div className="mb-4 border-bottom d-flex">
                <div className="flex-grow-1 text-center">
                    <img src={currentUser.image} alt="User" className="rounded-circle"/>
                    <h3>{username}</h3>
                </div>
                <div className="flex-grow-1 align-self-center">
                    <div className="mb-3">
                        <label>Message text:</label>
                        <input type="text" ref={messageRef} placeholder="Enter your message" className="w-100 p-1 mt-2"/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-secondary w-50 border-dark" onClick={sendMessage}>Send message</button>
                    </div>
                </div>
            </div>


            <h3>{username} posts:</h3>
            <div className="d-flex flex-wrap gap-4">
                {userPosts.map(post => (
                    <div className="border w-25 rounded-3">
                        <img src={post.image} className="w-100 rounded-3" alt="Post"/>
                        <h5>{post.title}</h5>
                        <p>{post.description}</p>
                        <p>Post author: <b>{post.user.username}</b></p>
                        <p>Created at: <b>{new Date(post.time).toLocaleString("lt-LT")}</b></p>
                        {/*<div className="d-flex justify-content-center">*/}
                        {/*    <button className="btn btn-secondary w-75 border-dark">Read more</button>*/}
                        {/*</div>*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPage;