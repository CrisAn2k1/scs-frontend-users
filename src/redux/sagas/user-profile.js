import { call, put } from "redux-saga/effects";
import * as api from "../../api";
import { showToast } from "../actions";

export function* updateUserSaga(action) {
    try {
        const response = yield call(api.updateUser, action.payload);
        yield put(
            showToast({
                message: response.data.message ? response.data.message : "Lỗi máy chủ",
                type: response.data.success ? "success" : "error",
            }),
        );
    } catch (error) {
        console.log(error);
        yield put(
            showToast({
                message: error.response.data.message ? error.response.data.message : "Lỗi máy chủ",
                type: error.response.data.success ? "error" : "error",
            }),
        );
    }
}

// export function* updateAvatarSaga(action) {
//     try {
//         const response = yield call(api.updateAvatar, action.payload);
//         yield put(
//             showToast({
//                 message: response.data.message ? response.data.message : "Lỗi máy chủ",
//                 type: response.data.success ? "success" : "error",
//             }),
//         );
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response.data.message ? error.response.data.message : "Lỗi máy chủ",
//                 type: error.response.data.success ? "error" : "error",
//             }),
//         );
//     }
// }
