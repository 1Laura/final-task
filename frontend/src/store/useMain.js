import {create} from "zustand";

const mainStore = create((set) => ({
    currentUser: null,



    setCurrentUser: (newUser) => set({currentUser: newUser}),

}));

export default mainStore;