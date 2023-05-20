import { LOAD_SUCCESS } from "../constants";

export const authReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, user, userActivity, isCallingCharity, isDonatingMaterial },
    } = action;

    switch (type) {
        case LOAD_SUCCESS:
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
                userActivity,
                isCallingCharity,
                isDonatingMaterial,
            };

        default:
            return state;
    }
};
