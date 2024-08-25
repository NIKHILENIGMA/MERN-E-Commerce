import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen font-serif text-indigo-600 bg-slate-200">
      <p className="text-3xl">
        <strong>404</strong> Page Not Found
      </p>
      <Link to="/" className="font-normal">Go back to Main Page</Link>
    </div>
  );
}
export default ErrorPage;
