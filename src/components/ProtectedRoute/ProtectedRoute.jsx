import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default ProtectedRoute;
