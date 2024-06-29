import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from "../constants/user.js";

const initialState={
    user:null,
    Loading:false,
    error:null,
    jwt:null
}

export const userReducer=(state=initialState,action)=>{
    switch (action.type) {
        case USER_REGISTER_REQUEST:
        case USER_LOGIN_REQUEST:
        case USER_DETAILS_REQUEST:
            return {...state, Loading:true , error:null }
        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
            return {...state, Loading:false, error:null, user:action.payload.user, jwt:action.payload.jwt}
        case USER_DETAILS_SUCCESS:
            return {...state, Loading:false, error:null, user:action.payload}
        case USER_REGISTER_FAIL:
        case USER_LOGIN_FAIL:
        case USER_DETAILS_FAIL:
            return { ...state, Loading: false, error: action.payload }
        case USER_LOGOUT:
            return {...initialState}
        default:
            return state;
    }
}