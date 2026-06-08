import {
    BrowserRouter as Router,
    Link,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Projects from "./pages/Projects.jsx";
import AddProject from "./pages/AddProject.jsx";
import EditProject from "./pages/EditProject.jsx";
// import Projects from "./pages/Projects.jsx";
// import Tasks from "./pages/Tasks.jsx";

function Layout() {
    const location = useLocation();

    //show navbar only on login and register page
    const showNavbar = ["/", "/login", "/register"].includes(location.pathname);

    return (
        <>
            {showNavbar && <Navbar />}
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <ProtectedRoute>
                            <Projects />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/project/add"
                    element={
                        <ProtectedRoute>
                            <AddProject />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/project/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditProject />
                        </ProtectedRoute>
                    }
                />
                {/* <Route path="/projects" element={<Projects />} /> */}
                {/* <Route path="/tasks" element={<Tasks />} /> */}
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
