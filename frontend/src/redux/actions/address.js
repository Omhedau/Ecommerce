import { api } from '../../config/apiConfig.js';
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

export const listAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: ADDRESS_LIST_REQUEST });

    const { data } = await api().get('user/addresses');
    console.log(data.addresses);
    dispatch({
      type: ADDRESS_LIST_SUCCESS,
      payload: data.addresses,
    });
  } catch (error) {
    dispatch({
      type: ADDRESS_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const createAddress = (address) => async (dispatch) => {
  try {
    dispatch({ type: ADDRESS_CREATE_REQUEST });

    const { data } = await api().post('user/address', address);

    dispatch({
      type: ADDRESS_CREATE_SUCCESS,
      payload: data.address,
    });

    dispatch(setShippingAddress(data.address));

  } catch (error) {
    dispatch({
      type: ADDRESS_CREATE_FAIL,
      payload: error.message,
    });
  }
};

export const removeAddress = (addressId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADDRESS_REMOVE_REQUEST });

    await api().delete(`user/address/${addressId}`);

    const { address: { shippingAddress } } = getState();
    if (shippingAddress._id === addressId) {
      sessionStorage.removeItem('selectedAddress');
    }

    dispatch({
      type: ADDRESS_REMOVE_SUCCESS,
      payload: addressId,
    });

  } catch (error) {
    dispatch({
      type: ADDRESS_REMOVE_FAIL,
      payload: error.message,
    });
  }
};

export const setShippingAddress = (address) => (dispatch) => {
  sessionStorage.setItem('selectedAddress', JSON.stringify(address));
  dispatch({
    type: SET_SHIPPING_ADDRESS,
    payload: address,
  });
};
