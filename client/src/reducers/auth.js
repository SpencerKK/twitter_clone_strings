import {
   REGISTER_SUCCESS,
   LOGIN_SUCCESS,
   REGISTER_FAIL,
   LOGIN_FAIL,
   USER_LOADED,
   AUTH_ERROR,
} from "../actions/types";

const initialState = {
   token: localStorage.getItem("token"),
   isAuthenticated: null,
   loading: true,
   user: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case USER_LOADED:
         return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload,
         };

      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         localStorage.setItem("token", action.payload.token);
         return {
            ...state,
            token: action.payload.token,
            isAuthenticated: true,
            loading: false,
         };

      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
         localStorage.removeItem("token");
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
         };

      default:
         return state;
   }
};
