import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AddPatient from "./pages/AddPatient";
import AddDoctor from "./pages/AddDoctor";
import AddAppointment from "./pages/AddAppointment";
import ViewAppointments from "./pages/ViewAppointments";
import UpdateAppointment from "./pages/UpdateAppointment";

const router = createBrowserRouter([
  { path: "/", element: <ViewAppointments /> },
  { path: "addDoctor", element: <AddDoctor /> },
  { path: "addPatient", element: <AddPatient /> },
  { path: "addAppointment", element: <AddAppointment /> },
  { path: "update-appointment/:id", element: <UpdateAppointment /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
