// //styles
// import "./login.css";
// import "../../Designs/main.css";

// //assets
// import LOGO from "../../assets/logos/plus_logo_color.png";
// import SellerImg from "../../assets/sell.jpg";

// //material
// import {
//   TextField,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   CircularProgress,
//   Button,
// } from "@material-ui/core";

// //api
// import FormsApi from "../../api/api";

// //dependences
// import { useState } from "react";
// import { Base64 } from "js-base64";
// import { Link } from "react-router-dom";

// function Login() {
//   const [rememberMe, setRememberMe] = useState(true);
//   const [apiFeedBackError, setApiFeedBackError] = useState(false);
//   const [submit, setSubmit] = useState(false);
//   const [networkError, setNetworkError] = useState(false);

//   const form_submit = async (e) => {
//     e.preventDefault();
//     setSubmit(true);
//     const fd = new FormData(e.target);
//     let _fcontent = {};
//     fd.forEach((value, key) => {
//       _fcontent[key] = value;
//     });
//     let api = new FormsApi();
//     let res = await api.post("/seller/login", _fcontent);
//     if (res === "Error") {
//       setApiFeedBackError(true);
//       setSubmit(false);
//       return;
//     }
//     if (res.status === false) {
//       console.log("its false");
//       console.log(res.data);
//       setApiFeedBackError(true);
//       setSubmit(false);
//     } else {
//       if (_fcontent.rem_me === "true") {
//         const data = Base64.encode(
//           JSON.stringify({ ...res.user, role: res.role })
//         );
//         localStorage.setItem("token", data);
//         setSubmit(false);
//         window.location.reload();
//       } else {
//         const data = Base64.encode(
//           JSON.stringify({ ...res.user, role: res.role })
//         );
//         sessionStorage.setItem("token", data);
//         setSubmit(false);
//         window.location.reload();
//       }
//     }
//   };
//   return (
//     <div className="login_ctr">
//       <div>
//         <img src={SellerImg} alt="Sell on plus" />
//       </div>
//       <div>
//         <div className="form_ctr card">
//           <form onSubmit={form_submit} className="login_form">
//             <div className="login-logo-ctr">
//               <img src={LOGO} alt="PLUSONLINE" />
//             </div>
//             <div className="login-inputs-ctr">
//               <TextField
//                 error={apiFeedBackError}
//                 helperText={
//                   apiFeedBackError
//                     ? "Wrong Email or Phone or some network error"
//                     : ""
//                 }
//                 variant="outlined"
//                 label="Email OR Phone"
//                 type="text"
//                 name="id"
//                 fullWidth
//                 style={{ margin: "20px 0px" }}
//               />
//               <TextField
//                 error={apiFeedBackError}
//                 helperText={
//                   apiFeedBackError ? "Wrong Password or some network error" : ""
//                 }
//                 variant="outlined"
//                 label="Password"
//                 type="password"
//                 name="password"
//                 fullWidth
//                 style={{ margin: "20px 0px" }}
//               />
//               <FormGroup>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       color="primary"
//                       name="rem_me"
//                       checked={rememberMe}
//                       onChange={() => {
//                         setRememberMe(!rememberMe);
//                       }}
//                     />
//                   }
//                   label="Remember Me On this Device"
//                 />
//               </FormGroup>
//             </div>

//             <div className="login-btn-ctr">
//               <Button
//                 color="primary"
//                 variant={submit ? "outlined" : "contained"}
//                 type="submit"
//                 style={{ width: "100%" }}
//               >
//                 <CircularProgress
//                   size={15}
//                   thickness={10}
//                   style={{
//                     display: submit ? "inline-block" : "none",
//                     marginRight: "20px",
//                   }}
//                 />
//                 {submit ? "Please Wait..." : "Submit"}
//               </Button>
//             </div>
//             <div>
//               Not Registered?
//               <Link to="/register">
//                 <span
//                   style={{
//                     textDecoration: "underline",
//                     color: "blue",
//                     marginLeft: "5px",
//                   }}
//                 >
//                   Register Here
//                 </span>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

// export function Logout() {
//   const token_stored = sessionStorage.getItem("token");
//   if (token_stored) {
//     sessionStorage.removeItem("token");
//   }
//   window.location.replace("/");
// }
