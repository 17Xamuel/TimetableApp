import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import FormsApi from "../api/api";
import Logo from "../assets/lirauni.jpg";
import { Base64 } from "js-base64";
//design
import "./login.css";

function Login() {
  const [user, setUser] = useState({
    dept: "",
    pin: "",
    _cp: true,
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
    const api = new FormsApi();
    const res = await api.post("/user/login", form_contents);
    if (res === "Error") {
      setServerError(true);
    } else {
      console.log(res);
    }
  };
  return (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
      className="m-ctr"
    >
      <form className="ctr" onSubmit={submit}>
        <img
          alt="Logo"
          src={Logo}
          height="120px"
          width="270px"
          style={{ objectFit: "contain" }}
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
            name=""
            variant="standard"
            label="Department Number"
            helperText={!user._cp ? "Incorrect Department" : ""}
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
            type="number"
            name="pin"
            variant="standard"
            helperText={!user._cp ? "Incorrect Pin" : ""}
            label="Pin"
            required
            error={!user._cp}
            fullWidth
            style={{
              display: "block",
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
            Go
            <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
              <i className="las la-sign-in-alt"></i>
            </span>
          </Button>
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
    </div>
  );
}

export default Login;

export function Logout() {
  sessionStorage.removeItem("token");
  window.location.replace("/");
}
