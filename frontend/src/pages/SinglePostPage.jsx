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
        <div className="container pt-5 mb-5">
            <h3>Single post page</h3>
            <img src={post.image} alt=""/>
            <h2 className="mt-4">{post.title}</h2>
            <p>{post.description}</p>
            <p className="lh-1">Author: <b>{post.user && post.user.username}</b></p>
            <p className="lh-1">Created at: {new Date(post.time).toLocaleString('lt-LT')}</p>
            <p className="lh-1">Likes: <b>{post.likes}</b></p>

            <h4>Comments:</h4>

            {comments && comments.map(comment => (
                <div key={comment._id} className="border p-2 rounded-3 mb-3">
                    <p className="lh-1">{comment.text}</p>
                    <p className="lh-1">Commented by: <b>{comment.commentAuthor?.username || '[deleted]'}</b></p>
                    <p className="lh-1 mb-0">Created at: <em>{new Date(comment.time).toLocaleString('lt-LT')}</em></p>
                </div>
            ))}

            <div className="mb-3">
                <label><b>Comment content:</b></label>
                <textarea ref={commentRef} placeholder="Please entercomment content" className="d-block w-100 p-1 mt-2"/>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary w-25 border-dark" onClick={createComment}> Write comment</button>
            </div>


        </div>
    )
};

export default SinglePostPage;