import React, { useEffect, useState } from "react";

//components
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/api";
import TimeTable from "../../components/tt";

//styles
import "../../components/tt.css";
import "../../design/forms.css";

//mui
import {
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";

export default function Dashboard() {
  const [state, setState] = useState({
    generating: "false",
    clearing: "false",
    numbers: {},
    mui: {},
    tt: [],
  });

  useEffect(() => {
    (async () => {
      const api = new FormsApi();
      const res = await api.get("/users/admin/numbers");
      if (res !== "Error") {
        setState({
          ...state,
          numbers: (res.status === false ? {} : res.result) || {},
        });
      }
    })();
  }, []);

  const handleClear = async () => {
    setState({
      ...state,
      clearing: "true",
    });
    let api = new FormsApi();
    let clear = await api.put("/users/admin/clear");
    if (clear !== "Error") {
      setState({
        ...state,
        clearing: "false",
      });
      console.log("Cleared");
    } else {
      setState({
        ...state,
        clearing: "Error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      generating: "true",
    });
    const form_data = new FormData(e.target);
    const form_contents = {};
    form_data.forEach((v, i) => {
      form_contents[i] = v;
    });
    const api = new FormsApi();
    const res = await api.post("/users/admin/generate", form_contents);
    if (res === "Error") {
      setState({
        ...state,
        generating: "Error",
      });
    } else {
      if (res.status === false) {
        setState({
          ...state,
          generating: "Error",
        });
      } else {
        setState({
          ...state,
          generating: "false",
          tt: res.result,
        });
      }
    }
  };

  return (
    <>
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <Nav active="dashboard" />
      <div className="main-content">
        <Header title="Computing &amp; Info. Sciences" />
        <main>
          <div className="cards">
            <div className="card-single">
              <div className="">
                <h3>{state.numbers.teachers || "..."}</h3>
                <span>
                  Teachers <br />
                  <span style={{ fontSize: "13px" }}>Registered in System</span>
                </span>
              </div>
              <div className="">
                <span className="las la-users"> </span>
              </div>
            </div>
            <div className="card-single">
              <div className="">
                <h3>{state.numbers.course_units || "..."}</h3>
                <span>Course Units</span>
                <br />
                <span style={{ fontSize: "13px" }}>Being Taught</span>
              </div>
              <div className="">
                <span className="las la-users"></span>
              </div>
            </div>
            <div className="card-single">
              <div className="">
                <h3>{state.numbers.rooms || "..."}</h3>
                <span>Rooms</span>
                <br />
                <span style={{ fontSize: "13px" }}>For Lectures</span>
              </div>
              <div className="">
                <span className="las la-users"> </span>
              </div>
            </div>
            <div className="card-single">
              <div className="">
                <h3>{state.numbers.classes || "..."}</h3>
                <span>Classes</span>
                <br />
                <span style={{ fontSize: "13px" }}>In the System</span>
              </div>
              <div className="">
                <span className="las la-users"> </span>
              </div>
            </div>
          </div>
          <div className="fullwidth-ctr">
            <div className="card">
              <div className="tt-ctr">
                {state.tt.length === 0 ? (
                  <TimeTable tt={state.tt} />
                ) : (
                  <TimeTable tt={state.tt} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
