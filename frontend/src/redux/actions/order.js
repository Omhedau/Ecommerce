import { api } from '../../config/apiConfig.js';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL
} from '../constants/order';
import { getUserCart } from './cart.js';

export const createOrder = (shippingAddress,paymentDetails) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const response = await api().post('/order', {shippingAddress, paymentDetails});

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: response.data,
    });
   
    dispatch(getUserCart());
    dispatch(getUserOrders());

    return Promise.resolve(response.data);
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.message,
    });

    return Promise.reject(error.message);
  }
};

export const getUserOrders = () => async (dispatch) => {
try {
    dispatch({type: GET_USER_ORDERS_REQUEST});

    const response = await api().get('/order/user');
    
    dispatch({
        type: GET_USER_ORDERS_SUCCESS,
        payload: response.data,
      });

} catch (error) {
    dispatch({
        type: GET_USER_ORDERS_FAIL,
        payload: error.message,
      });
}
};
