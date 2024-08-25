import { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRefreshMutation } from "../../redux/api/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import usePresist from "../../hooks/usePresist";

function PersistLogin() {
  const [presist] = usePresist();
  const token = useSelector(selectCurrentToken);
  // console.log("Persistlogin at 11 token", token);
  
  const effectRan = useRef(false);
  const [trueState, setTrueState] = useState(false);

  const [refresh, { isUninitialized, isLoading, isError, isSuccess, error }] =
    useRefreshMutation();


  useEffect(() => {
    if (effectRan.current === true || import.meta.env.MODE !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          const { data } = await refresh();
          console.log("Persist login data: ", data?.data);
          
          setTrueState(true);
        } catch (error) {
          console.log(error);
        }
      };
      if (!token && presist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
  }, []);


  let content;
  if (!presist) {
    console.log('no presist');
    content = <Outlet />;
    
  } else if (isLoading) {
    console.log('loading');
    content = <p>Loading...</p>;
    
  } else if (isError) {
    console.log('error');
    content = (
      <p className='errmsg'>
        {error.data?.message}
        <Link to="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueState) {
    console.log('success');
    content = <Outlet />;
    
  } else if (token && isUninitialized) {
    console.log('token and uninit');
    content = <Outlet />;
  }

  return content;
}

export default PersistLogin;