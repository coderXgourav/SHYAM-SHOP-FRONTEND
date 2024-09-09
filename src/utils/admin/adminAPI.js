import Cookies from "js-cookie";
const api_url = process.env.REACT_APP_API_URL;
// const token =
export const blogUpload = (data) => {
  const apiCall = fetch(`${api_url}/admin/save-blog`, {
    method: "POST",
  })
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(error.message);
    });
};
