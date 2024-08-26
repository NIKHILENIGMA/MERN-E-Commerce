// Import Packages
import { Link } from "react-router-dom";

// Import Components
import { InputField, Loader } from "@/components";
import { FaEye, FaEyeSlash } from "@/utils/Icons/icons.js";

// Import Hooks
import { useLogin } from "@/hooks/AuthHooks/useLogin";

// Import constants
import { userInitialValues } from "@/constants/initialValues";

function Login() {
  const {
    formData,
    persist,
    inputRef,
    redirect,
    passwordVisible,
    isLoading,
    handlePasswordVisibility,
    handleChange,
    handlePersist,
    handleSubmit,
  } = useLogin(userInitialValues);

  return (
    <section className="flex items-center justify-center w-full min-h-screen">
      <div className="w-[85%] h-[90%] bg-white flex items-center justify-center">
        <div className="w-full h-full border-2 shadow-lg md section-right border-slate-300 border-opacity-70 sm:w-[70vw] md:w-[50vw] lg:w-[40vw]">
          <div className="w-full h-[20%] flex flex-col justify-center items-center">
            <h2 className="p-5 text-3xl font-bold uppercase bg-whiteibold text-pretty text-violet-600">
              user Login
            </h2>
          </div>
          <div className="relative w-full h-[80%]">
            <form
              onSubmit={handleSubmit}
              className="container w-full p-5 h-[80%]"
            >
              <div className="h-full p-1 pl-7">
                <InputField
                  label="Email"
                  name="email"
                  id="email"
                  ref={inputRef}
                  value={formData.email}
                  placeholder="Email or Username"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  className="px-3 py-2 border-slate-200 border-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-[90%] my-2"
                />

                <div className="relative ">
                  <InputField
                    label="Password"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="px-3 py-2 border-slate-200 border-2 rounded-lg shadow-sm  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-[90%] my-2"
                  />
                  <button
                    type="button"
                    className="absolute text-black right-14 bottom-5"
                    onClick={handlePasswordVisibility}
                  >
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-violet-500 hover:bg-violet-400 hover:-translate-y-0.5  tracking-wider text-white uppercase focus:outline-none focus:ring focus:ring-offset-2 focus:bg-violet-500 focus:ring-opacity-50 transform transition rounded cursor-pointer my-[1rem] font-semibold text-sm sm:text-base shadow-lg "
                >
                  {isLoading ? "Logging In..." : "LogIn"}
                </button>

                <InputField
                  label="remember me"
                  type="checkbox"
                  id="persist"
                  className="bg-indigo-700"
                  onChange={handlePersist}
                  checked={persist}
                />

                {isLoading && <Loader />}
                <div className="mt-4">
                  <p className="text-sm font-medium text-black">
                    New Customer ?{" "}
                    <Link
                      to={
                        redirect
                          ? `/register?redirect=${redirect}`
                          : "/register"
                      }
                      className="text-sm font-medium text-violet-500 hover:underline text-wrap "
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
