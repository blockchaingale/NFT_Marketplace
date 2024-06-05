import {  useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../../helpers/connection";
import { authSliceActions } from "../../../store/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../../store/notification/notification";

export const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.loggedIn);

  const handleLogout = useCallback(async () => {
    try {
      if (auth.state) {
        dispatch(notificationActions.setNotify(true));

        await apiRequest("auth/logout", {}, "get", auth);
        dispatch(notificationActions.setMessage("Logout Successful"));
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth, dispatch]);

  useEffect(() => {
    handleLogout();

    const timeout = setTimeout(() => {
      dispatch(
        authSliceActions.setLoggedIn({ state: false, token: "", user: {} })
      );
      navigate("/");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate, dispatch, handleLogout]);

  return null;
};
