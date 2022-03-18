import axios from "axios";

const url = "http://localhost:3030/api";
// const url = "https://freedomhealth.herokuapp.com/api";

export default class FormsApi {
  async post(i, data) {
    try {
      const res = await axios.post(`${url}${i}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }
  async get(i) {
    try {
      const res = await axios.get(`${url}${i}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }
  async put(i) {
    try {
      return await axios.put(`${url}${i}`);
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }
  async delete(i) {
    try {
      return await axios.delete(`${url}${i}`);
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }
}
