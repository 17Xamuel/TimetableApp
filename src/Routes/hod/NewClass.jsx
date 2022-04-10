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
  CircularProgress,
} from "@material-ui/core";
import { Autocomplete, Alert as MuiAlert } from "@material-ui/lab";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/api";
import dept from "../../app_config";

import "../../design/main.css";
import "../../design/forms.css";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Classes() {
  const [state, setState] = useState({
    classList: [],
    mui: {},
    courseList: [],
    selectedCourses: [],
  });

  useEffect(() => {
    (async () => {
      const api = new FormsApi();
      const res = await api.get("/class/all");
      if (res !== "Error") {
        const courses = await api.get("/course-units/all");
        if (courses !== "Error") {
          setState({
            ...state,
            classList: (typeof res === "string" ? [] : res) || [],
            courseList: (typeof courses === "string" ? [] : courses) || [],
          });
        }
      }
    })();
  }, []);

  const changeSelectedCourses = (e, v) =>
    setState({ ...state, selectedCourses: v });

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
    form_contents["class_course_units"] = state.selectedCourses;
    const api = new FormsApi();
    const res = await api.post("/class/new", form_contents);
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
            message: "Class Added...",
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
      <Nav active="classes" />
      <div className="main-content">
        <Header />
        <main>
          <div className="recent-grid">
            <div className="card">
              <div className="card-header">
                <h3>Classes Registered</h3>
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
                  Refresh
                </Button>
              </div>
              <div className="card-body">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>No.</td>
                      <td>Code</td>
                      <td>Study Time</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {state.classList.length === 0 ? (
                      <tr>
                        <td>No Class Registered</td>
                      </tr>
                    ) : (
                      state.classList.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{v.class_code}</td>
                            <td>{v.study_time}</td>
                            <td>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={async () => {
                                  setState({
                                    ...state,
                                    mui: {
                                      ...state.mui,
                                      open: true,
                                      status: "info",
                                      message: "Deleting....",
                                    },
                                  });
                                  const api = new FormsApi();
                                  const res = await api.delete(
                                    `/class/delete/${v.id}`
                                  );
                                  if (res === "Error") {
                                    setState({
                                      ...state,
                                      mui: {
                                        ...state.mui,
                                        open: true,
                                        status: "warning",
                                        message:
                                          "Failed to Delete - Network Error",
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
                                          message:
                                            "Failed to Delete - Server Error",
                                        },
                                      });
                                    } else {
                                      setState({
                                        ...state,
                                        mui: {
                                          ...state.mui,
                                          open: true,
                                          status: "success",
                                          message: "Class Deleted...",
                                        },
                                      });
                                      window.location.reload();
                                    }
                                  }
                                }}
                              >
                                Delete Class
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
            <div className="projects">
              <form className="card" autoComplete="off" onSubmit={handleSubmit}>
                <div className="card-header ">
                  <div>Register a New Class</div>
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
                    <div
                      className="inputCtr"
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: "5px",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          width: "100%",
                          margin: "15px auto",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <div className="inpts_on_left">
                          <input
                            type="hidden"
                            name="class_dept"
                            value={dept.id}
                          />
                          <TextField
                            name="class_code"
                            variant="outlined"
                            label="Class Code"
                            helperText="Format E.G: LCS-2"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          />
                        </div>
                        <div className="inpts_on_right">
                          <FormControl
                            variant="outlined"
                            label="study_time"
                            required
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          >
                            <InputLabel id="study_time">Study Time</InputLabel>
                            <Select
                              inputProps={{
                                name: "study_time",
                              }}
                              label="Study Time"
                              id="study_time"
                              value={state.active_study_time || ""}
                              onChange={async (e, v) => {
                                setState({
                                  ...state,
                                  active_study_time: e.target.value,
                                });
                              }}
                            >
                              <MenuItem value="day">Day</MenuItem>
                              <MenuItem value="weekend">Weekend</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div>
                        <Autocomplete
                          limitTags={2}
                          filterSelectedOptions
                          onChange={changeSelectedCourses}
                          multiple
                          getOptionLabel={(opt) => `${opt.course_unit_name}`}
                          style={{
                            width: "90%",
                            margin: "20px",
                          }}
                          disablePortal
                          id="tags-standard"
                          options={state.courseList}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Course Units"
                              variant="outlined"
                              color="primary"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
