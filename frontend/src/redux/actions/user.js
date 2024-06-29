import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig.js";
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
} from "../constants/user.js";


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

      const {user,jwt} = response.data;

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

// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const response = await axios.post(`${API_BASE_URL}/user/signin`, {
      email,
      password,
    });

    const {user,jwt} = response.data;
  
    if (jwt) {
      localStorage.setItem("jwt", jwt);
    }
    dispatch({ type: USER_LOGIN_SUCCESS, payload: { user, jwt } });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

// Logout User
export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT, payload: null });
  localStorage.removeItem("jwt");
  localStorage.clear();
};

// Get User Details
export const getUserDetails = (jwt) => async (dispatch) => {
try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
    headers: {
        Authorization: `Bearer ${jwt}`,
    },
    };

    const response = await axios.get(`${API_BASE_URL}/user/profile`, config);
    const {user} = response.data;
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
} catch (error) {
    dispatch({
    type: USER_DETAILS_FAIL,
    payload: error.message,
    });
}
};
