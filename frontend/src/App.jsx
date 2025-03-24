import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {  Routes } from "react-router-dom";

import mainStore from "./store/main";

function App() {
    const { user } = mainStore(state => state);

    return (
        <div className="container">
            {/*<NavBar />*/}
            <Routes>
                {/*<Route path="/" element={<RegisterLoginPage />} />*/}
                {/*{user && <Route path="/userprofile" element={<ProfilePage />} />}*/}
                {/*{user && <Route path="/allusers" element={<AllUsersPage />} />}*/}
                {/*{user && <Route path="/user/:username" element={<SingleUserPage />} />}*/}
                {/*{user && <Route path="/createpost" element={<CreatePostPage />} />}*/}
                {/*{user && <Route path="/allposts" element={<AllPostsPage />} />}*/}
                {/*{user && <Route path="/userpost/:id" element={<SinglePostPage />} />}*/}
                {/*<Route path="/*" element={<RegisterLoginPage />} />*/}
            </Routes>
        </div>
    );
}

export default App;
