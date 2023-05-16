import {
    // addProductImage,
    // createProduct,
    // deleteProduct,
    // deleteProductImage,
    // getLatestProducts,
    getPostDetail,
    getPosts,
    // getRelatedProducts,
    // getTopDiscountProducts,
    // getTopRatingProducts,
    getType,
    // updateProduct,
} from "../actions/posts";
import { INIT_STATE } from "./state";

export default function postsReducers(state = INIT_STATE.posts, action) {
    const { type, payload } = action;

    switch (type) {
        case getType(getPosts.getPostsRequest()):
            return {
                ...state,
                loading: true,
            };

        case getType(getPosts.getPostsSuccess()):
            return {
                ...state,
                loading: false,
                data: payload,
            };

        case getType(getPosts.getPostsFailure()):
            return {
                ...state,
                loading: false,
            };

        case getType(getPostDetail.getPostDetailSuccess()):
            return {
                ...state,
                loading: true,
                singlePostDetail: payload,
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
