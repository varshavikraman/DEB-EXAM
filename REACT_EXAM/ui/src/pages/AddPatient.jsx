import React, { useState } from "react";
import Navbar from "../components/Navbar";

const AddPatient = () => {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/addPatient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          PatientName:patientName,
          Age:age,
          Phone:phone
        }),
      });
      const data = await res.json();
      alert(data.msg);
      setPatientName('')
      setAge('')
      setPhone('')
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <>
    <Navbar/>
      <div className="w-[500px] mx-auto flex-1 border border-gray-300 p-4 rounded-lg shadow-md mt-20">
        <h2 className="text-2xl text-lime-600 font-semibold mb-4">Add Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className=" font-medium mb-1">Patient Name</label>
            <input 
              type="text"
              className="border border-gray-300 p-2 rounded w-full" 
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required 
            />
          </div>
          <div className="my-4">
            <label className=" font-medium mb-1">Age</label>
            <input 
              type="number" 
              className="border border-gray-300 p-2 rounded w-full" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required  
            />
          </div>
          <div className="my-4">
            <label className=" font-medium mb-1">Phone No.</label>
            <input 
              type="number"
              className="border border-gray-300 p-2 rounded w-full" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required  
            />
          </div>
          <button 
            type="submit"
            className="bg-lime-400 hover:bg-lime-500 text-white py-2 px-4 rounded"
          >
            Add Patient
          </button>
        </form>
      </div>
    </>
    
  )
}

export default AddPatient