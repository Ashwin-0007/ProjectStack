import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavbarComponent({setSearchBar}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user_token");
    navigate("/login");
  };

  const isAuthenticated = localStorage.getItem("user_token");

  return (
    <nav className="bg-gradient-to-r from-blue-200 to-purple-200 p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold hover:scale-105 transition-transform duration-300"
        >
          <strong className="text-green-700 font-serif hover:text-green-800 transition-colors duration-300">
            Project
          </strong>
          <strong className="text-amber-700 font-serif hover:text-amber-800 transition-colors duration-300">
            Stack
          </strong>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden px-2 py-1 text-gray-800 hover:text-gray-600 focus:outline-none"
        >
          <span className="material-icons text-3xl">menu</span>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6 mt-4 lg:mt-0`}
        >
          {isAuthenticated ? (
            <>
              <a
                href="/create-project"
                className="block lg:inline-block hover:text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Add Project
              </a>
              <div
                className="block lg:inline-block text-[#646CFF] font-medium hover:text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors duration-300"
                onClick={(e) => handleLogout(e)}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="block lg:inline-block text-gray-800 hover:text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Login
              </a>
              <a
                href="/signup"
                className="block lg:inline-block text-gray-800 hover:text-green-700 hover:bg-green-100 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Signup
              </a>
            </>
          )}
        </div>

        {/* Search Bar */}
        <form className="hidden lg:flex items-center">
          <div className="flex border-2 border-green-500 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setSearchBar(e.target.value)}
              className="px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-l-lg"
            />
            <button
              type="button"
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default NavbarComponent;