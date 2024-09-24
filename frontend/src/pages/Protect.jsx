import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protect = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [token]);
  return children;
};

export default Protect;
