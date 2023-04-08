import axios from "axios";
export const apiURL = "http://localhost:3000";
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:5050'
//     : 'https://yum-yum-backend.onrender.com';

export const getEvents = (payload) => axios.get(`${apiURL}/events`, payload);
