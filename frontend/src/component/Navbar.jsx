import { useState } from 'react';

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-200 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-green-700">
          <strong className='text-green-700 font-serif'>Project</strong>
          <strong className='text-amber-700 font-serif'>Stack</strong>
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden px-2 py-1 text-gray-800 hover:text-gray-600"
        >
          <span className="material-icons">menu</span>
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} lg:flex space-x-6`}>
          <a href="/create-project" className="text-gray-800 hover:text-gray-600">Add Project</a>
          <a href="/login" className="text-gray-800 hover:text-gray-600">Login</a>
          <a href="/signup" className="text-gray-400">Signup</a>
        </div>
        <form className="flex items-center">
          <div className="flex border border-green-700 rounded-md">
            <input
              type="search"
              placeholder="Search"
              className="px-3 py-2 w-full rounded-l-md focus:outline-none"
            />
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
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
