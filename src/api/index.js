import axios from "axios";
export const apiURL = "http://localhost:3000";
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:5050'
//     : 'https://yum-yum-backend.onrender.com';

export const getEvents = (payload) => axios.post(`${apiURL}/events/search`, payload);
// export const getPosts = (payload) => axios.post(`${apiURL}/posts/search`, payload);
export const getPosts = () =>
    axios.post(`${apiURL}/posts/search`, {
        include: { event: { include: { charityCall: true } } },
    });
export const getPostDetail = (payload) => axios.post(`${apiURL}/posts/${payload}`);
