import React, { useEffect, useState } from "react";

//components
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/api";
import TimeTable from "../../components/tt";
import dept from "../../app_config";

//styles
import "../../components/tt.css";
import "../../design/forms.css";

//mui
import {
  Switch,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";

export default function Dashboard() {
  const [state, setState] = useState({
    active_type: "teaching_tt",
    numbers: {},
    mui: {},
    tt: [],
  });

  useEffect(() => {
    (async () => {
      const api = new FormsApi();
      const res = await api.get(`/users/admin/numbers`);
      if (res !== "Error") {
        console.log(res.result);
        setState({
          ...state,
          numbers: (res.status === false ? {} : res.result) || {},
          tt: res.result.tt.length === 0 ? [] : JSON.parse(res.result.tt[0].tt),
        });
      }
    })();
  }, []);

  return (
    <>
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <Nav active="dashboard" />
      <div className="main-content">
        <Header />
        <main>
          <div className="cards cards-3">
            <div className="card-single">
              <div className="">
                <h3>
                  {state.numbers.teachers
                    ? state.numbers.teachers.length
                    : "..."}
                </h3>
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
                <h3>
                  {state.numbers.course_units
                    ? state.numbers.course_units.length
                    : "..."}
                </h3>
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
                <h3>
                  {state.numbers.classes ? state.numbers.classes.length : "..."}
                </h3>
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
              <div>
                <FormControl
                  variant="outlined"
                  style={{
                    width: "200px",
                    margin: "20px",
                  }}
                >
                  <InputLabel id="tt_type">Showing For</InputLabel>
                  <Select
                    inputProps={{
                      name: "tt_type",
                    }}
                    label="Showing For"
                    value={state.active_type}
                    id="tt_type"
                    onChange={async (e, v) => {
                      setState({
                        ...state,
                        active_type: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value="teaching_tt">Teaching Timetable</MenuItem>
                    {/* <MenuItem value="exam_tt">Examination Timetable</MenuItem> */}
                  </Select>
                </FormControl>
                <div></div>
              </div>
              <div className="tt-ctr">
                <TimeTable
                  tt={state.tt}
                  user={dept}
                  filter_level="Admin"
                  teachers={state.numbers.teachers}
                  rooms={state.numbers.rooms}
                />
              </div>
              <div>Missed course units here</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
