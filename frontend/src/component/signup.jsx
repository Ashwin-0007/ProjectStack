import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const [userType, setUserType] = useState("1"); // Default to type "1"
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:8000/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userType, firstName, lastName, email, password, confirmPassword }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Signup Successful:", data);
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="flex w-4/5 max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-cover bg-center p-10 flex items-center justify-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
          <h2 className="text-xl font-semibold text-center">Capturing Moments, Creating Memories</h2>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Dropdown */}
            <select
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="1">User Type 1</option>
              <option value="2">User Type 2</option>
            </select>

            {/* Name Fields */}
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Fields */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-md text-white font-semibold transition">Create Account</button>
          </form>

          <p className="mt-4 text-center">
            Already have an account? <span className="text-purple-400 cursor-pointer" onClick={() => navigate("/login")}>Sign in</span>
          </p>

          <div className="flex justify-center mt-4 space-x-4">
            <button className="w-1/2 p-3 bg-gray-700 hover:bg-gray-600 rounded-md">Sign Up with Google</button>
            <button className="w-1/2 p-3 bg-gray-700 hover:bg-gray-600 rounded-md">Sign Up with Apple</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
