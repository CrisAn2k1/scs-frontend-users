import { call, put } from "redux-saga/effects";
import * as api from "../../api";
import { showToast } from "../actions";
import { updateUser } from "../actions/user-profile";

export function* updateUserSaga(action) {
    try {
        const response = yield call(api.updateUser, action.payload);
        console.log(response);
        yield put(
            showToast({
                message: response.data.data ? "Cập nhật thành công!" : "Lỗi máy chủ",
                type: response.data.data ? "success" : "error",
            }),
        );
    } catch (error) {
        // console.log(error);
        yield put(
            showToast({
                message: error.response.data.message ? error.response.data.message : "Lỗi máy chủ",
                type: error.response.data.success ? "error" : "error",
            }),
        );
        // console.log(error.response);
        //yield put(error.response);
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
