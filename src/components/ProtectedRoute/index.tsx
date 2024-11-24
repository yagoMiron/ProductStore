import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isSessionValid } = useContext(UserContext);

  if (isSessionValid()) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
