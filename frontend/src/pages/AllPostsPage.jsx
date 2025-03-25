import React, {useEffect, useState} from 'react';
import http from "../plugins/https.js";
import SinglePost from "../components/SinglePost.jsx";

const AllPostsPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        http.getToken("/allposts")
            .then(response => {
                setPosts(response.posts)
                console.log(response);
            })
    }, []);

    return (
        <div className="container pt-5">
            <h3>All posts page</h3>
            <div className="d-flex flex-wrap gap-4">
                {posts.map(post => (
                    <SinglePost key={post._id} postInfo={post}/>
                ))}
            </div>
        </div>
    );
};

export default AllPostsPage;