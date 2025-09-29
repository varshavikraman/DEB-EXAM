import React, { useState } from "react";
import Navbar from "../components/Navbar";

const AddAppointment = () => {
    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("/api/appointmentSchedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            DoctorName:doctorName,
            PatientName:patientName,
            AppointmentDate: appointmentDate,
            AppointmentTime:appointmentTime,
            Status:status
        }),
        });
        const data = await res.json();
        alert(data.msg);
        setDoctorName('')
        setPatientName('')
        setAppointmentDate('')
        setAppointmentTime('')
        setStatus('')
    } catch (err) {
        console.error("Error:", err);
    }
    };
  return (
    <>
        <Navbar/>
        <div className="w-[500px] mx-auto border border-gray-300 p-4 rounded-lg shadow-md mt-20">
            <h2 className="text-2xl text-lime-600 font-semibold mb-4">Add Appointment</h2>
            <form onSubmit={handleSubmit}>
            <div className="my-4">
                <label className=" font-medium mb-1">Doctor Name</label>
                <input 
                type="text"
                className="border border-gray-300 p-2 rounded w-full" 
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required 
                />
            </div>
            <div className="my-4">
                <label className=" font-medium mb-1">Patient Name</label>
                <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full" 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)} 
                />
            </div>
            <div className="my-4">
                <label className=" font-medium mb-1">Appointment Date</label>
                <input 
                type="date"
                className="border border-gray-300 p-2 rounded w-full" 
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)} 
                />
            </div>
            <div className="my-4">
                <label className=" font-medium mb-1">Appointment Time</label>
                <input 
                type="text"
                className="border border-gray-300 p-2 rounded w-full" 
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)} 
                />
            </div>
            <div className="my-4">
                <label className=" font-medium mb-1">Status</label>
                <select 
                    className="border border-gray-300 p-2 rounded w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)} 
                    required
                >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            <button 
                type="submit"
                className="bg-lime-400 hover:bg-lime-500 text-white py-2 px-4 rounded"
            >
                Add Appointment
            </button>
            </form>
        </div>
    </>
    
  )
}

export default AddAppointment