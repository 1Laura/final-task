import {create} from "zustand";


const toggleFavorite = (favorites, postId) => {
    const isFavorite = favorites.includes(postId);
    return isFavorite
        ? favorites.filter(id => id !== postId)
        : [...favorites, postId];
};

const mainStore = create((set) => ({
        currentUser: JSON.parse(localStorage.getItem("user")) || null,
        favorites: [],
        userInfo: null,
        setFavorites: (favoritesArray) => set({favorites: favoritesArray}),


        setCurrentUser: (newUser) => {
            localStorage.setItem("user", JSON.stringify(newUser));
            set({
                currentUser: newUser,
                favorites: newUser.favorites || []
            });
        },

        setUserInfo: (newUserInfo) => set({userInfo: newUserInfo}),

        logout: () => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            set({currentUser: null, favorites: []});
        },

        toggleFavoriteLocally: (postId) => set((state) => ({
            favorites: toggleFavorite(state.favorites, postId)
        }))
    }))
;

export default mainStore;