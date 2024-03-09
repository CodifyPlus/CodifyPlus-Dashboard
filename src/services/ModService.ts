import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../common/Constants";

const getUserStats = () => {
  return axios.get(API_URL + "getUserStats", { headers: authHeader() })
}

const getModStats = () => {
  return axios.get(API_URL + "getModStats", { headers: authHeader() })
}

const getAdminStats = () => {
  return axios.get(API_URL + "getAdminStats", { headers: authHeader() })
}

const getServiceInfo = (serviceId) => {
  return axios.get(API_URL + "getServiceInfo", {
    headers: authHeader(), params: {
      serviceId: serviceId
    }
  })
}

const getTemplateInfo = (templateId) => {
  return axios.get(API_URL + "getTemplateInfo", {
    headers: authHeader(), params: {
      templateId: templateId
    }
  })
}

const getAllUsers = (params) => {
  return axios.get(API_URL + "getAllUsers", { headers: authHeader(), params: params })
}

const getAllTemplates = () => {
  return axios.get(API_URL + "getAllTemplates", { headers: authHeader() })
}

const changeUserRole = (newRoleAndId) => {
  return axios.post(API_URL + "changeUserRole", newRoleAndId, { headers: authHeader() })
}

const addNewUser = (newUserData) => {
  return axios.post(API_URL + "addNewUser", newUserData, { headers: authHeader() })
}

const forgotPassword = (formData) => {
  return axios.post(API_URL + "auth/forgotPassword", formData, { headers: authHeader() })
}

const resetPassword = (formData) => {
  return axios.post(API_URL + "auth/resetPassword", formData, { headers: authHeader() })
}

const getAllServices = (params) => {
  return axios.get(API_URL + "getAllServices", { headers: authHeader(), params: params })
}

const getAllUsernames = () => {
  return axios.get(API_URL + "getAllUsernames", { headers: authHeader() })
}

const getTemplateNames = () => {
  return axios.get(API_URL + "getTemplateNames", { headers: authHeader() })
}

const getTotalRevenueByService = () => {
  return axios.get(API_URL + "getTotalRevenueByService", { headers: authHeader() })
}

const getServicesSoldData = () => {
  return axios.get(API_URL + "getServicesSoldData", { headers: authHeader() })
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

const addTemplate = (newTemplateData) => {
  return axios.post(API_URL + "addTemplate", newTemplateData, { headers: authHeader() })
}

const editServiceDetails = (formData) => {
  return axios.post(API_URL + "editServiceDetails", formData, { headers: authHeader() })
}

const addTrack = (newTrackPointData) => {
  return axios.post(API_URL + "addTrack", newTrackPointData, { headers: authHeader() })
}

const addTemplateTrack = (newTrackPointData) => {
  return axios.post(API_URL + "addTemplateTrack", newTrackPointData, { headers: authHeader() })
}

const editTrack = (newTrackPointData) => {
  return axios.post(API_URL + "editTrack", newTrackPointData, { headers: authHeader() })
}

const editTrackStatus = (updatedTrackPoint) => {
  return axios.post(API_URL + "editTrackStatus", updatedTrackPoint, { headers: authHeader() })
}

const markAsCompleted = (updatedService) => {
  return axios.post(API_URL + "markAsCompleted", updatedService, { headers: authHeader() })
}

const markOnHold = (updatedService) => {
  return axios.post(API_URL + "markOnHold", updatedService, { headers: authHeader() })
}

const deleteUser = (userId) => {
  return axios.post(API_URL + "deleteUser", userId, { headers: authHeader() })
}

const deleteService = (serviceId) => {
  return axios.post(API_URL + "deleteService", serviceId, { headers: authHeader() })
}

const deleteTemplate = (templateId) => {
  return axios.post(API_URL + "deleteTemplate", templateId, { headers: authHeader() })
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

const sendNoteEmail = (updateNoteData) => {
  return axios.post(API_URL + "sendNoteEmail", updateNoteData, { headers: authHeader() })
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

const getSubscribedChatBoxes = () => {
  return axios.get(API_URL + "getSubscribedChatBoxes", { headers: authHeader() })
}

const adminGetSubscribedChatBoxes = () => {
  return axios.get(API_URL + "admin/getSubscribedChatBoxes", { headers: authHeader() })
}

const getChatBox = (chatBoxId) => {
  return axios.get(API_URL + "getChatBox", { headers: authHeader(), params: { chatBoxId: chatBoxId } })
}

const sendMessage = (newMessageData) => {
  return axios.post(API_URL + "sendMessage", newMessageData, { headers: authHeader() })
}

const toggleTimelineDatesVisibility = (updatedService) => {
  return axios.post(API_URL + "toggleTimelineDatesVisibility", updatedService, { headers: authHeader() })
}
const getUserStatsForAdmin = (userId) => {
  return axios.get(API_URL + "getUserStatsForAdmin", { headers: authHeader(), params: { userId: userId } })
}

const exportUsers = () => {
  return axios.get(API_URL + "exportUsers", { headers: authHeader() })
}

const exportServices = () => {
  return axios.get(API_URL + "exportServices", { headers: authHeader() })
}

const exportChats = () => {
  return axios.get(API_URL + "exportChats", { headers: authHeader() })
}

const modService = {
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
  markOnHold,
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
  getSubscribedChatBoxes,
  getChatBox,
  sendMessage,
  adminGetSubscribedChatBoxes,
  getModStats,
  getAdminStats,
  toggleTimelineDatesVisibility,
  sendNoteEmail,
  getUserStatsForAdmin,
  editServiceDetails,
  editTrack,
  exportUsers,
  exportChats,
  exportServices,
  getAllTemplates,
  addTemplate,
  getTemplateInfo,
  addTemplateTrack,
  getTemplateNames,
  getTotalRevenueByService,
  getServicesSoldData,
  forgotPassword,
  resetPassword,
  deleteTemplate,
};

export default modService