import React, { useState } from "react";

//components
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/api";
import TimeTable from "../../components/tt";

//styles
import "../../components/tt.css";

//mui
import { TextField } from "@material-ui/core";

export default function Dashboard() {
  const [state, setState] = useState({ numbers: {}, mui: {} });

  (async () => {
    const api = new UsersApi();
    const res = await api.get("/dashboard/numbers");
    if (res !== "Error") {
      setState({
        ...state,
        numbers: (typeof res.data === "string" ? {} : res.data) || {},
      });
    }
  })();
  return (
    <>
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <Nav active="dashboard" />
      <div className="main-content">
        <Header />
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
                <span style={{ fontSize: "13px" }}>For Lecture</span>
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
              <div className="admin-tt-config">
                <TextField label="Select TimeTable" />
              </div>
              <div className="tt-ctr">
                <TimeTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
