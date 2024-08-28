import axios from "axios";

export const SellerSignup = async (data) => {
  const api_url = process.env.REACT_APP_API_URL;
  try {
    const response = await axios.post(`${api_url}/seller/register`, { data });
    if (response.data.status) {
      localStorage.setItem("sellerToken", response.headers["authorization"]);
    }
    return response.data;
  } catch (error) {
    return { status: false, title: "something wrong", icon: "error" };
  }
};

export const sellerLogin = async (data) => {
  const api_url = process.env.REACT_APP_API_URL;
  try {
    const response = await axios.post(`${api_url}/seller/login`, { data });
    if (response.data.status) {
      localStorage.setItem("sellerToken", response.headers["authorization"]);
    }
    return response.data;
  } catch (error) {
    return { status: false, title: "Something wrong", icon: "error" };
  }
};
