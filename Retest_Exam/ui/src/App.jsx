
import React from 'react'
import StudentForm from './pages/StudentForm'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import UpdateStudent from './pages/UpdateStudent'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "/", element: <Home /> },
      { path: "studentForm", element: <StudentForm /> },
      { path: "updateStudent", element: <UpdateStudent /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App