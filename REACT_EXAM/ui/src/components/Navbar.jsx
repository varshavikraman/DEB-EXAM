import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-lime-600 h-20 flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6  mt-4 md:mt-0 md:p-5 w-full md:w-auto">
        <Link to="/" className="text-lime-900 text-sm md:text-lg font-medium hover:text-white">View Appointment</Link>
        <Link to="/addDoctor" className="text-lime-900 text-sm md:text-lg font-medium hover:text-white">Add Doctor</Link>
        <Link to="/addPatient" className="text-lime-900 text-sm md:text-lg font-medium hover:text-white">Add Patient</Link>
        <Link to="/addAppointment" className="text-lime-900 text-sm md:text-lg font-medium hover:text-white">Add Appointment</Link>
    </nav>
  )
}

export default Navbar