import { useState, useEffect, useCallback } from "react";
import styles from "./verify.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../../../store/notification/notification";
import apiRequest from "../../../../helpers/connections";
const Verify = () => {
  const [verification, setVerification] = useState(false);
  const [resend, setResend] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();

  const handleResend = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      dispatch(notificationActions.setNotify(true));

      await apiRequest("auth/merchant/resend", { email: form.get("email") }, "POST");
      dispatch(
        notificationActions.setMessage(
          "A new verification link has been sent to you"
        )
      );
      
      navigate("/auth/merchant/login");
    } catch (error) {
      if (error?.info?.error?.status === 422) {
        dispatch(notificationActions.setMessage(error?.info?.error?.message));
      } else {
        dispatch(notificationActions.setMessage("Something went wrong"));
      }
      setResend(true);
    }
  };

  const handleVerification = useCallback(async () => {
    try {
      dispatch(notificationActions.setNotify(true));

      await apiRequest("auth/merchant/verify", { token: params.token }, "POST");
      dispatch(notificationActions.setMessage("Verification Successful"));
      setVerification(true);
    } catch (error) {
      if (error?.info?.error?.status === 422) {
        dispatch(notificationActions.setMessage(error?.info?.error?.message));
      } else {
        dispatch(notificationActions.setMessage("Something went wrong"));
      }
      setResend(true);
    }
  }, [dispatch, params.token]);

  useEffect(() => {
    if (!verification) {
      handleVerification();
    }
    if (verification) {
      const timeout = setTimeout(() => {
        navigate("/auth/merchant/login");
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [navigate, verification, handleVerification]);
  const { dark } = useSelector(
    (state) => state.mode
);
  return (
    <div className={`${styles.verify} ${dark ? styles.dark : ""}`}>
      <h3>Account Verification</h3>
      <p>
        Your account verification {verification ? "is" : resend ? "" : "was"}
      </p>

      {verification ? (
        <h2>Successful ! ! !</h2>
      ) : resend ? (
        <h5>Failed ! ! !</h5>
      ) : (
        <h4>Pending ! ! !</h4>
      )}

      {resend && (
        <form className={styles.form} onSubmit={handleResend}>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="189652@gmail.com"
              required
            />
          </label>

          <button>Resend Verification</button>
        </form>
      )}
    </div>
  );
};

export default Verify;
