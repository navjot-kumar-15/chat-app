import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Home/> ,
    },
    {
      path: "/login",
      element:<Login/> ,
    },
    {
      path:"/signup",
      element:<Signup/>
    }
  ]);
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
