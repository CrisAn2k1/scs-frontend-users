import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction.type;
};

export const getEvents = createActions({
    getEventsRequest: (payload) => payload,
    getEventsSuccess: (payload) => payload,
    getEventsFailure: (error) => error,
});
