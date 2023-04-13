import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction.type;
};

export const getPosts = createActions({
    getPostsRequest: (payload) => payload,
    getPostsSuccess: (payload) => payload,
    getPostsFailure: (error) => error,
});
export const getPostDetail = createActions({
    getPostDetailRequest: (payload) => payload,
    getPostDetailSuccess: (payload) => payload,
    getPostDetailFailure: (error) => error,
});
