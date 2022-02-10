import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../app.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";
import TeacherHome from "../Routes/Teacher/index";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact component={TeacherHome} />
        <Route path="*" component={TeacherHome} />
      </Routes>
    </BrowserRouter>
  );
};
