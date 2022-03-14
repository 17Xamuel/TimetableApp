import React, { useEffect, useState } from "react";
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
import { Alert as MuiAlert } from "@material-ui/lab";

import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/api";

import "../../design/main.css";
import "../../design/forms.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CoureUnits() {
  const [state, setState] = useState({
    courseCodesNumber: [1],
    classList: [],
    teacherList: [],
    roomsList: [],
    courseUnitList: [],
    mui: {},
    selectedClasses: [],
  });

  useEffect(() => {
    //teachers
    (async () => {
      const api = new FormsApi();
      const users = await api.get("/users/all");
      if (users !== "Error") {
        const rooms = await api.get("/rooms/all");
        if (rooms !== "Error") {
          const courses = await api.get("/course-units/all");
          if (courses !== "Error") {
            const classes = await api.get("/class/all");
            if (classes !== "Error") {
              setState({
                ...state,
                classList: (typeof classes === "string" ? [] : classes) || [],
                courseUnitList:
                  (typeof courses === "string" ? [] : courses) || [],
                roomsList: (typeof rooms === "string" ? [] : rooms) || [],
                teacherList: (typeof users === "string" ? [] : users) || [],
              });
            }
          }
        }
      }
    })();
  }, []);

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      mui: {
        ...state.mui,
        open: true,
        status: "info",
        message: "Please Wait...",
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
      if (res.status === false) {
        setState({
          ...state,
          mui: {
            ...state.mui,
            open: true,
            status: "warning",
            message: res.data,
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
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => window.location.reload()}
                      style={{
                        width: "85%",
                        margin: "20px",
                      }}
                    >
                      Refresh
                    </Button>
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
                              {state.roomsList.length === 0
                                ? "No Rooms Registered"
                                : "Select Room"}
                            </InputLabel>
                            <Select
                              inputProps={{
                                name: "course_unit_room",
                              }}
                              disabled={state.roomsList.length === 0}
                              label={
                                state.roomsList.length === 0
                                  ? "No Rooms Registered"
                                  : "Select Room"
                              }
                              id="select_room"
                              value={state.active_room || ""}
                              onChange={async (e, v) => {
                                setState({
                                  ...state,
                                  active_room: e.target.value,
                                });
                              }}
                            >
                              {state.roomsList.length === 0 ? (
                                <MenuItem value="">No Rooms Added</MenuItem>
                              ) : (
                                state.roomsList.map((v, i) => {
                                  return (
                                    <MenuItem value={v.id} key={i}>
                                      {v.room_name}
                                    </MenuItem>
                                  );
                                })
                              )}
                            </Select>
                          </FormControl>
                          <FormControl
                            variant="outlined"
                            label="semester"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          >
                            <InputLabel id="semester">
                              Select Semester
                            </InputLabel>
                            <Select
                              inputProps={{
                                name: "semester",
                              }}
                              label="Select Semester"
                              id="semester"
                              value={state.active_semester || ""}
                              onChange={async (e, v) => {
                                setState({
                                  ...state,
                                  active_semester: e.target.value,
                                });
                              }}
                            >
                              <MenuItem value="1">Semester 1</MenuItem>
                              <MenuItem value="2">Semester 2</MenuItem>
                              <MenuItem value="3">Recess Term</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="inpts_on_right">
                          {state.courseCodesNumber.map((v, i) => {
                            return (
                              <TextField
                                key={i}
                                name={`course_unit_code_${i + 1}`}
                                variant="outlined"
                                label={`Course Unit Code ${i + 1}`}
                                helperText="Format 'LCS 3201'"
                                style={{
                                  width: "85%",
                                  margin: "20px",
                                }}
                              />
                            );
                          })}

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              width: "85%",
                              margin: "0px 20px",
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => {
                                setState({
                                  ...state,
                                  courseCodesNumber: [
                                    ...state.courseCodesNumber,
                                    state.courseCodesNumber[
                                      state.courseCodesNumber.length - 1
                                    ] + 1,
                                  ],
                                });
                              }}
                            >
                              Add Course Code
                            </Button>
                          </div>
                          <FormControl
                            variant="outlined"
                            label="course_unit_teacher"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          >
                            <InputLabel id="course_unit_teacher">
                              {state.teacherList.length === 0
                                ? "No Teacher Available"
                                : "Select a Teacher"}
                            </InputLabel>
                            <Select
                              inputProps={{
                                name: "course_unit_teacher",
                              }}
                              label={
                                state.teacherList.length === 0
                                  ? "No Teacher Available"
                                  : "Select a Teacher"
                              }
                              disabled={state.teacherList.length === 0}
                              id="course_unit_teacher"
                              value={state.active_teacher || ""}
                              onChange={async (e, v) => {
                                setState({
                                  ...state,
                                  active_teacher: e.target.value,
                                });
                              }}
                            >
                              {state.teacherList.length === 0 ? (
                                <MenuItem value="">
                                  No Teacher Available
                                </MenuItem>
                              ) : (
                                state.teacherList.map((v, i) => {
                                  return (
                                    <MenuItem value={v.id} key={i}>
                                      {v.user_name}
                                    </MenuItem>
                                  );
                                })
                              )}
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
                      <td>Code(s)</td>
                      <td>Name</td>
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
                        let codes = JSON.parse(v.course_unit_codes);
                        return (
                          <tr key={i}>
                            <td>{codes[0]}</td>
                            <td>{v.course_unit_name}</td>
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
