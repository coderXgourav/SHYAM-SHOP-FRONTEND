import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
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
    const response = await fetch(`${api_url}/admin/delete-blog/${id}`, {
      method: "DELETE",
      body: { id: id },
      headers: {
        authorization: token,
      },
    });
    return await response.json();
  } catch (error) {
    return { status: false, title: error.message, icon: "error" };
  }
};

export const fetchSingleBlog = async (id) => {
  const result = await fetch(`${api_url}/admin/get-blog/${id}`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  });
  try {
    return await result.json();
  } catch (error) {
    return { status: false, title: "technical issue", icon: "error" };
  }
};

export const blogUpdate = async (data) => {
  console.log(data);
  try {
    const response = await axios.put(`${api_url}/admin/update-blog`, data, {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return { status: false, title: error.message, icon: "error" };
  }
};
export const blogImageUpdate = async (image, blogId) => {
  if (image === null) {
    return { status: false, title: "Please choose image first", icon: "error" };
  }
  try {
    const response = await axios.put(
      `${api_url}/admin/update-blog-image`,
      { image, blogId },
      {
        headers: {
          authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return { status: false, title: error.message, icon: "error" };
  }
};

export const getBlogData = async (id) => {
  const result = await fetch(`${api_url}/admin/get-blog/${id}`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  });
  try {
    return await result.json();
  } catch (error) {
    return { status: false, title: "technical issue", icon: "error" };
  }
};

export const subCategoryDelete = async (id) => {
  try {
    const result = await axios.delete(
      `${api_url}/admin/delete-subcategory/${id}`,
      {
        headers: {
          Authorization: Cookies.get("adminToken"),
        },
      }
    );
    return result.data;
  } catch (error) {
    return { status: false, title: "technical issue", icon: "error" };
  }
};
