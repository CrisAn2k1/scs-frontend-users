import { takeLatest } from "redux-saga/effects";
// import {
//     createCategory,
//     deleteCategory,
//     getCategories,
//     updateCategory,
//     addCategoryImage,
// } from "../actions/categories";
// import {
//     createCategorySaga,
//     deleteCategorySaga,
//     getCategoriesSaga,
//     updateCategorySaga,
//     addCategoryImageSaga,
// } from "./categories";

// import { createSupplier, deleteSupplier, getSuppliers, updateSupplier } from "../actions/suppliers";
// import {
//     createSupplierSaga,
//     deleteSupplierSaga,
//     getSuppliersSaga,
//     updateSupplierSaga,
// } from "./suppliers";

// import {
//     createWarehouse,
//     deleteWarehouse,
//     getWarehouses,
//     updateWarehouse,
// } from "../actions/warehouses";
// import {
//     createWarehouseSaga,
//     deleteWarehouseSaga,
//     getWarehousesSaga,
//     updateWarehouseSaga,
// } from "./warehouses";

import {
    getEvents,
    // createProduct,
    // deleteProduct,
    // getProducts,
    // updateProduct,
    // addProductImage,
    // deleteProductImage,
    // getLatestProducts,
    // getTopRatingProducts,
    // getTopDiscountProducts,
    // getRelatedProducts,
    // getProductDetail,
} from "../actions/events";
import {
    getEventsSaga,
    // createProductSaga,
    // deleteProductSaga,
    // getProductsSaga,
    // updateProductSaga,
    // addProductImageSaga,
    // deleteProductImageSaga,
    // getLatestProductsSaga,
    // getTopRatingProductsSaga,
    // getTopDiscountProductsSaga,
    // getRelatedProductsSaga,
    // getProductDetailSaga,
} from "./events";

// import {
//     //createCustomer,
//     //deleteCustomer,
//     getCustomers,
//     updateCustomer,
//     updatePersonal,
//     updateAvatar,
// } from "../actions/customers";
// import {
//     //createCustomerSaga,
//     //deleteCustomerSaga,
//     getCustomersSaga,
//     updateCustomerSaga,
//     updatePersonalSaga,
//     updateAvatarSaga,
// } from "./customers";

// import {
//     getProductComments,
//     createComment,
//     getAllComments,
//     updateComment,
//     deleteComment,
// } from "../actions/comments";
// import {
//     getProductCommentsSaga,
//     createCommentSaga,
//     getAllCommentsSaga,
//     updateCommentSaga,
//     deleteCommentSaga,
// } from "./comments";

// import {
//     createOrder,
//     getOrders,
//     updateOrder,
//     getUserOrders,
//     cancelOrder,
//     refundStripe,
// } from "../actions/orders";
// import {
//     createOrderSaga,
//     getOrdersSaga,
//     updateOrderSaga,
//     getUserOrdersSaga,
//     cancelOrderSaga,
//     refundStripeSaga,
// } from "./orders";

// import { getAdmins, updateAdmin } from "../actions/admins";
// import { getAdminsSaga, updateAdminSaga } from "./admins";

function* mySaga() {
    // yield takeLatest(getCategories.getCategoriesRequest, getCategoriesSaga);
    // yield takeLatest(createCategory.createCategoryRequest, createCategorySaga);
    // yield takeLatest(updateCategory.updateCategoryRequest, updateCategorySaga);
    // yield takeLatest(deleteCategory.deleteCategoryRequest, deleteCategorySaga);
    // yield takeLatest(addCategoryImage.addCategoryImageRequest, addCategoryImageSaga);

    // yield takeLatest(getSuppliers.getSuppliersRequest, getSuppliersSaga);
    // yield takeLatest(createSupplier.createSupplierRequest, createSupplierSaga);
    // yield takeLatest(updateSupplier.updateSupplierRequest, updateSupplierSaga);
    // yield takeLatest(deleteSupplier.deleteSupplierRequest, deleteSupplierSaga);

    // yield takeLatest(getWarehouses.getWarehousesRequest, getWarehousesSaga);
    // yield takeLatest(createWarehouse.createWarehouseRequest, createWarehouseSaga);
    // yield takeLatest(updateWarehouse.updateWarehouseRequest, updateWarehouseSaga);
    // yield takeLatest(deleteWarehouse.deleteWarehouseRequest, deleteWarehouseSaga);

    yield takeLatest(getEvents.getEventsRequest, getEventsSaga);
    // yield takeLatest(createProduct.createProductRequest, createProductSaga);
    // yield takeLatest(updateProduct.updateProductRequest, updateProductSaga);
    // yield takeLatest(deleteProduct.deleteProductRequest, deleteProductSaga);
    // yield takeLatest(addProductImage.addProductImageRequest, addProductImageSaga);
    // yield takeLatest(deleteProductImage.deleteProductImageRequest, deleteProductImageSaga);
    // yield takeLatest(getLatestProducts.getLatestProductsRequest, getLatestProductsSaga);
    // yield takeLatest(getTopRatingProducts.getTopRatingProductsRequest, getTopRatingProductsSaga);
    // yield takeLatest(
    //     getTopDiscountProducts.getTopDiscountProductsRequest,
    //     getTopDiscountProductsSaga,
    // );
    // yield takeLatest(getProductDetail.getProductDetailRequest, getProductDetailSaga);
    // yield takeLatest(getRelatedProducts.getRelatedProductsRequest, getRelatedProductsSaga);
    // yield takeLatest(getCustomers.getCustomersRequest, getCustomersSaga);
    // //yield takeLatest(createCustomer.createCustomerRequest, createCustomerSaga);
    // yield takeLatest(updateCustomer.updateCustomerRequest, updateCustomerSaga);
    // //yield takeLatest(deleteCustomer.deleteCustomerRequest, deleteCustomerSaga);
    // yield takeLatest(updatePersonal.updatePersonalRequest, updatePersonalSaga);
    // yield takeLatest(updateAvatar.updateAvatarRequest, updateAvatarSaga);

    // yield takeLatest(getProductComments.getProductCommentsRequest, getProductCommentsSaga);
    // yield takeLatest(createComment.createCommentRequest, createCommentSaga);
    // yield takeLatest(getAllComments.getAllCommentsRequest, getAllCommentsSaga);
    // yield takeLatest(updateComment.updateCommentRequest, updateCommentSaga);
    // yield takeLatest(deleteComment.deleteCommentRequest, deleteCommentSaga);

    // yield takeLatest(createOrder.createOrderRequest, createOrderSaga);
    // yield takeLatest(getOrders.getOrdersRequest, getOrdersSaga);
    // yield takeLatest(updateOrder.updateOrderRequest, updateOrderSaga);
    // yield takeLatest(getUserOrders.getUserOrdersRequest, getUserOrdersSaga);
    // yield takeLatest(cancelOrder.cancelOrderRequest, cancelOrderSaga);
    // yield takeLatest(refundStripe.refundStripeRequest, refundStripeSaga);

    // yield takeLatest(getAdmins.getAdminsRequest, getAdminsSaga);
    // yield takeLatest(updateAdmin.updateAdminRequest, updateAdminSaga);
}

export default mySaga;
