import { useLocation, Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();

  const isTokenValid = () => {
    const token = localStorage.getItem("user");
    if (token) return true;
    else return false;
  };

  return isTokenValid() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
