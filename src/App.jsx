import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
// import Welcome from "./components/Welcome.jsx";
import Home from "./pages/Home.jsx";
// import Projects from "./pages/Projects.jsx";
// import Tasks from "./pages/Tasks.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";

function App() {
    return (
        <Router>
            <nav className="flex space-x-4 p-4 bg-gray-800 text-white">
                <Link to="/">Home</Link>

                <Link to="/contact">Contacts</Link>
                <Link to="/about">About</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
