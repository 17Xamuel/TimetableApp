//react
import React, { useEffect, useState } from "react";

//router...
import { Link } from "react-router-dom";

//components
import TimeTable from "./components/tt";

//styles //assets
import Logo from "./assets/lirauni.jpg";
import "./home.css";

/**
 *
 * material ui
 */
import {
  IconButton,
  Snackbar,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";

//api
import FormsApi from "./api/api";

export default () => {
  const [state, setState] = useState({
    mui: {},
    serverError: false,
    numbers: {},
    tt: [],
    active_tt_type: "teaching",
    active_faculty: "",
    active_depts: [],
    active_dept: "",
    active_classes: [],
    active_class: "",
    generate: false,
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#fff";
    (async () => {
      const api = new FormsApi();
      const res = await api.get(`/users/admin/numbers`);
      console.log(res.result);
      if (res !== "Error") {
        if (res.status !== false) {
          setState({
            ...state,
            numbers: res.result || {},
            tt:
              res.result.tt.length === 0 ? [] : JSON.parse(res.result.tt[0].tt),
          });
        }
      } else {
        setState({
          ...state,
          serverError: true,
        });
      }
    })();
  }, []);

  /***
   *
   * alert from material
   */
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  /***
   *
   * close mui pop up
   */
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

      <div className="home-ctr">
        <span style={{ position: "absolute", top: "0", right: 0 }}>
          <Link to="/check">Manage</Link>
        </span>
        <div className="home-hdr">
          <div>
            <h1>Timetable - Lira University</h1>
            <div>Generate your Class Teaching</div>
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
                <InputLabel id="select_tt_type">Showing for:</InputLabel>
                <Select
                  inputProps={{
                    name: "select_tt_type",
                  }}
                  label="Showing for:"
                  id="select_tt_type"
                  value={state.active_tt_type || ""}
                  onFocus={() => {
                    if (state.serverError) {
                      setState({
                        ...state,
                        mui: {
                          ...state.mui,
                          open: true,
                          status: "warning",
                          message:
                            "Your Computer Seems to have no Internet Connection",
                        },
                      });
                    }
                  }}
                  onChange={async (e, v) => {
                    setState({
                      ...state,
                      active_tt_type: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="teaching">Teaching TimeTable</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="outlined"
                label="select_faculty"
                disabled={state.serverError}
                style={{ width: "100%" }}
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
                      active_depts: state.numbers.depts.filter(
                        (el) => el.dept_faculty === e.target.value
                      ),
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
                label="select_dept"
                style={{ width: "100%" }}
                disabled={!state.active_faculty}
              >
                <InputLabel id="select_dept">Department</InputLabel>
                <Select
                  inputProps={{
                    name: "select_dept",
                  }}
                  label="Department"
                  id="select_dept"
                  value={state.active_dept || ""}
                  onChange={async (e, v) => {
                    setState({
                      ...state,
                      active_dept: e.target.value,
                      active_classes: state.numbers.classes.filter(
                        (el) => el.class_dept === e.target.value
                      ),
                    });
                  }}
                >
                  {state.active_depts.map((el, i) => (
                    <MenuItem key={i} value={el.id}>
                      {el.dept_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="outlined"
                label="select_class"
                style={{ width: "100%" }}
                disabled={!state.active_dept}
              >
                <InputLabel id="select_class">Your Class</InputLabel>
                <Select
                  inputProps={{
                    name: "select_class",
                  }}
                  label="Your Class"
                  id="select_class"
                  value={state.active_class || ""}
                  onChange={async (e, v) => {
                    setState({
                      ...state,
                      active_class: e.target.value,
                    });
                  }}
                >
                  {state.active_classes.map((el, i) => (
                    <MenuItem key={i} value={el.id}>
                      {el.class_code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                variant="outlined"
                disabled={!state.active_class}
                color="primary"
                style={{ marginRight: "15px" }}
                onClick={() => {
                  setState({
                    ...state,
                    generate: true,
                  });
                }}
              >
                Go
              </Button>
              <Button
                disabled={!state.generate}
                variant="outlined"
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
              <TimeTable
                tt={state.tt}
                filter_level="class"
                filter_class={state.numbers.classes.find(
                  (el) => el.id === state.active_class
                )}
                teachers={state.numbers.teachers}
                rooms={state.numbers.rooms}
              />
            ) : (
              <span style={{ margin: "10px" }}>No timetable Generated</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
