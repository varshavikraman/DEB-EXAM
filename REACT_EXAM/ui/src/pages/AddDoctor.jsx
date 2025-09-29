import React, { useState } from "react";
import Navbar from "../components/Navbar";

const AddDoctor = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [consultingDays, setConsultingDays] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [noOfSlot, setNoOfSlot] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/addDoctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          DoctorName:doctorName,
          Specialization:specialization,
          ConsultingDays: consultingDays.split(","),
          AppointmentTime:appointmentTime,
          NoOfSlot:noOfSlot
        }),
      });
      const data = await res.json();
      alert(data.msg);
      setDoctorName('')
      setSpecialization('')
      setConsultingDays('')
      setAppointmentTime('')
      setNoOfSlot('')
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <>
      <Navbar/>
      <div className="w-[500px] mx-auto border border-gray-300 p-4 rounded-lg shadow-md mt-20">
        <h2 className="text-2xl text-lime-600 font-semibold mb-4">Add Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="font-medium mb-1">Doctor Name</label>
            <input 
              type="text"
              className="border border-gray-300 p-2 rounded w-full" 
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required 
            />
          </div>
          <div className="my-4">
            <label className=" font-medium mb-1">Specialization</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full" 
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)} 
            />
          </div>
          <div className="my-4">
            <label className=" font-medium mb-1">Consulting Days</label>
            <input 
            type="text"
            placeholder="e.g. Monday,Tuesday, ..."
            className="border border-gray-300 p-2 rounded w-full" 
            value={consultingDays}
            onChange={(e) => setConsultingDays(e.target.value)} 
            />
          </div>
          <div className="my-4">
            <label className=" font-medium mb-1">Appointment Time</label>
            <input 
            type="text"
            placeholder="Formatt: HH:MM"
            className="border border-gray-300 p-2 rounded w-full" 
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)} 
            />
          </div>
          <div className="my-4">
            <label className="font-medium mb-1">Number of Slots</label>
            <input 
              type="number"
              className="border border-gray-300 p-2 rounded w-full" 
              value={noOfSlot}
              onChange={(e) => setNoOfSlot(e.target.value)} 
            />
            </div>
          <button 
            type="submit"
            className="bg-lime-400 hover:bg-lime-500 text-white py-2 px-4 rounded"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </>
    
  )
}

export default AddDoctor