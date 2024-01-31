import axios from "axios";

const axiosUtil = async (endPoint, method, data, header, params) => {
  try {
    const response = await axios({
      method,
      url: endPoint,
      data,
      headers: header,
      params: params,
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export default axiosUtil;
