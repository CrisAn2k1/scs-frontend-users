import { LOAD_SUCCESS } from "../constants";

export const authReducer = (state, action) => {
    const {
        type,
        payload: {
            isAuthenticated,
            user,
            userActivity,
            isCallingCharity,
            isDonatingMaterial,
            isLoveKitchen,
            isReceiveMaterial,
        },
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
                isLoveKitchen,
                isReceiveMaterial,
            };

        default:
            return state;
    }
};
