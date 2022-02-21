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
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/api";

import "../../design/main.css";
import "../../design/forms.css";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Teachers() {
  const [state, setState] = useState({ teacherList: [], mui: {} });

  useEffect(() => {
    (async () => {
      const api = new FormsApi();
      const res = await api.get("/teachers");
      if (res !== "Error") {
        setState({
          ...state,
          teacherList: (typeof res.data === "string" ? [] : res.data) || [],
        });
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
        message: "Processing...",
      },
    });
    const form_data = new FormData(e.target);
    const form_contents = {};
    form_data.forEach((v, i) => {
      form_contents[i] = v;
    });
    const api = new FormsApi();
    const res = await api.post("/user/new", form_contents);
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
                            <td>{v.teacher_email}</td>
                            <td>{v.teacher_name}</td>
                            <td>{v.teacher_faculty}</td>
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
                                    `/user/delete/${v.id}`
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
                            label="Teacher's Name"
                            helperText="Full Name"
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          />
                          <TextField
                            name="teacher_email"
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
                                name: "teacher_faculty",
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
