// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const ProtectedRoute = ({ element }) => {
  return auth.currentUser ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
