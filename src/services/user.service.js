import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getUserStats = () => {
  return axios.get(API_URL + "getUserStats", { headers: authHeader() })
}

const getServiceInfo = (serviceId) => {
  return axios.get(API_URL + "getServiceInfo", {
    headers: authHeader(), params: {
      serviceId: serviceId
    }
  })
}

const getAllUsers = () => {
  return axios.get(API_URL + "getAllUsers", { headers: authHeader() })
}

const changeUserRole = (newRoleAndId) => {
  return axios.post(API_URL + "changeUserRole", newRoleAndId, { headers: authHeader() })
}

const addNewUser = (newUserData) => {
  return axios.post(API_URL + "addNewUser", newUserData, { headers: authHeader() })
}

const getAllServices = () => {
  return axios.get(API_URL + "getAllServices", { headers: authHeader() })
}

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUserStats,
  getServiceInfo,
  getAllUsers,
  changeUserRole,
  addNewUser,
  getAllServices
};

export default userService