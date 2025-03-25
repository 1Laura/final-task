import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterLoginPage from "./pages/RegisterLoginPage.jsx";
import NavBar from "./components/NavBar.jsx";
import AllPostsPage from "./pages/AllPostsPage.jsx";
import mainStore from "./store/useStore.js";
import CreatePostPage from "./pages/CreatePostPage.jsx";

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


                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
