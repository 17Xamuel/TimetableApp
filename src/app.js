import React, { Component } from "react";
import user from "./app_config";
import Teacher from "./users_routes/teacher";
import Admin from "./users_routes/admin";
import Login from "./components/Login";

export default () => {
  if (user.role === "admin") {
    return <Admin />;
  } else if (user.role === "teacher") {
    return <Teacher />;
  } else {
    return <Login />;
  }
};

// //styling
// import "./app.css";
// import "line-awesome/dist/line-awesome/css/line-awesome.css";

// //react
// import React from "react";

// //react router
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Components
// import user from "./app.config";
// import Login from "./Components/login/login";
// import Register from "./Components/Register/register";
// import Admin from "./admin/index";
// import Seller from "./Seller/index";
// import NotFound from "./Components/NotFound/404";

// export default () =>
//   user.role === "admin" ? (
//     <Admin />
//   ) : user.role === "seller" ? (
//     <Seller />
//   ) : (
//     <StartStack />
//   );

// const StartStack = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };
