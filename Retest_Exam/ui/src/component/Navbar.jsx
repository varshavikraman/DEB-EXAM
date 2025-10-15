import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";


const Navbar = () => {
  return (
     <nav className="flex items-center justify-between px-4 py-3 bg-cyan-100 text-cyan-950 shadow">

      <div className="flex items-center gap-4">
        <NavLink to="/" className="hover:underline">Home</NavLink>
        <NavLink to="/studentForm" className="hover:underline">Add Student</NavLink>
        <NavLink to="/signup" className="hover:underline">Signup</NavLink>
        <NavLink to="/login" className="hover:underline">Login</NavLink>
        <NavLink to="" className="hover:underline"></NavLink>
        <button
        >
            Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar