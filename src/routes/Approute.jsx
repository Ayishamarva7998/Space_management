import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Admin_nav from "../components/admin/Admin_nav";

const Approute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/:url" element={<Admin_nav/>}/>
        </Routes>
      </Router>
      </>
  );
};

export default Approute;
