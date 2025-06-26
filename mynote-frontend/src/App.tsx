import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Button } from "./components/Button";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Notes } from "./pages/Notes";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path = "/signin" element={<Signin/>}/>
      <Route path="/notes" element={<Notes/>}/>
    </Routes></BrowserRouter>

  )
}

export default App
