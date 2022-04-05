import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../app.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";
import Dashboard from "../Routes/admin/Dashboard";
import NewCourseUnit from "../Routes/admin/NewCourseUnit";
import NewRoom from "../Routes/admin/NewRoom";
import NewClass from "../Routes/admin/NewClass";
import NewUser from "../Routes/admin/NewUser";
import Exam from "../Routes/admin/Exam";
import NotFound from "../components/404";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="course-units" element={<NewCourseUnit />} />
        <Route path="rooms" element={<NewRoom />} />
        <Route path="users" element={<NewUser />} />
        <Route path="classes" element={<NewClass />} />
        <Route path="exams" element={<Exam />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
