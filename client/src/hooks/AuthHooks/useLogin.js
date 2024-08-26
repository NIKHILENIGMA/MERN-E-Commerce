import { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useCallLoginMutation } from "@/redux/api/authApiSlice";
import { loginUser } from "@/redux/features/auth/authSlice";
import usePresist from "../usePresist";
import { setUserData } from "@/redux/features/User/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

export const useLogin = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [accessToken, setAccessToken] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [persist, setPersist] = usePresist();

  const dispatch = useDispatch();
  const [callLogin, { isLoading }] = useCallLoginMutation();

  const handlePersist = useCallback(
    () => setPersist((prev) => !prev),
    [setPersist]
  );

  const inputRef = useRef();
  const navigate = useNavigate();

  // User redirect to the last page
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (accessToken) {
      navigate(redirect);
    }
  }, [navigate, redirect, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle password visibility
  const handlePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredientals = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await callLogin(userCredientals).unwrap();
      console.log(response);

      // Lets Destructure the AccessToken, RefreshToken and User details
      const { accessToken, customer } = response.data;

      // Dispatch the accessToken to redux state
      dispatch(loginUser({ accessToken }));
      dispatch(setUserData({ customer }));
      setAccessToken(accessToken);
      setFormData(initialState);

      toast.success("User Login successfully");
    } catch (error) {
      console.warn(error);

      toast.error(error?.data?.message || error.message);
    }
  };

  return {
    handleChange,
    handlePasswordVisibility,
    formData,
    isLoading,
    passwordVisible,
    handleSubmit,
    inputRef,
    redirect,
    handlePersist,
    persist,
  };
};
