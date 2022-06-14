// import React, { useState } from "react";
// import { TextField, Button, CircularProgress } from "@material-ui/core";
// import FormsApi from "../api/api";
// import Logo from "../assets/lirauni.jpg";
// import { Base64 } from "js-base64";
// //design
// import "./login.css";

// function Login() {
//   const [user, setUser] = useState({
//     no: "",
//     pin: "",
//     _cp: true,
//   });
//   const [loaderOpen, setloaderOpen] = useState(false);
//   const [ServerError, setServerError] = useState("");
//   const submit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const form_contents = {};
//     formData.forEach((v, i) => {
//       form_contents[i] = v;
//     });
//     const api = new FormsApi();
//     const res = await api.post("/user/login", form_contents);
//     if (res === "Error") {
//       setServerError(true);
//     } else {
//       console.log(res);
//     }
//   };
//   return (
//     <div
//       style={{ width: "100%", height: "100%", backgroundColor: "white" }}
//       className="m-ctr"
//     >
//       <form className="ctr" onSubmit={submit}>
//         <img
//           alt="Logo"
//           src={Logo}
//           height="120px"
//           width="270px"
//           style={{ objectFit: "contain" }}
//         />
//         <div
//           className="header"
//           style={{
//             margin: "15px 0px",
//           }}
//         >
//           Access Timetable
//         </div>
//         <div className="loginCtr">
//           <TextField
//             name=""
//             variant="standard"
//             label="Department Number"
//             helperText={!user._cp ? "Incorrect Department" : ""}
//             error={!user._cp}
//             fullWidth
//             required
//             style={{
//               width: "250px",
//               display: "block",
//               margin: "15px 0px",
//             }}
//           />
//           <TextField
//             type="number"
//             name="pin"
//             variant="standard"
//             helperText={!user._cp ? "Incorrect Pin" : ""}
//             label="Pin"
//             required
//             error={!user._cp}
//             fullWidth
//             style={{
//               display: "block",
//               margin: "30px 0px",
//             }}
//           />
//         </div>
//         <div className="submitCtr">
//           <Button
//             type="submit"
//             fullWidth
//             variant="outlined"
//             color="primary"
//             style={{ marginRight: 10 }}
//           >
//             Go
//             <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
//               <i className="las la-sign-in-alt"></i>
//             </span>
//           </Button>
//         </div>
//         {/* for loader */}
//         <div
//           className="loader"
//           style={loaderOpen ? { display: "flex" } : { display: "none" }}
//         >
//           <CircularProgress size={25} />
//           <div>{ServerError}</div>
//         </div>
//         {/* for loader */}
//       </form>
//     </div>
//   );
// }

// export default Login;

// export function Logout() {
//   sessionStorage.removeItem("token");
//   window.location.replace("/");
// }

//styles
import "./login.css";
// import "../../Designs/main.css";

//assets
import LOGO from "../assets/lirauni.jpg";
import ImgHome from "../assets/home_img.jpeg";

//material
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Button,
} from "@material-ui/core";

//api
import FormsApi from "../api/api";

//dependences
import { useState } from "react";
import { Base64 } from "js-base64";
import { Link } from "react-router-dom";

function Login() {
  const [state, setState] = useState({
    apiFeedBackError: false,
    networkError: false,
    submit: false,
  });

  const form_submit = async (e) => {
    e.preventDefault();
    setState({ ...state, submit: true });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    let api = new FormsApi();
    let res = await api.post("/users/admin/login", _fcontent);
    if (res === "Error") {
      setState({ ...state, apiFeedBackError: true, submit: false });
      return;
    }
    if (res.status === false) {
      setState({ ...state, apiFeedBackError: true, submit: false });
    } else {
      const data = Base64.encode(
        JSON.stringify({
          ...res.dept,
          role: res.dept.dept_name == "Admin" ? "Admin" : "HOD",
        })
      );
      sessionStorage.setItem("token", data);
      setState({ ...state, submit: false });
      window.location.replace("/");
    }
  };
  return (
    <div className="login_ctr">
      <div>
        <img src={ImgHome} alt="FacultyOfEducation" />
      </div>
      <div>
        <div className="form_ctr card">
          <form onSubmit={form_submit} className="login_form">
            <div className="login-logo-ctr">
              <img src={LOGO} alt="LIRAUNIVERSITY" />
            </div>
            <div className="login-inputs-ctr">
              <TextField
                error={state.apiFeedBackError}
                helperText={
                  state.apiFeedBackError
                    ? "Wrong Dept. Number or some network error"
                    : ""
                }
                variant="outlined"
                label="Dept. Number"
                type="text"
                name="no"
                fullWidth
                style={{ margin: "20px 0px" }}
              />
              <TextField
                error={state.apiFeedBackError}
                helperText={
                  state.apiFeedBackError
                    ? "Wrong Pin or some network error"
                    : ""
                }
                variant="outlined"
                label="Pin"
                type="password"
                name="pin"
                fullWidth
                style={{ margin: "20px 0px" }}
              />
            </div>
            <div>Department Number and Pin as obtained from AR</div>
            <div className="login-btn-ctr">
              <Button
                color="primary"
                variant={state.submit ? "outlined" : "contained"}
                type="submit"
                style={{ width: "100%" }}
              >
                <CircularProgress
                  size={15}
                  thickness={10}
                  style={{
                    display: state.submit ? "inline-block" : "none",
                    marginRight: "20px",
                  }}
                />
                {state.submit ? "Please Wait..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

export function Logout() {
  const token_stored = localStorage.getItem("token");
  if (token_stored) {
    localStorage.removeItem("token");
  } else {
    sessionStorage.removeItem("token");
  }
  window.location.replace("/");
}
