import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-700 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Meta Tag Testing Tool
        </Link>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button> 
          ) : (<></>)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;