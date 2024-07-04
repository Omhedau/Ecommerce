import {
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_LIST_FAIL,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_CREATE_FAIL,
  SET_SHIPPING_ADDRESS,
  ADDRESS_REMOVE_REQUEST,
  ADDRESS_REMOVE_SUCCESS,
  ADDRESS_REMOVE_FAIL,
} from '../constants/address.js';

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  shippingAddress: JSON.parse(sessionStorage.getItem('selectedAddress')) || {},
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_LIST_REQUEST:
    case ADDRESS_CREATE_REQUEST:
    case ADDRESS_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload,
      };
    case ADDRESS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: [...state.addresses, action.payload],
      };
    case ADDRESS_REMOVE_SUCCESS:
      const isRemovedAddressShipping = state.shippingAddress._id === action.payload;
      return {
        ...state,
        loading: false,
        addresses: state.addresses.filter((address) => address._id !== action.payload),
        shippingAddress: isRemovedAddressShipping ? {} : state.shippingAddress,
      };
    case ADDRESS_LIST_FAIL:
    case ADDRESS_CREATE_FAIL:
    case ADDRESS_REMOVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
