import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Admin_nav from "../components/admin/Admin_nav";
import Admin_dashboard from "../components/admin/Admin_dashboard";
import Managestaff from "../components/admin/Manage_staff";
import Listall_staff from "../components/admin/Listall_staff";
import Manage_interns from "../components/admin/Manage_interns";

const Approute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/:url" element={<Admin_nav/>}/>
          <Route path="/dashboard" element={<Admin_dashboard/>}/>
          <Route path="/addstaff" element={<Managestaff />} />
          <Route path="/managestaff" element={<Listall_staff />} />
          <Route path="/manageintern" element={<Manage_interns/>}/>
           
        </Routes>
      </Router>
      
      </>
  );
};

export default Approute;
