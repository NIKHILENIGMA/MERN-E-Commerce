import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Navigation, Profile, Register } from "./pages";




// Import Private Route
import { PrivateRoute } from "./components";

function AllRoutes() {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<Navigation />} />

          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}/>

          </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </React.Suspense>
  );
}

export default AllRoutes;
