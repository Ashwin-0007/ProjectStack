import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/component/login";
import Signup from "../src/component/signup";
import ProjectList from "./component/dashBoard";
import CreateProject from "./component/createProject";

function App() {
  return (
    <>
      {/* <ProjectList /> */}
      <Router>
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateProject />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
