import React, {useRef} from 'react';
import http from "../plugins/https";
import {useNavigate} from "react-router-dom";
import mainStore from "../store/useStore.js";

const CreatePostPage = () => {
    const {currentUser} = mainStore(state => state);

    const imageRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();

    const navigate = useNavigate();

    async function createPost() {
        const postData = {
            image: imageRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            user: currentUser._id,
        };

        const response = await http.postToken("/createpost", postData);

        if (response.success) {
            navigate("/allposts");
        }

        console.log(response);
    }

    return (
        <div className="container pt-5">
            <h2>Create Post</h2>
            <div className="d-flex gap-3">

                <div className="flex-grow-1">

                    <div className="mb-3">
                        <label>Title:</label>
                        <input type="text" ref={titleRef} placeholder="Please enter post title" className="d-block w-100 p-1 mt-2"/>
                    </div>

                    <div className="mb-3">
                        <label>Image url: </label>
                        <input type="text" ref={imageRef} placeholder="Please enter image url" className="d-block w-100 p-1 mt-2"/>
                    </div>

                    <div className="mb-3">
                        <label>Post content:</label>
                        <textarea ref={descriptionRef} placeholder="Please enter post content" className="d-block w-100 p-1 mt-2"/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-secondary w-50 border-dark" onClick={createPost}> Write post</button>
                    </div>
                </div>

                <div className="flex-grow-2 m-auto text-center">
                    <img src="/paw.svg" alt="icon" className="w-75"/>
                </div>
            </div>
        </div>
    );
};

export default CreatePostPage;