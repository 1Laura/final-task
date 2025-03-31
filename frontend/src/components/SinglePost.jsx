import React, {useEffect, useState} from 'react';
import {FaHeart, FaRegHeart} from "react-icons/fa";
import mainStore from "../store/useStore.js";
import http from "../plugins/https.js";
import {Link, useNavigate} from "react-router-dom";
import {BiMessageDetail} from "react-icons/bi";

const SinglePost = ({postInfo}) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(postInfo.likes || 0);
    const navigate = useNavigate();
    const {currentUser, favorites, toggleFavoriteLocally} = mainStore(state => state);

    const isAuthor = currentUser?._id === postInfo.user._id;

    useEffect(() => {
        if (currentUser) {
            setLiked(favorites.includes(postInfo._id));
        }
    }, [favorites, postInfo._id, currentUser]);

    const toggleLike = async () => {
        if (isAuthor) return;

        toggleFavoriteLocally(postInfo._id);

        const response = await http.postToken("/togglefavorite", {postId: postInfo._id});

        setLiked(prevLiked => !prevLiked);
        if (response && response.likes !== undefined) {
            setLikeCount(response.likes);
        }
    };

    const readMore = () => {
        navigate(`/post/${postInfo._id}`);
        // window.location.href = `/post/${postInfo._id}`;
    }

    return (
        <div className="border w-25 rounded-3 position-relative">
            <img src={postInfo.image} className="w-100 rounded-3 " alt="Post"/>

            <div className="d-flex justify-content-end pe-2 position-absolute top-0">
                <button
                    className="btn bg-secondary-subtle btn-outline-danger border-dark d-flex align-items-center gap-2 m-1"
                    onClick={toggleLike}
                    disabled={isAuthor} // jei autoriaus – negalima spausti
                >
                    {liked ? <FaHeart/> : <FaRegHeart/>}
                    <span>{likeCount}</span>
                </button>
            </div>


            <div className="p-3">
                <h4>{postInfo.title}</h4>
                <p>Post author: <b>
                    {postInfo.user
                        ? <Link to={`/user/${postInfo.user.username}`}>{postInfo.user.username}</Link>
                        : <span className="text-muted">[deleted user]</span>
                    }
                </b></p>
                <p>Created at: <b>{new Date(postInfo.time).toLocaleString("lt-LT")}</b></p>
                <p>Comments: <b>{postInfo.comments?.length || 0}</b></p>
                <p className="d-flex align-items-center gap-1">
                    <BiMessageDetail/> <b>{postInfo.comments?.length || 0}</b>
                </p>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-secondary w-75 border-dark" onClick={readMore}>Read more</button>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;