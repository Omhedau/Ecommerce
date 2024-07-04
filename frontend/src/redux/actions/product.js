import axios from 'axios';
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_NEW_PRODUCTS_REQUEST,
  GET_NEW_PRODUCTS_SUCCESS,
  GET_NEW_PRODUCTS_FAILURE
} from '../constants/product.js';

const baseURL = 'http://localhost:5454'; 

export const getAllProducts = (gender, toplevelCat, category, options) => async (dispatch) => {
  dispatch({ type: GET_ALL_PRODUCTS_REQUEST });

  try {
    const response = await axios.get(`${baseURL}/product/${gender}/${toplevelCat}/${category}`, { params: options });
    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
  
  try {
    const response = await axios.get(`${baseURL}/product/id/${id}`);
    console.log(response.data);
    dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const getNewProducts = () => async (dispatch) => {
  dispatch({ type: GET_NEW_PRODUCTS_REQUEST });
  try {
    const response = await axios.get(`${baseURL}/product/new`);
    console.log(response);
    dispatch({ type: GET_NEW_PRODUCTS_SUCCESS, payload: response.data.newProducts });
  } catch (error) {
    dispatch({ type: GET_NEW_PRODUCTS_FAILURE, payload: error.message });
  }
};
