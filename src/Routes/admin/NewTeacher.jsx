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

export default function Classes() {
  const [state, setState] = useState({ teacherList: [], mui: {} });

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

  // fucntions
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
    const res = await api.post("/new-class", form_contents);
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
      <Nav active="teachers" />
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
                      <td>Faculty</td>
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
                            <td>{v.class_faculty}</td>
                            <td>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                  console.log("Deleted");
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
                    <div className="inputCtr">
                      <h4>Class Details</h4>
                      <div className="inputs_ctr">
                        <div className="inpts_on_left">
                          <TextField
                            name="class_code"
                            variant="outlined"
                            label="Class Code"
                            helperText="Format E.G: LCS-19"
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
                                name: "",
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

// class NewSale extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//       message: "Please Wait...",
//       messageState: "",
//       print: true,
//       _content: {},
//       active_product_qty: 0,
//       active_product_re_order: 0,
//       over_qty_error: false,
//       active_sale_type: "retail",
//       active_selling_unit: "",
//       active_selling_price: "",
//       products: [],
//       customers: [],
//       formData: [],
//       total: 0,
//       discount: 0,
//       finish_btn_disabled: false,
//     };
//   }
//   //customers
//   handleSale = async (e) => {
//     e.preventDefault();
//     if (this.state.finish_btn_disabled) return;
//     this.setState({
//       ...this.state,
//       open: true,
//       messageState: "info",
//       finish_btn_disabled: true,
//     });
//     const fd = new FormData(e.target);
//     let content = {};
//     fd.forEach((value, key) => {
//       content[key] = value;
//     });
//     await this.setState({ ...this.state, _content: content });

//     if (this.state.formData.length !== 0) {
//       this.setState({
//         ...this.state,
//         _content: {
//           ...this.state._content,
//           products_sold: this.state.formData,
//           date: Date.now(),
//           user: user.user.username,
//         },
//       });
//     } else {
//       this.setState({
//         ...this.state,
//         open: true,
//         message: "No Products To Sell",
//         messageState: "warning",
//       });
//       return;
//     }

//     let api = new FormsApi();
//     let res = await api.post("/user/sale/new_sale", this.state._content);
//     if (res.status === true) {
//       if (this.state.print) {
//         this.print_receipt(this.state._content);
//       }
//       this.setState({
//         ...this.state,
//         open: true,
//         message: res.data,
//         messageState: "success",
//         finish_btn_disabled: false,
//       });
//       setTimeout(() => {
//         window.location.reload();
//       }, 700);
//     } else {
//       this.setState({
//         ...this.state,
//         open: true,
//         message: res.data,
//         messageState: "error",
//       });
//     }
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     if (this.state.over_qty_error) {
//       this.setState({
//         ...this.state,
//         open: true,
//         messageState: "error",
//         message: "Quantity Exceeds Available",
//       });
//       return;
//     }
//     if (!this.state.active_drug) {
//       this.setState({
//         ...this.state,
//         open: true,
//         messageState: "error",
//         message: "No Selling Unit",
//       });
//       return;
//     }
//     this.setState({ ...this.state, open: true, messageState: "info" });
//     const fd = new FormData(e.target);
//     let _fcontent = {};
//     fd.forEach((value, key) => {
//       _fcontent[key] = value;
//     });
//     _fcontent["batch"] = this.state.batch ? this.state.batch : [];
//     const product_name = this.state.formData.find(
//       (e) => e.product_name === _fcontent.product_name
//     );
//     if (!product_name) {
//       this.setState({
//         ...this.state,
//         open: true,
//         message: "Product Added",
//         messageState: "success",
//         formData: [...this.state.formData, _fcontent],
//         active_drug: null,
//       });
//     } else {
//       this.setState({
//         ...this.state,
//         open: true,
//         message: "Product Exists",
//         messageState: "warning",
//       });
//     }
//   };

//   handleDrugNameKeyUp = async (e, v) => {
//     const res = e.target.value
//       ? (await UsersApi.data(`/user/sale/products/${e.target.value}`)) || []
//       : [];
//     if (res) {
//       this.setState({ ...this.state, products: res === "Error" ? [] : res });
//     }
//   };

//   IsJsonString(str) {
//     try {
//       JSON.parse(str);
//     } catch (e) {
//       return false;
//     }
//     return true;
//   }

//   handleChangeDrugName = (e, v) => {
//     if (v) {
//       if (!this.IsJsonString(v.product_units)) {
//         this.setState({
//           ...this.state,
//           open: true,
//           message: "This Product has no Selling Units, Edit It to make a sale",
//           messageState: "warning",
//         });
//         return;
//       }
//       this.setState(
//         {
//           ...this.state,
//           active_drug: v,
//         },
//         () => {
//           this.setState(
//             {
//               ...this.state,
//               active_selling_unit: JSON.parse(
//                 this.state.active_drug.product_units
//               )[0].selling_unit,
//               active_selling_price: JSON.parse(
//                 this.state.active_drug.product_units
//               )[0][this.state.active_sale_type],
//             },
//             () => {
//               this.setState({
//                 ...this.state,
//                 active_product_re_order:
//                   (this.state.active_selling_unit ===
//                   JSON.parse(this.state.active_drug.product_units)[0]
//                     .selling_unit
//                     ? parseInt(this.state.active_drug.product_re_order)
//                     : parseInt(this.state.active_drug.product_re_order) /
//                       parseInt(
//                         JSON.parse(this.state.active_drug.product_units).find(
//                           (el) => el.selling_unit === e.target.value
//                         )["qty"]
//                       )) || 0,
//                 active_product_qty:
//                   this.state.active_selling_unit ===
//                   JSON.parse(this.state.active_drug.product_units)[0]
//                     .selling_unit
//                     ? parseInt(this.state.active_drug.product_qty)
//                     : parseInt(this.state.active_drug.product_qty) /
//                       parseInt(
//                         JSON.parse(this.state.active_drug.product_units).find(
//                           (el) => el.selling_unit === e.target.value
//                         )["qty"]
//                       ),
//               });
//             }
//           );
//         }
//       );
//     }
//   };

//   getTotals() {
//     let total = 0;
//     if (this.state.formData.length !== 0) {
//       this.state.formData.forEach((e) => {
//         total += parseInt(e.product_price) * parseInt(e.qty);
//       });
//     }
//     return total;
//   }

//   closePopUp = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     this.setState({ ...this.state, open: false, message: "" });
//   };

//   render() {

//   }
// }

// export default NewSale;

// function Finish({ t, sale_type, customers }) {
//   const [discount, setDiscount] = useState(0);
//   return (
//     <div className="_finish_purchase_ctr">
//       <TextField
//         name="total_amount"
//         variant="outlined"
//         label="Total"
//         value={t}
//         style={{
//           width: "75%",
//           margin: "20px",
//         }}
//       />
//       <TextField
//         name="discount"
//         variant="outlined"
//         label="Discount"
//         type="number"
//         onChange={(e) => {
//           setDiscount(parseInt(e.target.value) || 0);
//         }}
//         style={{
//           width: "75%",
//           margin: "20px",
//         }}
//       />
//       <TextField
//         name="pay_amount"
//         variant="outlined"
//         label="Amount to Be Paid"
//         value={t - discount}
//         style={{
//           width: "75%",
//           margin: "20px",
//         }}
//       />
//       <FormControl
//         variant="outlined"
//         label="customer"
//         style={
//           sale_type === "retail"
//             ? { display: "none" }
//             : { width: "75%", margin: "20px" }
//         }
//       >
//         <InputLabel id="customer">Customer</InputLabel>
//         <Select
//           inputProps={{ name: "customer" }}
//           label="customer"
//           id="select_customer"
//           defaultValue=""
//         >
//           {customers.length === 0
//             ? "No Customer Added"
//             : customers.map((v, i) => {
//                 return (
//                   <MenuItem
//                     value={`${v.customer_surname} ${v.customer_lastname}`}
//                     key={i}
//                   >
//                     {`${v.customer_surname} ${v.customer_lastname}`}
//                   </MenuItem>
//                 );
//               })}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }
