import React, {useEffect, useState} from 'react';
import SinglePost from "../components/SinglePost.jsx";
import http from "../plugins/https";
import mainStore from "../store/useStore";

const FavoritesPage = () => {
    const {favorites} = mainStore(state => state);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchFavoritePosts = async () => {
            if (favorites.length === 0) {
                setPosts([]);
                return;
            }
            const response = await http.postToken('/getfavoriteposts', {favorites});
            setPosts(response.favoritePosts);
        };

        fetchFavoritePosts();
    }, [favorites]);

    return (
        <div className="container pt-5">
            <h3>Favorites page</h3>
            {posts.length === 0 ? (
                <p>No favorites yet!</p>
            ) : (
                <div className="d-flex flex-wrap gap-4">
                    {posts.map(post => (
                        <SinglePost key={post._id} postInfo={post}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;