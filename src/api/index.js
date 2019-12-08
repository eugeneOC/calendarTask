import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL
});


api.interceptors.request.use(config => {
  const token ="HxBWXDQvnEJ86lj9NF9UxHH8vFTPARWjWJUOzHU2XF6T5wwJ9gEkQoPbpMLIOTEd";
  config.url = `${config.url}?access_token=${token}`;
  return config;
});

export default api;
