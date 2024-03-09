import axios from "axios";
import { API_URL } from "../common/Constants";
import authHeader from "./AuthHeader";

const getUserStats = () => {
  return axios.get(API_URL + "getUserStats", { headers: authHeader() });
};

const getModStats = () => {
  return axios.get(API_URL + "getModStats", { headers: authHeader() });
};

const getServiceInfo = (serviceId) => {
  return axios.get(API_URL + "getServiceInfo", {
    headers: authHeader(),
    params: {
      serviceId: serviceId,
    },
  });
};

const forgotPassword = (formData) => {
  return axios.post(API_URL + "auth/forgotPassword", formData, {
    headers: authHeader(),
  });
};

const resetPassword = (formData) => {
  return axios.post(API_URL + "auth/resetPassword", formData, {
    headers: authHeader(),
  });
};

const getAllNotifications = (username) => {
  return axios.get(API_URL + "getAllNotifications", {
    headers: authHeader(),
    params: {
      username: username,
    },
  });
};

const updateProfile = (updatedProfileData) => {
  return axios.post(API_URL + "updateProfile", updatedProfileData, {
    headers: authHeader(),
  });
};

const changePassword = (updatedPasswordData) => {
  return axios.post(API_URL + "changePassword", updatedPasswordData, {
    headers: authHeader(),
  });
};

// Mod API Endpoints
const getAllServicesMod = (username) => {
  return axios.get(API_URL + "getAllServicesMod", {
    headers: authHeader(),
    params: {
      username: username,
    },
  });
};

const editTrackStatusMod = (updatedTrackPoint) => {
  return axios.post(API_URL + "editTrackStatusMod", updatedTrackPoint, {
    headers: authHeader(),
  });
};

const addTrackMod = (newTrackPointData) => {
  return axios.post(API_URL + "addTrackMod", newTrackPointData, {
    headers: authHeader(),
  });
};

const addNoteMod = (newNoteData) => {
  return axios.post(API_URL + "addNoteMod", newNoteData, {
    headers: authHeader(),
  });
};

const getSubscribedChatBoxes = () => {
  return axios.get(API_URL + "getSubscribedChatBoxes", {
    headers: authHeader(),
  });
};

const getChatBox = (chatBoxId) => {
  return axios.get(API_URL + "getChatBox", {
    headers: authHeader(),
    params: { chatBoxId: chatBoxId },
  });
};

const sendMessage = (newMessageData) => {
  return axios.post(API_URL + "sendMessage", newMessageData, {
    headers: authHeader(),
  });
};

const userService = {
  getUserStats,
  getServiceInfo,
  getAllNotifications,
  updateProfile,
  changePassword,
  getAllServicesMod,
  editTrackStatusMod,
  addTrackMod,
  addNoteMod,
  getSubscribedChatBoxes,
  getChatBox,
  sendMessage,
  getModStats,
  forgotPassword,
  resetPassword,
};

export default userService;
