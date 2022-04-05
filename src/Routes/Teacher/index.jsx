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
      <div className="teacher-ctr">
        <div className="teacher-hdr">
          <div>
            <h1>Timetable - Lira University</h1>
            <div>Generate staff Teaching/Exam Supervsion Timetable</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <h1>{"..."}</h1>
            <div>Available Days: ...</div>
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
                  onChange={async (e, v) => {
                    setState({
                      ...state,
                      active_tt_type: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="teaching">Teaching TimeTable</MenuItem>
                  <MenuItem value="exam">Exam Supervision TimeTable</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "32px" }}
                onClick={() => {
                  window.location.reload();
                }}
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
