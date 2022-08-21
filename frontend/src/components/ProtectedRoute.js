import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = (props) => {
  return props.loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;