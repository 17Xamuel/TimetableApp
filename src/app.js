//react
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import user from "./app_config";
import Teacher from "./users_routes/teacher";
import Admin from "./users_routes/admin";
import Hod from "./users_routes/hod";
import Login from "./components/Login";
import Home from "./home";

export default () => {
  if (user.role === "admin") {
    return <Admin />;
  } else if (user.role === "hod") {
    return <Hod />;
  } else if (user.role === "teacher") {
    return <Teacher />;
  } else {
    return <HomeStack />;
  }
};

const HomeStack = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
