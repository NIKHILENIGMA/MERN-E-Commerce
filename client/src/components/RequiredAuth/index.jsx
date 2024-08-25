// Import packages
import { useLocation, Outlet, Navigate } from "react-router-dom";

// import hook
import useAuth from "../../hooks/useAuth";

const RequiredAuth = () => {
  const location = useLocation();
  const { decodedToken } = useAuth();
  const { _id: userId, username } = decodedToken || {};

  return (
    <>
      {userId && username ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequiredAuth;
