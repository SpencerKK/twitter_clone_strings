import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   AUTH_ERROR,
   USER_LOADED,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
} from './types';
import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';

// load user
export const loadUser = () => async (dispatch) => {
   if (localStorage.token) {
      setAuthToken(localStorage.token);
   }

   try {
      const res = await axios.get('http://localhost:5000/api/auth');

      dispatch({
         type: USER_LOADED,
         payload: res.data, // this is my user
      });
   } catch (err) {
      dispatch({
         type: AUTH_ERROR,
      });
   }
};

// register user
export const register = ({ name, email, password }) => async (dispatch) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   };

   const body = JSON.stringify({ name, email, password });

   try {
      const res = await axios.post(
         'http://localhost:5000/api/users/register',
         body,
         config
      );

      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data,
      });

      dispatch(loadUser());
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         alert(errors[0].msg);
      }

      dispatch({
         type: REGISTER_FAIL,
      });
   }
};

// login user
export const login = ({ email, password }) => async (dispatch) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   };

   const body = JSON.stringify({ email, password });

   try {
      const res = await axios.post(
         'http://localhost:5000/api/auth',
         body,
         config
      );

      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
      });

      dispatch(loadUser());
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         alert(errors[0].msg);
      }

      dispatch({
         type: LOGIN_FAIL,
      });
   }
};
