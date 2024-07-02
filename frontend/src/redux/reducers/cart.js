import {
    CART_GET_REQUEST,
    CART_GET_SUCCESS,
    CART_GET_FAIL,
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_FAIL,
    CART_UPDATE_ITEM_REQUEST,
    CART_UPDATE_ITEM_SUCCESS,
    CART_UPDATE_ITEM_FAIL,
    CART_DELETE_ITEM_REQUEST,
    CART_DELETE_ITEM_SUCCESS,
    CART_DELETE_ITEM_FAIL,
  } from '../constants/cart';
  
  const initialState = {
    cart: null,
    loading: false,
    error: null,
  };
  
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case CART_GET_REQUEST:
      case CART_ADD_ITEM_REQUEST:
      case CART_UPDATE_ITEM_REQUEST:
      case CART_DELETE_ITEM_REQUEST:
        return { ...state, loading: true };
  
      case CART_GET_SUCCESS:
      case CART_ADD_ITEM_SUCCESS:
      case CART_UPDATE_ITEM_SUCCESS:
      case CART_DELETE_ITEM_SUCCESS:
        return { ...state, loading: false, cart: action.payload, error: null };
  
      case CART_GET_FAIL:
      case CART_ADD_ITEM_FAIL:
      case CART_UPDATE_ITEM_FAIL:
      case CART_DELETE_ITEM_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  