import React, { useState } from "react";
import {
  TextField,
  Snackbar,
  Button,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/api";

import "../../design/main.css";
import "../../design/forms.css";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CoureUnits() {
  const [state, setState] = useState({ courseUnitList: [], mui: {} });

  (async () => {
    const api = new FormsApi();
    const res = await api.get("/course-units");
    if (res !== "Error") {
      setState({
        ...state,
        courseUnitList: (typeof res.data === "string" ? [] : res.data) || [],
      });
    }
  })();

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      mui: {
        ...state.mui,
        open: true,
        status: "info",
        message: "Processing...",
      },
    });
    const form_data = new FormData(e.target);
    const form_contents = {};
    form_data.forEach((v, i) => {
      form_contents[i] = v;
    });
    const api = new FormsApi();
    const res = await api.post("/course-units/new", form_contents);
    if (res === "Error") {
      setState({
        ...state,
        mui: {
          ...state.mui,
          open: true,
          status: "warning",
          message: "Some Error Occured...",
        },
      });
    } else {
      if (res.status === "false") {
        setState({
          ...state,
          mui: {
            ...state.mui,
            open: true,
            status: "warning",
            message: "Some Error Occured...",
          },
        });
      } else {
        setState({
          ...state,
          mui: {
            ...state.mui,
            open: true,
            status: "success",
            message: "Course Unit Added...",
          },
        });
        window.location.reload();
      }
    }
  };

  const closePopUp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, mui: { ...state.mui, open: false, message: "" } });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={state.mui.open}
        autoHideDuration={5000}
        onClose={closePopUp}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closePopUp}
            >
              <i className="las la-times"></i>
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={closePopUp} severity={state.mui.status}>
          {state.mui.message}
        </Alert>
      </Snackbar>
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <Nav active="course-units" />
      <div className="main-content">
        <Header />
        <main>
          <div className="recent-grid-left">
            <div className="projects">
              <form className="card" autoComplete="off" onSubmit={handleSubmit}>
                <div className="card-header">
                  <div>Register/View a Course Unit</div>
                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{
                        width: "85%",
                        margin: "20px",
                      }}
                    >
                      Done
                    </Button>
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    <div className="inputCtr">
                      <h4>Course Unit - Details</h4>
                      <div className="inputs_ctr">
                        <div className="inpts_on_left">
                          <TextField
                            variant="outlined"
                            color="primary"
                            label="Course Unit Name"
                            name="course_unit_name"
                            helperText="Full name"
                            multiline
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          />
                          <TextField
                            variant="outlined"
                            color="primary"
                            label="Credit Units"
                            name="course_unit_credit_units"
                            type="number"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          />
                          <FormControl
                            variant="outlined"
                            label="select_room"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          >
                            <InputLabel id="select_room">
                              Select Room
                            </InputLabel>
                            <Select
                              inputProps={{
                                name: "select_room",
                              }}
                              label="Select Room"
                              id="select_room"
                              value={state.active_room || ""}
                              onChange={async (e, v) => {
                                setState({
                                  ...state,
                                  active_room: e.target.value,
                                });
                              }}
                            >
                              <MenuItem value="lab">Rooms List</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="inpts_on_right">
                          <TextField
                            name="course_unit_code"
                            variant="outlined"
                            label="Course Unit Code"
                            helperText="Format 'LCS 3201'"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          />
                          <FormControl
                            variant="outlined"
                            label="faculty_name"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          >
                            <InputLabel id="faculty_name">
                              Select Faculty
                            </InputLabel>
                            <Select
                              inputProps={{
                                name: "course_unit_faculty",
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
                          <FormControl
                            variant="outlined"
                            label="course_unit_teacher"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          >
                            <InputLabel id="course_unit_teacher">
                              Select a Teacher
                            </InputLabel>
                            <Select
                              inputProps={{
                                name: "course_unit_teacher",
                              }}
                              label="Select a Teacher"
                              id="course_unit_teacher"
                              value={state.active_teacher || ""}
                              onChange={async (e, v) => {
                                setState({
                                  ...state,
                                  active_teacher: e.target.value,
                                });
                              }}
                            >
                              <MenuItem value="FMS">Teachers List</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Course Units</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    window.location.reload();
                  }}
                  style={{ fontSize: "17.5px", marginRight: "15px" }}
                >
                  <span style={{ fontSize: "17.5px", marginRight: "10px" }}>
                    <i className="las la-redo"></i>
                  </span>
                  search
                </Button>
              </div>
              <div className="card-body">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>No.</td>
                      <td>Code</td>
                      <td>Teacher</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {state.courseUnitList.length === 0 ? (
                      <tr>
                        <td>No Course Units Registered</td>
                      </tr>
                    ) : (
                      state.courseUnitList.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{v.course_unit_code}</td>
                            <td>{v.course_unit_teacher}</td>
                            <td>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                  console.log("Deleted");
                                }}
                              >
                                Delete
                              </Button>
                            </td>
                            <td>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                  console.log("Edited");
                                }}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
