import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import JobList from "./pages/JobList";
import PostJob from "./pages/PostJob";
import JobDetails from "./pages/JobDetails";
function App() {
  return (
    <div className="container py-4">
      {/* 🧭 Basic Navbar */}
      <nav className="mb-4 border-bottom pb-2 d-flex align-items-center">
        <h4 className="me-auto text-primary mb-0">JobBoard</h4>
        <div>
          <a href="/" className="me-3 text-decoration-none">
            Home
          </a>
          <a href="/jobs" className="me-3 text-decoration-none">
            Jobs
          </a>
          <a href="/login" className="me-3 text-decoration-none">
            Login
          </a>
          <a href="/register" className="text-decoration-none">
            Register
          </a>
          <a href="/post-job" className="me-3 text-decoration-none">
            {" "}
            Post Job
          </a>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-job" element={<PostJob />} />

        <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
    </div>
  );
}

export default App;
