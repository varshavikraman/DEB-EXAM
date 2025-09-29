import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UpdateAppointment = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [status, setStatus] = useState("Scheduled");

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`/api/viewAppointment/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setDoctorName(data.appointment.doctor?.doctorName || "");
          setPatientName(data.appointment.patient?.patientName || "");
          setAppointmentDate(
            data.appointment.date
              ? new Date(data.appointment.date).toISOString().split("T")[0]
              : ""
          );
          setAppointmentTime(data.appointment.time || "");
          setStatus(data.appointment.status || "Scheduled");
        } else {
          alert(data.msg || "Failed to fetch appointment");
        }
      } catch (err) {
        console.error("Error fetching appointment:", err);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/updatePatientAppointment/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Appointment updated successfully!");
        navigate("/");
      } else {
        alert(data.msg || "Failed to update appointment");
      }
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-[500px] mx-auto border border-gray-300 p-4 rounded-lg shadow-md mt-20">
        <h2 className="text-2xl text-lime-600 font-semibold mb-4">
          Update Appointment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="font-medium mb-1">Doctor Name</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={doctorName}
              disabled
            />
          </div>
          <div className="my-4">
            <label className="font-medium mb-1">Patient Name</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={patientName}
              disabled
            />
          </div>
          <div className="my-4">
            <label className="font-medium mb-1">Appointment Date</label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={appointmentDate}
              disabled
            />
          </div>
          <div className="my-4">
            <label className="font-medium mb-1">Appointment Time</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={appointmentTime}
              disabled
            />
          </div>
          <div className="my-4">
            <label className="font-medium mb-1">Status</label>
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
            Update Appointment
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateAppointment;
