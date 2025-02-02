import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/component/login";
import Signup from "../src/component/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
