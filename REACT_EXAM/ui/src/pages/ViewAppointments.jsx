import React, { useState } from "react";
import AppointmentsGrid from "../components/AppointmentsGrid";
import Navbar from "../components/Navbar";

const ViewAppointments = () => {

  return (
    <>
      <Navbar/>
      <div className="flex flex-col min-h-screen px-4 py-10">
          <h1 className="text-3xl font-bold text-center text-lime-700 mb-4 md:mb-0">
            Appointments
          </h1>

        <AppointmentsGrid />
      </div>
    </>
    
  );
};

export default ViewAppointments;
