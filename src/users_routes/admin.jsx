import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../app.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";
import Dashboard from "../Routes/admin/Dashboard";
import NewRoom from "../Routes/admin/NewRoom";
import NewDept from "../Routes/admin/NewDept";
import Exam from "../Routes/admin/Exam";
import NotFound from "../components/404";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="rooms" element={<NewRoom />} />
        <Route path="departments" element={<NewDept />} />
        <Route path="exams" element={<Exam />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
