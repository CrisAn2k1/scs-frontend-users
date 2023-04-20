import { combineReducers } from "redux";
// import admins from "./admins";
// import categories from "./categories";
// import comments from "./comments";
// import currentId from "./constants/currentId";
// import modal from "./constants/modal";
// import toast from "./constants/toast";
// import customers from "./customers";
// import orders from "./orders";
import events from "./events";
import posts from "./posts";
// import suppliers from "./suppliers";
// import warehouses from "./warehouses";

export default combineReducers({
    events,
    posts,
    // warehouses,
    // modal,
    // toast,
    // currentId,
    // suppliers,
    // products,
    // customers,
    // comments,
    // orders,
    // admins,
});
