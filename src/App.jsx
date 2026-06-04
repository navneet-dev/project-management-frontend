import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
// import Projects from "./pages/Projects.jsx";
// import Tasks from "./pages/Tasks.jsx";

function App() {
    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
