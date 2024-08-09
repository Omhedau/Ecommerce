import axios from "axios";
import { API_BASE_URL,api } from "../../config/apiConfig";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../constants/user";

export const register =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const response = await axios.post(`${API_BASE_URL}/user/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      const { user, jwt } = response.data;

      if (jwt) {
        localStorage.setItem("jwt", jwt);
      }

      dispatch({ type: USER_REGISTER_SUCCESS, payload: { user, jwt } });

      // Optionally log the user in immediately after registering
      dispatch({ type: USER_LOGIN_SUCCESS, payload: { user, jwt } });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.message,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const response = await axios.post(`${API_BASE_URL}/user/signin`, {
      email,
      password,
    });

    const { user, jwt } = response.data;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
    }
    dispatch({ type: USER_LOGIN_SUCCESS, payload: { user, jwt } });

    // After successful login, fetch user details and cart
    dispatch(getUserDetails(jwt));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT, payload: null });
  localStorage.removeItem("jwt");
  localStorage.clear();
  sessionStorage.clear();
  window.location.replace("/"); // Optional: Reload the page after logout to home page
};

export const getUserDetails = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await api().get('/user/profile');
    const { user } = data;

    dispatch({ type: USER_DETAILS_SUCCESS, payload: user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
