import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const createEvent = async (data) => {
  const res = await api.post("/create-event", data);
  return res.data;
};

export const getEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

export const increaseView = async (id) => {
  const res = await api.post(`/event/${id}/view`);
  return res.data;
};

export const markComing = async (id) => {
  const res = await api.post(`/event/${id}/coming`);
  return res.data;
};