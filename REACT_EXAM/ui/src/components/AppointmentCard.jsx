import React from 'react'
import { Link } from 'react-router-dom';

const AppointmentCard = ({ appointmentData }) => {
  const { doctor, patient, date, time, status, _id } = appointmentData;
  
  return (
    <div className="border border-gray-300 p-6 rounded-xl shadow">
      <p className="font-bold text-xl text-lime-700">{patient?.patientName}</p>
      <p className="mt-2 text-sm text-gray-500 font-semibold">Age: {patient?.age}</p>

      <div className="mt-4">
        <p className="text-gray-800 font-semibold">Doctor: {doctor?.doctorName}</p>
        <p className="text-gray-800 font-semibold">Department: {doctor?.specialization}</p>
        <p className="text-gray-800 font-semibold">Appointment Date: {new Date(date).toLocaleDateString()}</p>
        <p className="text-gray-800 font-semibold">Appointment Time: {time}</p>
        <p className="text-gray-800 font-semibold">Status: {status}</p>
      </div>

      {status === "Cancelled" ? " " : 
        <div className="mt-4">
            <Link to={`/update-appointment/${_id}`}>
            <button className="bg-lime-400 hover:bg-lime-500 text-white py-2 px-4 rounded">
                Update
            </button>
            </Link>
        </div>
       }
      
    </div>
  )
}

export default AppointmentCard
