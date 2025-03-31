import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import http from "../plugins/https.js";

const SinglePostPage = () => {
    const {postId} = useParams();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const commentRef = useRef();

    useEffect(() => {
        const fetchPostAndComments = async () => {
            const response = await http.getToken(`/post/${postId}`);
            console.log(response);
            setPost(response.singlePost);
            setComments(response.comments);
        };
        fetchPostAndComments();
    }, [postId]);


    async function createComment() {
        const commentText = commentRef.current.value.trim();
        if (!commentText) return;

        const commentData = {
            postId,
            commentText
        }

        const response = await http.postToken('/createcomment', commentData);
        console.log(response);
        if (response.success) {
            commentRef.current.value = "";
            // reload comments
            const postResponse = await http.getToken(`/post/${postId}`);
            setComments(postResponse.comments);
        }
    }

    return (
        <div className="container pt-5">
            <h3>Single post page</h3>
            <img src={post.image} alt=""/>
            <h5>{post.title}</h5>
            <p>{post.description}</p>
            <p>Author: {post.user && post.user.username}</p>
            <p>Created at: {new Date(post.time).toLocaleString('lt-LT')}</p>
            <p>Likes: {post.likes}</p>

            <h4>Comments:</h4>
            <div className="">
                {comments && comments.map(comment => (
                    <div key={comment._id} className="border p-3 m-2 rounded-3">
                        <p>{comment.text}</p>
                        <p>Commented by: {comment.commentAuthor?.username || '[deleted]'}</p>

                        <p>Created at: {new Date(comment.time).toLocaleString('lt-LT')}</p>
                    </div>
                ))}
            </div>

            <div className="p-5">
                <input type="text" ref={commentRef}/>
                <button onClick={createComment}>Create comment</button>
            </div>

        </div>
    )
};

export default SinglePostPage;