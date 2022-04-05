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
  });

  useEffect(() => {
    (async () => {
      const api = new FormsApi();
      const res = await api.get("/users/all");
      if (res !== "Error") {
        setState({
          ...state,
          teacherList: (typeof res.data === "string" ? [] : res) || [],
        });
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
    const res = await api.post("/users/new", form_contents);
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
          <div className="recent-grid">
            <div className="card">
              <div className="card-header">
                <h3>Teachers</h3>
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
                      <td>Email</td>
                      <td>Name</td>
                      <td>Faculty</td>
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
                            <td>{v.user_email}</td>
                            <td>{v.user_name}</td>
                            <td>{v.user_faculty}</td>
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
                                    `/users/delete/${v.id}`
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
                            name="user_name"
                            variant="outlined"
                            label="Teacher's Name"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          />
                          <TextField
                            name="user_email"
                            variant="outlined"
                            label="Teacher's Email"
                            helperText="email address for identification"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          />
                        </div>
                        <div className="inpts_on_right">
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
                                name: "user_faculty",
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
