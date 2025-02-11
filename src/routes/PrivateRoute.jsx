import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/logout" />;
  }

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/accesInterdit" />;
};

export default PrivateRoute;
