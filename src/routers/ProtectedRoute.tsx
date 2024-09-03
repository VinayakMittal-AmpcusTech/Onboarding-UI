import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  children: any;
}
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  console.log('user: ', user);

  if (!user.userDetails) {
    // user is not authenticated
    return <Navigate to="/sign-in" />;
  }

  return children;
};
