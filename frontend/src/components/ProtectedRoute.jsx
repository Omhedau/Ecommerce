import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, condition, redirectTo = "/", ...rest }) => {
  return condition ? <Component {...rest} /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
