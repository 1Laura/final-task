import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterLoginPage from "./pages/RegisterLoginPage.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {

  return (
    <>
     <BrowserRouter>
         <NavBar/>
         <Routes>
             <Route path="/" element={<RegisterLoginPage/>}></Route>
         </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
