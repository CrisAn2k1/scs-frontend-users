import { createAction } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction.type;
};

export const showModal = createAction("SHOW_MODAL");
export const hideModal = createAction("HIDE_MODAL");

export const showToast = createAction("SHOW_TOAST");
export const hideToast = createAction("HIDE_TOAST");

export const setCurrentId = createAction("SET_CURRENT_ID");
