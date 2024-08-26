import { Link } from "react-router-dom";
import { InputField, Loader } from "../../../components";
import { useRegister } from "@/hooks/AuthHooks/useRegister.js";
import { registerInitialValues } from "@/constants/initialValues";
import { Button } from "@/components/ui/button";

/**
 * @description Register component is a functional component that renders a form for user registration.
 */

function Register() {
  const { formData, redirect, isLoading, handleChange, handleFormSubmit } =
    useRegister(registerInitialValues);

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="w-[85%] h-[90%] bg-white flex items-center justify-center">
        <div className="section-right w-[40%] border-2 border-slate-300 shadow-lg border-opacity-70 h-full">
          <div className="w-full h-[20%] flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold uppercase bg-white p -5 text-semibold text-pretty text-violet-600">
              Register User
            </h2>
          </div>
          <div className="relative w-full h-[80%]">
            <form
              onSubmit={handleFormSubmit}
              className="container w-full p-2 h-[80%]"
            >
              <div className="h-full pl-6">
                <div className="gap-2 lg:flex">
                  <InputField
                    label="First Name"
                    name="firstName"
                    type="text"
                    id="firstName"
                    className="px-3 py-2 border-slate-200 border-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-[90%] lg:w-full my-2 hover:shadow-md"
                    placeholder="Full name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    id="lastName"
                    className="px-3 py-2 border-slate-200 border-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-[90%] lg:w-full my-2 hover:shadow-md"
                    placeholder="Full name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <InputField
                  type="text"
                  label="Username"
                  name="username"
                  id="username"
                  className="px-3 py-2 border-slate-200 border-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-[90%] my-2 hover:shadow-md"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />

                <InputField
                  type="email"
                  name="email"
                  label="Email"
                  id="email"
                  className="px-3 py-2 border-slate-200 border-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-[90%] my-2 hover:shadow-md"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <InputField
                  type="password"
                  name="password"
                  label="Password"
                  id="password"
                  className="px-3 py-2 border-slate-200 border-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-[90%] my-2 hover:shadow-md"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className={`${isLoading ? "cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
              {isLoading && <Loader />}
              <div className="mt-2 ml-5">
                <p className="text-sm font-medium text-black">
                  Already have an account?{" "}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    className="text-sm font-medium text-violet-500 hover:underline text-wrap "
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
