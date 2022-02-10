import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../app.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";
import Dashboard from "../Routes/admin/Dashboard";
import NewProduct from "../Routes/admin/NewProduct";
import NewSupplier from "../Routes/admin/NewSupplier";
import NewCustomer from "../Routes/admin/NewCustomer";
import NewUser from "../Routes/admin/NewUser";
import NewSale from "../Routes/admin/Newsale";
import NewPurchase from "../Routes/admin/new_purchase";
import Product from "../Routes/admin/product";
import Edit from "../Routes/admin/editProduct";
import NotFound from "../components/404";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/new-supplier" element={<NewSupplier />} />
          <Route path="/new-customer" element={<NewCustomer />} />
          <Route path="/new-user" element={<NewUser />} />
          <Route path="/new-purchase" element={<NewPurchase />} />
          <Route path="/new-sale" element={<NewSale />} />
          <Route path="/product" element={<Product />} />
          <Route path="/edit-product" element={<Edit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Admin;
