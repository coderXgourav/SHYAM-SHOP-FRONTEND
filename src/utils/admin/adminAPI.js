import axios from "axios";
import Cookies from "js-cookie";
const api_url = process.env.REACT_APP_API_URL;
const token = Cookies.get("adminToken");

export const blogUpload = async (data) => {
  try {
    const response = await axios.post(`${api_url}/admin/save-blog`, data, {
      headers: {
        authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return { status: false, title: error.message, icon: "error" };
  }
};

export const getBlogs = async () => {
  try {
    const data = await fetch(`${api_url}/admin/get-blogs`, {
      method: "GET",
      headers: {
        authorization: Cookies.get("adminToken"),
      },
    });
    const blogData = await data.json();
    return blogData;
  } catch (error) {
    console.log("error");
    return { status: false, title: "Internal Error", icon: "error" };
  }
};

export const callDeleteBlog = async (id) => {
  try {
    console.log(id);
  } catch (error) {
    return error.message;
  }
};
