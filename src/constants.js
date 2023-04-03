export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:3000"
        : "https://yum-yum-backend.onrender.com";
// export const apiNotificationUrl =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:5051'
//     : 'https://yum-yum-notification.onrender.com';
// export const yumBlogUrl =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:3001'
//     : 'https://yum-yum-blog.vercel.app';
// export const yumChatUrl =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:3002'
//     : 'https://yum-yum-chat.netlify.app';
export const LOCAL_STORAGE_TOKEN_NAME = "token";
export const LOAD_SUCCESS = "LOAD_SUCCESS";
// export const LOCAL_STORAGE_CART_NAME = "cart";

// export const NotificationTypeImageEnum = {
//     AUTH: "img/notifications/authentication-29.png",
//     ORDER_SUCCESS: "img/notifications/order-status-success.png",
//     ORDER_PAYMENT_SUCCESS: "img/notifications/payment-12.png",
//     ORDER_CANCELED: "img/notifications/cancel-46.png",
//     ORDER_DELIVERED: "img/notifications/delivery-6.png",
//     COIN_RECEIVED: "img/notifications/gold-coin-5.png",
//     REPLY_COMMENT: "img/notifications/comment-25.png",
//     ADVERTISE: "img/notifications/",
//     NEW_BLOG: "img/notifications/",
// };
// export const NotificationTypeLinkEnum = {
//     AUTH: "/personal-info",
//     ORDER_SUCCESS: "/orders-history",
//     ORDER_PAYMENT_SUCCESS: "/orders-history",
//     ORDER_CANCELED: "/orders-history",
//     ORDER_DELIVERED: "/orders-history",
//     COIN_RECEIVED: "/personal-info",
//     REPLY_COMMENT: "#",
//     ADVERTISE: "#",
//     NEW_BLOG: "#",
// };

// export const OrderDeliveryMethodEnum = {
//     GHN: "GHN",
//     YUM_YUM_EXPRESS: "YUM_YUM_EXPRESS",
// };
