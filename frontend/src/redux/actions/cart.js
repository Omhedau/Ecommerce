import { api } from '../../config/apiConfig';
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

export const getUserCart = () => async (dispatch) => {
  try {
    dispatch({ type: CART_GET_REQUEST });
    const { data } = await api().get('/cart');
    dispatch({ type: CART_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CART_GET_FAIL,
      payload: error.message,
    });
  }
};

export const addItemToCart = (productId, size, quantity) => async (dispatch) => {
  try {
    dispatch({ type: CART_ADD_ITEM_REQUEST });

    const { data } = await api().post('/cart', { productId, size, quantity });

    dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: error.message,
    });
  }
};

export const updateCartItem = (cartItemId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: CART_UPDATE_ITEM_REQUEST });

    const { data } = await api().put('/cart', { cartItemId, quantity });

    dispatch({ type: CART_UPDATE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CART_UPDATE_ITEM_FAIL,
      payload: error.message,
    });
  }
};

export const deleteCartItem = (cartItemId) => async (dispatch) => {
  try {
    dispatch({ type: CART_DELETE_ITEM_REQUEST });

    const { data } = await api().delete(`/cart/${cartItemId}`);

    dispatch({ type: CART_DELETE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CART_DELETE_ITEM_FAIL,
      payload: error.message,
    });
  }
};
