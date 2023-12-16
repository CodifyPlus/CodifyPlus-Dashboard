import axios from "axios";
import { API_URL } from "../common/Constants";

const register = (fullname, username, email, password) => {
  return axios.post(API_URL + "auth/signup", {
    fullname,
    username,
    email,
    password,
  });
};

const login = (username, password, player_id) => {
  return axios
    .post(API_URL + "auth/signin", {
      username,
      password,
      player_id
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
