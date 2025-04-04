import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterLoginPage from "./pages/RegisterLoginPage.jsx";
import NavBar from "./components/NavBar.jsx";
import AllPostsPage from "./pages/AllPostsPage.jsx";
import mainStore from "./store/useStore.js";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import UserPage from "./pages/UserPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import SinglePostPage from "./pages/SinglePostPage.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";

function App() {
    const {currentUser} = mainStore(state => state);

    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<RegisterLoginPage/>}></Route>

                    {currentUser && <Route path="/createpost" element={<CreatePostPage/>}></Route>}
                    {currentUser && <Route path="/allposts" element={<AllPostsPage/>}></Route>}
                    {currentUser && <Route path="/favorites" element={<FavoritesPage/>}></Route>}
                    {currentUser && <Route path="/profile" element={<ProfilePage/>}></Route>}
                    {currentUser && <Route path="/user/:username" element={<UserPage/>}></Route>}
                    {currentUser && <Route path="/post/:postId" element={<SinglePostPage/>}></Route>}

                    {currentUser && <Route path="/messages" element={<MessagesPage/>}></Route>}

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
