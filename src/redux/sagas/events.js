import { call, put } from "redux-saga/effects";
import * as api from "../../api";
import { showToast } from "../actions";
import {
    // addProductImage,
    // createProduct,
    // deleteProduct,
    // deleteProductImage,
    // getLatestProducts,
    getEventDetail,
    getEvents,
    // getRelatedProducts,
    // getTopDiscountProducts,
    // getTopRatingProducts,
    // updateProduct,
} from "../actions/events";

export function* getEventsSaga(action) {
    try {
        const response = yield call(api.getEvents, action.payload);
        yield put(getEvents.getEventsSuccess(response?.data.data));
    } catch (error) {
        console.log(error);
        yield put(
            showToast({
                message: error.response?.data.message
                    ? error.response?.data.message
                    : "Lỗi máy chủ",
                type: error.response?.data.success ? "error" : "error",
            }),
        );
        yield put(getEvents.getEventsFailure(error.response?.data));
    }
}

export function* getEventDetailSaga(action) {
    try {
        const response = yield call(api.getEventDetail, action.payload);
        yield put(getEventDetail.getEventDetailSuccess(response.data.data));
    } catch (error) {
        console.log(error);
        yield put(
            showToast({
                message: error.response.data.message ? error.response.data.message : "Lỗi máy chủ",
                type: error.response.data.success ? "error" : "error",
            }),
        );
        yield put(getEventDetail.getEventDetailFailure(error.response.data));
    }
}
// export function* createProductSaga(action) {
//     try {
//         const response = yield call(api.createProduct, action.payload);
//         yield put(createProduct.createProductSuccess(response?.data.product));
//         yield put(hideModal());
//         yield put(setCurrentId(0));
//         yield put(
//             showToast({
//                 message: response?.data.message ? response?.data.message : "Lỗi máy chủ",
//                 type: response?.data.success ? "success" : "error",
//             }),
//         );
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response?.data.message
//                     ? error.response?.data.message
//                     : "Lỗi máy chủ",
//                 type: error.response?.data.success ? "error" : "error",
//             }),
//         );
//         yield put(createProduct.createProductFailure(error.response?.data));
//     }
// }

// export function* updateProductSaga(action) {
//     try {
//         const response = yield call(api.updateProduct, action.payload);
//         yield put(updateProduct.updateProductSuccess(response?.data.product));
//         yield put(hideModal());
//         yield put(setCurrentId(0));
//         yield put(
//             showToast({
//                 message: response?.data.message ? response?.data.message : "Lỗi máy chủ",
//                 type: response?.data.success ? "success" : "error",
//             }),
//         );
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response?.data.message
//                     ? error.response?.data.message
//                     : "Lỗi máy chủ",
//                 type: error.response?.data.success ? "error" : "error",
//             }),
//         );
//         yield put(updateProduct.updateProductFailure(error.response?.data));
//     }
// }

// export function* deleteProductSaga(action) {
//     try {
//         const response = yield call(api.deleteProduct, action.payload);
//         yield put(deleteProduct.deleteProductSuccess(response?.data.product));
//         yield put(hideModal());
//         yield put(setCurrentId(0));
//         yield put(
//             showToast({
//                 message: response?.data.message ? response?.data.message : "Lỗi máy chủ",
//                 type: response?.data.success ? "success" : "error",
//             }),
//         );
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response?.data.message
//                     ? error.response?.data.message
//                     : "Lỗi máy chủ",
//                 type: error.response?.data.success ? "error" : "error",
//             }),
//         );
//         yield put(deleteProduct.deleteProductFailure(error.response?.data));
//     }
// }

// export function* addProductImageSaga(action) {
//     try {
//         const response = yield call(api.addProductImage, action.payload);
//         yield put(addProductImage.addProductImageSuccess(response?.data.product));
//         yield put(hideModal());
//         yield put(setCurrentId(0));
//         yield put(
//             showToast({
//                 message: response?.data.message ? response?.data.message : "Lỗi máy chủ",
//                 type: response?.data.success ? "success" : "error",
//             }),
//         );
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response?.data.message
//                     ? error.response?.data.message
//                     : "Lỗi máy chủ",
//                 type: error.response?.data.success ? "error" : "error",
//             }),
//         );
//         yield put(addProductImage.addProductImageFailure(error.response?.data));
//     }
// }

// export function* deleteProductImageSaga(action) {
//     try {
//         const response = yield call(api.deleteProductImage, action.payload);
//         yield put(deleteProductImage.deleteProductImageSuccess(response?.data.product));
//         yield put(hideModal());
//         yield put(setCurrentId(0));
//         yield put(
//             showToast({
//                 message: response?.data.message ? response?.data.message : "Lỗi máy chủ",
//                 type: response?.data.success ? "success" : "error",
//             }),
//         );
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response?.data.message
//                     ? error.response?.data.message
//                     : "Lỗi máy chủ",
//                 type: error.response?.data.success ? "error" : "error",
//             }),
//         );
//         yield put(deleteProductImage.deleteProductImageFailure(error.response?.data));
//     }
// }

// export function* getLatestProductsSaga(action) {
//     try {
//         const response = yield call(api.getLatestProducts, action.payload);
//         yield put(getLatestProducts.getLatestProductsSuccess(response.data.products));
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response.data.message ? error.response.data.message : "Lỗi máy chủ",
//                 type: error.response.data.success ? "error" : "error",
//             }),
//         );
//         yield put(getLatestProducts.getLatestProductsFailure(error.response.data));
//     }
// }

// export function* getTopRatingProductsSaga(action) {
//     try {
//         const response = yield call(api.getTopRatingProducts, action.payload);
//         yield put(getTopRatingProducts.getTopRatingProductsSuccess(response.data.products));
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response.data.message ? error.response.data.message : "Lỗi máy chủ",
//                 type: error.response.data.success ? "error" : "error",
//             }),
//         );
//         yield put(getTopRatingProducts.getTopRatingProductsFailure(error.response.data));
//     }
// }

// export function* getTopDiscountProductsSaga(action) {
//     try {
//         const response = yield call(api.getTopDiscountProducts, action.payload);
//         yield put(getTopDiscountProducts.getTopDiscountProductsSuccess(response.data.products));
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response.data.message ? error.response.data.message : "Lỗi máy chủ",
//                 type: error.response.data.success ? "error" : "error",
//             }),
//         );
//         yield put(getTopDiscountProducts.getTopDiscountProductsFailure(error.response.data));
//     }
// }

// export function* getRelatedProductsSaga(action) {
//     try {
//         const response = yield call(api.getRelatedProducts, action.payload);
//         yield put(getRelatedProducts.getRelatedProductsSuccess(response.data.products));
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response?.data.message
//                     ? error.response?.data.message
//                     : "Lỗi máy chủ",
//                 type: error.response?.data.success ? "error" : "error",
//             }),
//         );
//         yield put(getRelatedProducts.getRelatedProductsFailure(error.response?.data));
//     }
// }

// export function* getProductDetailSaga(action) {
//     try {
//         const response = yield call(api.getProductDetail, action.payload);
//         yield put(getProductDetail.getProductDetailSuccess(response.data.product));
//     } catch (error) {
//         console.log(error);
//         yield put(
//             showToast({
//                 message: error.response.data.message ? error.response.data.message : "Lỗi máy chủ",
//                 type: error.response.data.success ? "error" : "error",
//             }),
//         );
//         yield put(getProductDetail.getProductDetailFailure(error.response.data));
//     }
// }
