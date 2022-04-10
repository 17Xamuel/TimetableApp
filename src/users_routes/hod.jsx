import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../app.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";
import Dashboard from "../Routes/hod/Dashboard";
import NewTeacher from "../Routes/hod/NewTeacher";
import NewCourseUnit from "../Routes/hod/NewCourseUnit";
import NewClass from "../Routes/hod/NewClass";
import NotFound from "../components/404";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="teachers" element={<NewTeacher />} />
        <Route path="course-units" element={<NewCourseUnit />} />
        <Route path="classes" element={<NewClass />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
