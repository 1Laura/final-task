import {create} from "zustand";


const toggleFavorite = (favorites, postId) => {
    const isFavorite = favorites.includes(postId);
    return isFavorite
        ? favorites.filter(id => id !== postId)
        : [...favorites, postId];
};

const mainStore = create((set) => ({
    currentUser: null,
    favorites: [],
    userInfo: null,
    setFavorites: (favoritesArray) => set({favorites: favoritesArray}),


    setCurrentUser: (newUser) => set({
        currentUser: newUser,
        favorites: newUser.favorites || []
    }),

    setUserInfo: (newUserInfo) => set({userInfo: newUserInfo}),

    logout: () => set({currentUser: null, favorites: []}),


    toggleFavoriteLocally: (postId) => set((state) => ({
        favorites: toggleFavorite(state.favorites, postId)
    }))
}));

export default mainStore;