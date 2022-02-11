import React, { Component } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/api";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AnchorEl: null,
      AnchorElDrugs: null,
      products: [],
      sales_number_daily: "...",
      sales_number_monthly: "...",
      expiry_products: [],
      less_qty_pdts: [],
    };
    this.products();
    this.sales();
    this.expiry_products();
    this.less_qty();
  }

  expiry_products = async () => {
    const res = (await UsersApi.data("/user/all/batch/expiry")) || [];
    if (res) {
      this.setState({
        ...this.state,
        expiry_products: res !== "Error" ? res : [],
      });
    }
  };
  less_qty = async () => {
    const res = (await UsersApi.data("/user/all/less_qty")) || [];
    if (res) {
      this.setState({
        ...this.state,
        less_qty_pdts: res !== "Error" ? res : [],
      });
    }
  };

  async products() {
    const res = (await UsersApi.data("/user/all/products")) || [];
    if (res) {
      this.setState({ ...this.state, products: res === "Error" ? [] : res });
    }
  }

  async sales() {
    const res = (await UsersApi.data("/user/all/sales")) || [];
    let sales_daily = 0;
    let sales_monthly = 0;
    res === "Error"
      ? this.setState({
          ...this.state,
          sales_number_monthly: 0,
          sales_number_daily: 0,
        })
      : res.forEach((e) => {
          if (
            new Date(parseInt(e.sales_date)).getDate() ===
            new Date(Date.now()).getDate()
          ) {
            sales_daily++;
          }
          if (
            new Date(parseInt(e.sales_date)).getMonth() ===
            new Date(Date.now()).getMonth()
          ) {
            sales_monthly++;
          }
        });
    this.setState({
      ...this.state,
      sales_number_monthly: sales_monthly,
      sales_number_daily: sales_daily,
    });
  }

  handleOpenActions = (e) => {
    this.setState({ ...this.state, AnchorEl: e.currentTarget });
  };
  handleOpenActionsDrugs = (e) => {
    this.setState({ ...this.state, AnchorElDrugs: e.currentTarget });
  };
  handleCloseActions = () => {
    this.setState({ ...this.state, AnchorEl: null });
  };
  handleCloseActionsDrugs = () => {
    this.setState({ ...this.state, AnchorElDrugs: null });
  };

  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="dashboard" />
        <div className="main-content">
          <Header />
          <main>
            <div className="cards">
              <div className="card-single">
                <div className="">
                  <h3>{this.state.expiry_products.length}</h3>
                  <span>
                    Teachers <br />
                    <span style={{ fontSize: "13px" }}>
                      Registered in System
                    </span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h3>{this.state.sales_number_monthly}</h3>
                  <span>Course Units</span>
                  <br />
                  <span style={{ fontSize: "13px" }}>Being Taught</span>
                </div>
                <div className="">
                  <span className="las la-users"></span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h3>{this.state.sales_number_daily}</h3>
                  <span>Rooms</span>
                  <br />
                  <span style={{ fontSize: "13px" }}>Available</span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h3>{this.state.products.length}</h3>
                  <span>Classes</span>
                  <br />
                  <span style={{ fontSize: "13px" }}>In the System</span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
            </div>
            <div className="recent-grid">
              <div className="timetable-for-all">timetable</div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default Dashboard;
