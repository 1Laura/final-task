import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterLoginPage from "./pages/RegisterLoginPage.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
         <Routes>
             <Route path="/" element={<RegisterLoginPage/>}></Route>
         </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
