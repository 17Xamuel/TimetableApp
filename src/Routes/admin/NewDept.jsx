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
    dept_pin: "",
    dept_number: "",
    deptsList: [],
    mui: {},
  });

  useEffect(() => {
    (async () => {
      const api = new FormsApi();
      const res = await api.get("/users/depts/all");
      if (res !== "Error" && typeof res === "object") {
        const number = res.length + 1;
        const check_pin = () => {
          const random_pin = Math.floor(1000 + Math.random() * 9000);
          const has_pin = res.find(
            (el) => parseInt(el.dept_pin) === random_pin
          );
          if (has_pin) {
            check_pin();
          } else {
            setState({
              ...state,
              deptsList: res,
              dept_pin: random_pin,
              dept_number: number,
            });
          }
        };
        check_pin();
      }
    })();
  }, []);

  /**
   *
   * functions to this component
   */

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
    const res = await api.post("/users/depts/new", form_contents);
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
            message: "New Department Added....",
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
      <Nav active="depts" />
      <div className="main-content">
        <Header />
        <main>
          <div className="recent-grid-left">
            <div className="card">
              <div className="card-header">
                <h3>Departments</h3>
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
                      <td>Dept. Name</td>
                      <td>Dept. Number</td>
                      <td>Dept. Faculty</td>
                      <td>Generated Pin</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {state.deptsList.length === 0 ? (
                      <tr>
                        <td>No Departments To Display</td>
                      </tr>
                    ) : (
                      state.deptsList.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td>{v.dept_name}</td>
                            <td>{v.dept_number}</td>
                            <td>{v.dept_faculty}</td>
                            <td>{v.dept_pin}</td>
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
                                    `/users/depts/delete/${v.id}`
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
                                          message: "Department Deleted...",
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
                  <div>Register a New Department</div>
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
                      <h4>Department Info.</h4>
                      <div className="inputs_ctr">
                        <div className="inpts_on_left">
                          <TextField
                            name="name"
                            variant="outlined"
                            label="Department Name"
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
                                name: "faculty",
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
                        <div className="inpts_on_right">
                          <TextField
                            name="pin"
                            variant="outlined"
                            label="Generated Pin"
                            value={state.dept_pin || ""}
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
                          />
                          <TextField
                            name="number"
                            variant="outlined"
                            label="Department Number"
                            value={state.dept_number || ""}
                            style={{
                              width: "85%",
                              margin: "20px",
                            }}
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
