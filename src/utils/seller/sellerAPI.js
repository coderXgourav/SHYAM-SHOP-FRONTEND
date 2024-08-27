import axios from "axios";

export const SellerSignup = (data) => {
  const api_url = process.env.REACT_APP_API_URL;

  const result = axios.post(`${api_url}/seller/register`, { data });
};
