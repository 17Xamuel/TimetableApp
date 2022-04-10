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
import { Alert as MuiAlert, Autocomplete } from "@material-ui/lab";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/api";
import dept from "../../app_config";

import "../../design/main.css";
import "../../design/forms.css";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Teachers() {
  const [state, setState] = useState({
    teacherList: [],
    mui: {},
    selectedDays: [],
    generated_pin: "",
  });

  useEffect(() => {
    (async () => {
      const api = new FormsApi();
      const res = await api.get("/users/teachers/all");
      if (res !== "Error" && typeof res === "object") {
        const check_pin = () => {
          const random_pin = Math.floor(1000 + Math.random() * 9000);
          const has_pin = res.find(
            (el) => parseInt(el.teacher_pin) === random_pin
          );
          if (has_pin) {
            check_pin();
          } else {
            setState({
              ...state,
              teacherList: res,
              generated_pin: random_pin,
            });
          }
        };
        check_pin();
      }
    })();
  }, []);

  // functions
  const changeSelectedDays = (e, v) => setState({ ...state, selectedDays: v });

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
    form_contents["days_available"] = state.selectedDays;
    const api = new FormsApi();
    const res = await api.post("/users/teacher/new", form_contents);
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
            message: "Teacher Added...",
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
      <Nav active="teachers" />
      <div className="main-content">
        <Header />
        <main>
          <div className="recent-grid-left">
            <div className="card">
              <div className="card-header">
                <h3>Department Teachers</h3>
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
                      <td>Name</td>
                      <td>Generated Pin</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {state.teacherList.length === 0 ? (
                      <tr>
                        <td>No Teachers To Display</td>
                      </tr>
                    ) : (
                      state.teacherList.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{v.teacher_name}</td>
                            <td>{v.teacher_pin}</td>
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
                                    `/users/teacher/delete/${v.id}`
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
                                    if (res.status === "false") {
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
                                          message: "Teacher Deleted...",
                                        },
                                      });
                                      window.location.reload();
                                    }
                                  }
                                }}
                              >
                                Delete
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
                  <div>Register a New Teacher</div>
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
                      <h4>Teacher Info</h4>
                      <div className="inputs_ctr">
                        <div className="inpts_on_left">
                          <TextField
                            name="teacher_name"
                            variant="outlined"
                            label="Teacher's Full Name"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          />
                          <TextField
                            name="teacher_pin"
                            variant="outlined"
                            value={state.generated_pin}
                            label="Generated Pin"
                            helperText="That will be used to access timetable"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          />
                          <Autocomplete
                            limitTags={2}
                            filterSelectedOptions
                            onChange={changeSelectedDays}
                            multiple
                            getOptionLabel={(opt) => `${opt.v}`}
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                            disablePortal
                            id="tags-standard"
                            options={[
                              { v: "Full Time", i: 7 },
                              { v: "Monday", i: 0 },
                              { v: "Tuesday", i: 1 },
                              { v: "Wednesday", i: 2 },
                              { v: "Thursday", i: 3 },
                              { v: "Friday", i: 4 },
                              { v: "Saturday", i: 5 },
                              { v: "Sunday", i: 6 },
                            ]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Teacher Availability"
                                variant="outlined"
                                color="primary"
                              />
                            )}
                          />
                          <input
                            type="hidden"
                            name="teacher_dept"
                            value={dept.id}
                          />
                        </div>
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
