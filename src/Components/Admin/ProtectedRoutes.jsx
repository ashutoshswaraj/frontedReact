import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshtoken";
const ProtectedRoutes = ({ element, path }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const refresh = useRefreshToken();

  useEffect(() => {
    // Check if access token exists
    if (!auth.accessToken) {
      // Navigate to the login page if the access token is missing
      // navigate("/login");
      let isMounted = true;
      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      !auth?.auth?.accessToken ? verifyRefreshToken() : setIsLoading(true);
      return () => (isMounted = false);
      //   // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [auth.accessToken, navigate]);

  // useEffect(() => {
  //   let isMounted = true;
  //   const verifyRefreshToken = async () => {
  //     try {
  //       await refresh();
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   !auth?.auth?.accessToken
  //     ? verifyRefreshToken()
  //     : setIsLoading(false);
  //   return () => (isMounted = false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return <>{isLoading ? <>loading........</> : <Outlet />}</>;
  // return (
  //   <>
  //     <Outlet />
  //   </>
  // );
};

export default ProtectedRoutes;
