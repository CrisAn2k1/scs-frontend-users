import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction.type;
};

export const updateUser = createActions({
    updateUserRequest: (payload) => payload,
    updateUserSuccess: (payload) => payload,
    updateUserFailure: (error) => error,
});

// export const updateAvatar = createActions({
//     updateAvatarRequest: (payload) => payload,
//     updateAvatarSuccess: (payload) => payload,
//     updateAvatarFailure: (error) => error,
// });
