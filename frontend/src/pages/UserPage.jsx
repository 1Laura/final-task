import React, {useEffect, useState} from 'react';
import mainStore from "../store/useStore.js";
import http from "../plugins/https.js";
import {useParams} from "react-router-dom";

const UserPage = () => {
    const {username} = useParams();

    const {currentUser} = mainStore(state => state);
    const [userPosts, setUserPosts] = useState([]);

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

    return (
        <div className="container pt-5">
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