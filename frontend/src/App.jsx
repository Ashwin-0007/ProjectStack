import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/component/login";
import Signup from "../src/component/signup";
import ProjectList from "./component/dashBoard";
import CreateProject from "./component/createProject";
import NavbarComponent from "./component/Navbar";
import ProjectDetails from "./component/projectDetail";

function App() {
  return (
    <div className="relative w-full">
      <div className="fixed top-0 left-0 w-full z-10">
        <NavbarComponent />
      </div>
      <div className="pt-20">
        <Router>
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-project" element={<CreateProject />} />
            {/* <Route path="/projects/:projectId" element={<ProjectDetails />} /> */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
