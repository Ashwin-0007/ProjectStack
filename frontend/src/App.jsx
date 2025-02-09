import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/signup";
import ProjectList from "./component/dashBoard";
import CreateProject from "./component/createProject";
import NavbarComponent from "./component/Navbar";
import ProjectDetails from "./component/projectDetail";
import { useState } from "react";

function App() {
  const [searchBar, setSearchBar] = useState("");
  return (
    <Router>
      <div className="relative w-full">
        <div className="fixed top-0 left-0 w-full z-10">
          <NavbarComponent setSearchBar={setSearchBar} />
        </div>
        <div className="pt-30">
          <Routes>
            <Route path="/" element={<ProjectList searchBar={searchBar} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
