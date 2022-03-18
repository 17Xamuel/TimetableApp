import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import FormsApi from "../api/api";
import Image from "../assets/timetable.png";
import Logo from "../assets/fhp.jpg";
import { Base64 } from "js-base64";
//design
import "./login.css";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    _cp: true,
    password_mismatch: false,
    activate: false,
  });
  const [loaderOpen, setloaderOpen] = useState(false);
  const [ServerError, setServerError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form_contents = {};
    formData.forEach((v, i) => {
      form_contents[i] = v;
    });
    if (user.activate) form_contents["new"] = "true";
    const api = new FormsApi();
    if (user.activate) {
      const res = await api.post("/user/new", form_contents);
      if (res === "Error") {
        setServerError(true);
      } else {
        console.log(res);
      }
    } else {
      const res = await api.post("/user/login", form_contents);
      if (res === "Error") {
        setServerError(true);
      } else {
        console.log(res);
      }
    }
  };
  return (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
      className="m-ctr"
    >
      <form className="ctr" onSubmit={submit}>
        <img
          alt="Hospital"
          src={Logo}
          height="120px"
          width="150px"
          style={{ objectFit: "cover" }}
        />
        <div
          className="header"
          style={{
            margin: "15px 0px",
          }}
        >
          Access Timetable
        </div>
        <div className="loginCtr">
          <TextField
            name="email"
            variant="standard"
            label="Email"
            helperText={!user._cp ? "Incorrect Email Or Password" : ""}
            error={!user._cp}
            fullWidth
            required
            style={{
              width: "250px",
              display: "block",
              margin: "15px 0px",
            }}
          />
          <TextField
            type="password"
            name="password"
            variant="standard"
            helperText={
              !user._cp
                ? "Incorrect Email Or Password"
                : user.password_mismatch
                ? "Passwords Do not Match"
                : ""
            }
            label="Password"
            required
            error={!user._cp || user.password_mismatch}
            fullWidth
            style={{
              display: "block",
              margin: "30px 0px",
            }}
          />
          <TextField
            type="password"
            name="repeat_password"
            variant="standard"
            helperText={user.password_mismatch ? "Passwords Do not Match" : ""}
            label="Repeat Password"
            required={user.activate}
            error={!user._cp || user.password_mismatch}
            fullWidth
            style={{
              display: user.activate ? "block" : "none",
              margin: "30px 0px",
            }}
          />
        </div>
        <div className="submitCtr">
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            style={{ marginRight: 10 }}
          >
            Login
            <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
              <i className="las la-sign-in-alt"></i>
            </span>
          </Button>
          <span
            onClick={() => {
              setUser({ ...user, activate: !user.activate });
            }}
            style={{
              color: "#3F51B5",
              margin: "15px 5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {user.activate ? "My Account is active" : "Activate My Account"}
          </span>
        </div>
        {/* for loader */}
        <div
          className="loader"
          style={loaderOpen ? { display: "flex" } : { display: "none" }}
        >
          <CircularProgress size={25} />
          <div>{ServerError}</div>
        </div>
        {/* for loader */}
      </form>
      <img src={Image} className="img" alt="Hospital" />
    </div>
  );
}

export default Login;

export function Logout() {
  sessionStorage.removeItem("token");
  window.location.replace("/");
}
