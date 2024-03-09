import axios from "axios";
import { API_URL } from "../common/Constants";
import authHeader from "./AuthHeader";

const getModStats = () => {
  return axios.get(API_URL + "getModStats", { headers: authHeader() });
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

export {
  getAllServicesMod,
  editTrackStatusMod,
  addTrackMod,
  addNoteMod,
  getModStats,
};
