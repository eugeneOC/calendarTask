import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL
});


api.interceptors.request.use(config => {
  const token ="bVuqKL8TxAOfXLre2urhppXXXDDp2Gvt2oFiFOUJwLh3d6y0G3IU8RCBPVDhKUAg";
  config.url = `${config.url}?access_token=${token}`;
  return config;
});

export default api;
