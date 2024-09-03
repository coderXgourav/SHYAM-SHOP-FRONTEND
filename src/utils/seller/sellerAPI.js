import axios from "axios";
const token = localStorage.getItem("sellerToken");
const api_url = process.env.REACT_APP_API_URL;

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

export const sellerAddProduct = async (data) => {
  const api_url = process.env.REACT_APP_API_URL;
  try {
    const response = await axios
      .post(`${api_url}/seller/add-product`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${token}`,
        },
      })
      .then((response) => response)
      .catch((error) => error);
    return response;
  } catch (error) {
    console.log("error");
    return { status: false, title: "technical issue", icon: "error" };
  }
};

export const credentialUpdate = async (data) => {
  try {
    const response = await axios.put(`${api_url}/seller/update-credential`, {
      body: data,
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    return { status: false, title: "technical issue", icon: "error" };
  }
};

export const credentialDetails = async () => {
  try {
    const data = await axios.post(`${api_url}/seller/credential-details`, {
      headers: {
        token: token,
      },
    });
    return data.data;
  } catch (error) {
    return { status: false, title: "Token does not matched", icon: "warning" };
  }
};

export const addRequestCategory = async (data) => {
  try {
    const response = await axios.post(`${api_url}/seller/add-category`, {
      body: data,
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error :", error.message);
    return { status: false, title: "technical issue", icon: "error" };
  }
};
