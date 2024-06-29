import {
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
  } from '../constants/product.js';
  
  const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
  };
  
  export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_PRODUCTS_REQUEST:
      case GET_PRODUCT_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_ALL_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.payload.products,
          totalProducts: action.payload.totalProducts,
          totalPages: action.payload.totalPages,
        };
  
      case GET_PRODUCT_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload,
        };
  
      case GET_ALL_PRODUCTS_FAILURE:
      case GET_PRODUCT_BY_ID_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  