import { updateUser, getType } from "../actions/user-profile";
import { INIT_STATE } from "./state";

export default function usersReducers(state = INIT_STATE.user, action) {
    const { type, payload } = action;

    switch (type) {
        // case getType(getUser.getUserRequest()):
        //     return {
        //         ...state,
        //         loading: true,
        //     };

        // case getType(getUser.getUserSuccess()):
        //     return {
        //         ...state,
        //         loading: false,
        //         data: payload,
        //     };

        // case getType(getUser.getUserFailure()):
        //     return {
        //         ...state,
        //         loading: false,
        //     };

        // case getType(createCustomer.createCustomerSuccess()):
        //   return {
        //     ...state,
        //     loading: false,
        //     data: [...state.data, payload],
        //   };

        // case getType(createCustomer.createCustomerFailure()):
        //   return {
        //     ...state,
        //     loading: false,
        //   };

        case getType(updateUser.updateUserSuccess()):
            return {
                ...state,
                loading: true,
                data: payload,
            };

        case getType(updateUser.updateUserFailure()):
            return {
                ...state,
                loading: false,
            };

        // case getType(deleteCustomer.deleteCustomerSuccess()):
        //   return {
        //     ...state,
        //     loading: false,
        //     data: state.data.filter((post) => post.id !== payload.id),
        //   };

        // case getType(deleteCustomer.deleteCustomerFailure()):
        //   return {
        //     ...state,
        //     loading: false,
        //   };

        default:
            return state;
    }
}
