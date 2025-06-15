import axios from "axios";
export const call = async (method, url, params = {}, data = {}) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  data = { ...data };

  const result = await axios({
    method,
    url: `${process.env.REACT_APP_API_URL}/api/v1${url}`,
    params,
    data: { ...data },
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    responseType: "json",
  });

  return result;
};
