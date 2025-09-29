import React, { useState, useEffect } from 'react';
import AppointmentCard from './AppointmentCard';

const AppointmentsGrid = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch("/api/viewAllAppointment", {
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error('Failed to fetch Appointments');
        }

        const data = await res.json();
        setAppointments(data.appointments || []); 
      } catch (error) {
        console.log("Error fetching Appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, []);

  return (
    <div>
        {loading ? (
            <h1 className="text-center py-8">Loading Appointments...</h1>
            ) : appointments.length === 0 ? (
            <div className="text-center py-8">
            <h1 className="text-lg font-medium mb-2">
                No Appointments found
            </h1>
            </div>
            ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4">
            {appointments.map((appointment) => (
                <AppointmentCard
                key={appointment._id}
                appointmentData={appointment}
                />
            ))}
            </div>
        )}
    </div>
  );
};

export default AppointmentsGrid;
