import React from "react";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import ErrorPage from "./error-page";
import { Route, Routes } from "react-router";
import NotFound from "./Pages/NotFound/NotFound";
import Dashboard from "./Pages/Dashboard/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
      <Route path="/signup" element={<SignUp />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
      {/*  user-verification-portal */}
      <Route path="/*" element={<NotFound />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* <PrivateRoute path="/private" element={<Private />} /> */}
    </Routes>
  );
};

export default App;
