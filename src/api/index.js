import axios from "axios";
export const apiURL =
    process.env.NODE_ENV !== "production"
        ? // ? "http://192.168.1.145:3000"
          "http://localhost:3000"
        : "https://scs-backend-wvbu.onrender.com";

export const getEvents = (payload) =>
    axios.post(`${apiURL}/events/search`, {
        where: {
            isActive: true,
        },
        include: {
            charityCall: {
                include: { user: { select: { fullName: true, address: true } } },
            },
            moneyDonations: true,
        },
        orderBy: { createdAt: "desc" },
    });
// export const getPosts = (payload) => axios.post(`${apiURL}/posts/search`, payload);
export const getEventDetail = (payload) =>
    axios.post(`${apiURL}/events/${payload}`, {
        include: {
            posts: true,
            moneyDonations: { include: { user: true }, orderBy: { createdAt: "desc" } },
            charityCall: { include: { user: true } },
        },
    });

export const getPosts = () =>
    axios.post(`${apiURL}/posts/search`, {
        include: { event: { include: { charityCall: true } } },
    });
export const getPostDetail = (payload) =>
    axios.post(`${apiURL}/posts/${payload}`, { include: { event: true } });
export const updateUser = (payload) => axios.patch(`${apiURL}/auth/profiles`, payload);
