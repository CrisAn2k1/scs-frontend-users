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
    getType,
    // updateProduct,
} from "../actions/events";
import { INIT_STATE } from "./state";

export default function eventsReducers(state = INIT_STATE.events, action) {
    const { type, payload } = action;

    switch (type) {
        case getType(getEvents.getEventsRequest()):
            return {
                ...state,
                loading: true,
            };

        case getType(getEvents.getEventsSuccess()):
            return {
                ...state,
                loading: false,
                data: payload,
            };

        case getType(getEvents.getEventsFailure()):
            return {
                ...state,
                loading: false,
            };
        case getType(getEventDetail.getEventDetailSuccess()):
            return {
                ...state,
                loading: true,
                singleEventDetail: payload,
            };
        //   case getType(createProduct.createProductSuccess()):
        //     return {
        //       ...state,
        //       loading: false,
        //       data: [...state.data, payload],
        //     };

        //   case getType(createProduct.createProductFailure()):
        //     return {
        //       ...state,
        //       loading: false,
        //     };

        //   case getType(updateProduct.updateProductSuccess()):
        //     return {
        //       ...state,
        //       loading: false,
        //       data: state.data.map((product) =>
        //         product.id === payload.id ? payload : product
        //       ),
        //     };

        //   case getType(updateProduct.updateProductFailure()):
        //     return {
        //       ...state,
        //       loading: false,
        //     };

        //   case getType(deleteProduct.deleteProductSuccess()):
        //     return {
        //       ...state,
        //       loading: false,
        //       data: state.data.filter((product) => product.id !== payload.id),
        //     };

        //   case getType(deleteProduct.deleteProductFailure()):
        //     return {
        //       ...state,
        //       loading: false,
        //     };

        //   case getType(addProductImage.addProductImageSuccess()):
        //     return {
        //       ...state,
        //       loading: false,
        //       data: state.data.map((product) =>
        //         product.id === payload.id ? payload : product
        //       ),
        //     };

        //   case getType(addProductImage.addProductImageFailure()):
        //     return {
        //       ...state,
        //       loading: false,
        //     };

        //   case getType(deleteProductImage.deleteProductImageSuccess()):
        //     return {
        //       ...state,
        //       loading: false,
        //       data: state.data.map((product) =>
        //         product.id === payload?.id ? payload : product
        //       ),
        //     };

        //   case getType(deleteProductImage.deleteProductImageFailure()):
        //     return {
        //       ...state,
        //       loading: false,
        //     };

        //   case getType(getLatestProducts.getLatestProductsSuccess()):
        //     return {
        //       ...state,
        //       latestProducts: payload,
        //     };

        //   case getType(getTopRatingProducts.getTopRatingProductsSuccess()):
        //     return {
        //       ...state,
        //       topRatingProducts: payload,
        //     };

        //   case getType(getTopDiscountProducts.getTopDiscountProductsSuccess()):
        //     return {
        //       ...state,
        //       topDiscountProducts: payload,
        //     };

        //   case getType(getProductDetail.getProductDetailSuccess()):
        //     return {
        //       ...state,
        //       loading: false,
        //       singleProduct: payload,
        //     };

        //   case getType(getRelatedProducts.getRelatedProductsSuccess()):
        //     return {
        //       ...state,
        //       loading: false,
        //       relatedProducts: payload,
        //     };

        default:
            return state;
    }
}
