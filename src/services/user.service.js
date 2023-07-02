import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../common/Constants";

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

const getAllUsernames = () => {
  return axios.get(API_URL + "getAllUsernames", { headers: authHeader() })
}

const getAllModerators = () => {
  return axios.get(API_URL + "getAllModerators", { headers: authHeader() })
}

const addNewService = (newServiceData) => {
  return axios.post(API_URL + "addNewService", newServiceData, { headers: authHeader() })
}

const addNote = (newNoteData) => {
  return axios.post(API_URL + "addNote", newNoteData, { headers: authHeader() })
}

const addTrack = (newTrackPointData) => {
  return axios.post(API_URL + "addTrack", newTrackPointData, { headers: authHeader() })
}

const editTrackStatus = (updatedTrackPoint) => {
  return axios.post(API_URL + "editTrackStatus", updatedTrackPoint, { headers: authHeader() })
}

const markAsCompleted = (updatedService) => {
  return axios.post(API_URL + "markAsCompleted", updatedService, { headers: authHeader() })
}

const deleteUser = (userId) => {
  return axios.post(API_URL + "deleteUser", userId, { headers: authHeader() })
}
const deleteService = (serviceId) => {
  return axios.post(API_URL + "deleteService", serviceId, { headers: authHeader() })
}

const getAllNotifications = (username) => {
  return axios.get(API_URL + "getAllNotifications", {
    headers: authHeader(), params: {
      username: username
    }
  })
}

const sendNotification = (newNotificationData) => {
  return axios.post(API_URL + "sendNotification", newNotificationData, { headers: authHeader() })
}

const deleteNotification = (notificationData) => {
  return axios.post(API_URL + "deleteNotification", notificationData, { headers: authHeader() })
}

const updateProfile = (updatedProfileData) => {
  return axios.post(API_URL + "updateProfile", updatedProfileData, { headers: authHeader() })
}

const changePassword = (updatedPasswordData) => {
  return axios.post(API_URL + "changePassword", updatedPasswordData, { headers: authHeader() })
}

const approveTrack = (updatedTrackPoint) => {
  return axios.post(API_URL + "approveTrack", updatedTrackPoint, { headers: authHeader() })
}

const approveNote = (updateNoteData) => {
  return axios.post(API_URL + "approveNote", updateNoteData, { headers: authHeader() })
}

// Mod API Endpoints
const getAllServicesMod = (username) => {
  return axios.get(API_URL + "getAllServicesMod", {
    headers: authHeader(), params: {
      username: username
    }
  })
}

const editTrackStatusMod = (updatedTrackPoint) => {
  return axios.post(API_URL + "editTrackStatusMod", updatedTrackPoint, { headers: authHeader() })
}

const addTrackMod = (newTrackPointData) => {
  return axios.post(API_URL + "addTrackMod", newTrackPointData, { headers: authHeader() })
}

const addNoteMod = (newNoteData) => {
  return axios.post(API_URL + "addNoteMod", newNoteData, { headers: authHeader() })
}

const userService = {
  getUserStats,
  getServiceInfo,
  getAllUsers,
  changeUserRole,
  addNewUser,
  getAllServices,
  getAllUsernames,
  getAllModerators,
  addNewService,
  addNote,
  addTrack,
  editTrackStatus,
  markAsCompleted,
  deleteService,
  deleteUser,
  getAllNotifications,
  sendNotification,
  deleteNotification,
  updateProfile,
  changePassword,
  getAllServicesMod,
  editTrackStatusMod,
  addTrackMod,
  approveTrack,
  addNoteMod,
  approveNote,
};

export default userService