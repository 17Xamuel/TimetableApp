//react
import React, { useEffect, useState } from "react";

//components
import TimeTable from "./components/tt";

//styles //assets
import Logo from "./assets/lirauni.jpg";
import "./home.css";

//mui
import {
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";

//api
import FormsApi from "./api/api";

export default () => {
  const [state, setState] = useState({ tt: [] });

  useEffect(() => {
    document.body.style.backgroundColor = "#fff";
  }, []);

  const generate = async () => {
    const api = new FormsApi();
    const res = await api.post("/users/admin/generate", {});
    if (res === "Error") {
      setState({
        ...state,
        generate: "Error",
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
          generate: false,
          tt: res.result,
        });
      }
    }
  };

  return (
    <>
      <div className="home-ctr">
        <div className="home-hdr">
          <div>
            <h1>Timetable - Lira University</h1>
            <div>Generate your Class Teaching/Examination Timetable</div>
          </div>
        </div>
        <div className="home-body">
          <div className="home-body-tt-selection-ctr">
            <div>
              <FormControl
                variant="outlined"
                label="select_tt_type"
                style={{ width: "100%" }}
              >
                <InputLabel id="select_tt_type">Select Type</InputLabel>
                <Select
                  inputProps={{
                    name: "select_tt_type",
                  }}
                  label="Select Type"
                  id="select_tt_type"
                  value={state.active_tt_type || ""}
                  onChange={async (e, v) => {
                    setState({
                      ...state,
                      active_tt_type: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="teaching">Teaching TimeTable</MenuItem>
                  <MenuItem value="exam">Examination TimeTable</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="outlined"
                label="select_faculty"
                style={{ width: "100%" }}
                disabled={!state.active_tt_type}
                error={!state.active_tt_type}
              >
                <InputLabel id="select_faculty">
                  Select Faculty/College
                </InputLabel>
                <Select
                  inputProps={{
                    name: "select_faculty",
                  }}
                  label="Select Faculty"
                  id="select_faculty"
                  value={state.active_faculty || ""}
                  onChange={async (e, v) => {
                    setState({
                      ...state,
                      active_faculty: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="FMS">FMS</MenuItem>
                  <MenuItem value="FHS">FHS</MenuItem>
                  <MenuItem value="EDUC">EDUC</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="outlined"
                label="select_class"
                style={{ width: "100%" }}
                disabled={!state.active_faculty}
                error={!state.active_faculty}
              >
                <InputLabel id="select_class">Select a Class</InputLabel>
                <Select
                  inputProps={{
                    name: "select_class",
                  }}
                  label="Select Class"
                  id="select_class"
                  value={state.active_class || ""}
                  onChange={async (e, v) => {
                    setState({
                      ...state,
                      active_class: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="FMS">
                    Classes list after selecting faculty
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="outlined"
                label="select_semester"
                style={{ width: "100%" }}
                disabled={!state.active_class}
                error={!state.active_class}
              >
                <InputLabel id="select_semester">Select Semester</InputLabel>
                <Select
                  inputProps={{
                    name: "select_semester",
                  }}
                  label="Select Semester"
                  id="select_semester"
                  value={state.active_semester || ""}
                  onChange={async (e, v) => {
                    setState({
                      ...state,
                      active_semester: e.target.value,
                      generate: true,
                    });
                    generate();
                  }}
                >
                  <MenuItem value="1">Semester I</MenuItem>
                  <MenuItem value="2">Semester II</MenuItem>
                  <MenuItem value="3">Recess Term</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
          <div className="home-body-tt-ctr tt-ctr">
            {state.generate ? (
              <div className="">
                <CircularProgress size={15} />
                <span style={{ margin: "10px" }}>Generating....</span>
              </div>
            ) : state.tt.length === 0 ? (
              <span style={{ margin: "10px" }}>No timetable Generated</span>
            ) : (
              <TimeTable tt={state.tt} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
