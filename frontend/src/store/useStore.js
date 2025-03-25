import {create} from "zustand";

const mainStore = create((set) => ({
    currentUser: null,
    favorites: [],


    setCurrentUser: (newUser) => set({currentUser: newUser, favorites: newUser.favorites || []}),

    logout: () => set({currentUser: null, favorites: []}),
    toggleFavoriteLocally: (postId) =>
        set((state) => {
            const isFav = state.favorites.includes(postId);
            return {
                favorites: isFav
                    ? state.favorites.filter(id => id !== postId)
                    : [...state.favorites, postId]
            };
        })
}));

export default mainStore;