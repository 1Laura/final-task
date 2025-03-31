import React, {useEffect, useState} from 'react';
import http from "../plugins/https.js";
import SinglePost from "../components/SinglePost.jsx";

const AllPostsPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await http.getToken("/allposts")
            console.log(response.posts);
            setPosts(response.posts)
        };
        fetchPosts();
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