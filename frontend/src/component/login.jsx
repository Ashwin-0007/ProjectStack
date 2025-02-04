import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    localStorage.setItem("user_token", data.token);
    if (response.ok) {
      console.log("Login Successful:", data);
      navigate("/");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="flex w-4/5 max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div
          className="w-1/2 bg-cover bg-center p-10 flex items-center justify-center"
          style={{ backgroundImage: "url('images/login-signup-bg.png')" }}
        >
          <span>
            <span className="text-3xl font-medium text-slate-400">
              LogIn to{" "}
            </span>
            <div>
              <strong className="text-amber-900 text-4xl">Project Stack</strong>
            </div>
          </span>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-10">SIGN IN</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-md text-white font-semibold transition">
              Continue
            </button>
          </form>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <span
              className="text-purple-400 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
