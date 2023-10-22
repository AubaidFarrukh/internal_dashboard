import { FC, ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoadingAuth } from "./loadingAuth";
import {
  loadUser,
  selectIsSignedIn,
  selectLoadingAuth,
} from "../../services/auth";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";

interface ProtectedProps {
  children: ReactNode;
}

export const Protected: FC<ProtectedProps> = ({ children }) => {
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const loadingAuth = useAppSelector(selectLoadingAuth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loadingAuth) {
    return <LoadingAuth />;
  }

  if (!isSignedIn) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
};

export default Protected;
