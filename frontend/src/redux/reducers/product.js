import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_NEW_PRODUCTS_REQUEST,
  GET_NEW_PRODUCTS_SUCCESS,
  GET_NEW_PRODUCTS_FAILURE,
} from '../constants/product.js';

const initialState = {
  products: [],
  product: null,
  newProducts: {
    All: [],
    Mens: [],
    Womens: [],
    Kids: [],
  },
  totalProducts: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
    case GET_PRODUCT_BY_ID_REQUEST:
    case GET_NEW_PRODUCTS_REQUEST:
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
        currentPage: action.payload.currentPage,
      };

    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    case GET_NEW_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        newProducts: action.payload,
      };

    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [], // Ensure products array is cleared on failure
        totalProducts: 0,
        totalPages: 0,
        currentPage: 1,
        error: action.payload,
      };

    case GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        product: null, 
        error: action.payload,
      };

    case GET_NEW_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        newProducts: initialState.newProducts, 
        error: action.payload,
      };

    default:
      return state;
  }
};
