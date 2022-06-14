//react
import React, { useEffect, useState } from "react";

//components
import TimeTable from "../../components/tt";

//styles //assets
import "./index.css";

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
import FormsApi from "../../api/api";

export default () => {
  const [state, setState] = useState({
    tt: [],
    generate: false,
    active_tt_type: "teaching",
    teacher_pin: "...",
    numbers: {},
    teacher: {},
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#fff";
  }, []);

  const getTeacherTimetable = async () => {
    setState({ ...state, generate: true });
    const api = new FormsApi();
    const res = await api.get(`/users/admin/numbers`);
    if (res !== "Error") {
      if (res.status !== false) {
        setState({
          ...state,
          numbers: res.result || {},
          tt: res.result.tt.length === 0 ? [] : JSON.parse(res.result.tt[0].tt),
          teacher: res.result.teachers.find(
            (el) => el.teacher_pin === state.teacher_pin
          ),
        });
      }
    }
  };

  return (
    <>
      <div className="teacher-ctr">
        <div className="teacher-hdr">
          <div>
            <h1>Timetable - Lira University</h1>
            <div>Generate staff Teaching</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <h1>{state.teacher.teacher_name}</h1>
            <div>
              Available Days:
              {state.teacher.teacher_available_days
                ? JSON.parse(state.teacher.teacher_available_days).map(
                    (el, i) => {
                      if (
                        i ===
                        JSON.parse(state.teacher.teacher_available_days)
                          .length -
                          1
                      ) {
                        return <span key={i}>{` ${el.v}`}</span>;
                      } else {
                        return <span key={i}>{` ${el.v},`}</span>;
                      }
                    }
                  )
                : ""}
            </div>
          </div>
        </div>
        <div className="teacher-body">
          <div className="teacher-body-tt-selection-ctr">
            <div>
              <TextField
                variant="outlined"
                style={{ width: "256px" }}
                label="Pin"
                type="number"
                onChange={(e) => {
                  setState({ ...state, teacher_pin: e.target.value });
                }}
              />
            </div>
            <div>
              <FormControl variant="outlined" label="select_tt_type">
                <InputLabel id="select_tt_type">Select Type</InputLabel>
                <Select
                  inputProps={{
                    name: "select_tt_type",
                  }}
                  label="Select Type"
                  id="select_tt_type"
                  value={state.active_tt_type || ""}
                  style={{ width: "256px" }}
                  onChange={(e, v) => {
                    setState({
                      ...state,
                      active_tt_type: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="teaching">Teaching TimeTable</MenuItem>
                  {/* <MenuItem value="exam">Exam Supervision TimeTable</MenuItem> */}
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "32px" }}
                onClick={getTeacherTimetable}
              >
                Generate
              </Button>

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
          <div className="teacher-body-tt-ctr tt-ctr">
            {state.generate ? (
              state.tt.length !== 0 ? (
                <TimeTable
                  tt={state.tt}
                  teacher_pin={state.teacher.teacher_pin || 0}
                  filter_level="Teacher"
                  teachers={state.numbers.teachers}
                  rooms={state.numbers.rooms}
                />
              ) : (
                <div className="">
                  <CircularProgress size={15} />
                  <span style={{ margin: "10px" }}>Generating....</span>
                </div>
              )
            ) : (
              <span style={{ margin: "10px" }}>No timetable Generated</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
