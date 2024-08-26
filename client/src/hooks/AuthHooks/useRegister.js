import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "@/redux/api/usersApiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "@/redux/features/auth/authSlice";

const useRegister = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
    };
    console.log("credentials: ",userCredentials);
    
    try {
      const res = await register(userCredentials).unwrap();
      console.log(res);
      dispatch(loginUser({ ...res }));
      navigate(redirect);
      toast.success(userInfo.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return { formData, setFormData, isLoading, handleChange, handleFormSubmit };
};

export { useRegister };