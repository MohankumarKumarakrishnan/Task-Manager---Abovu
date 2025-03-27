import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      
        <Link to="/" className="text-white text-xl font-bold">
          Task Manager
        </Link>

      
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
          <Link to="/signup" className="text-white hover:text-gray-200">Signup</Link>
        </div>

        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-blue-700 mt-2 p-2 rounded-md">
          <Link to="/" className="block text-white py-1" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/login" className="block text-white py-1" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/signup" className="block text-white py-1" onClick={() => setMenuOpen(false)}>Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
