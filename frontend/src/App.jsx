import React, { useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Protect from "./pages/Protect";
import { useDispatch } from "react-redux";
import { getUserChats } from "./features/chat/chatSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protect>
        <Home />{" "}
      </Protect>
    ),
  },
  {
    path: "/login",
    element: (
      <Protect>
        {" "}
        <Login />
      </Protect>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    dispatch(getUserChats());
  }, [token]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
