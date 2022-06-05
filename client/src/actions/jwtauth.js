import * as api from '../api/index.js';
import toast from 'react-hot-toast';

export const signUp = (authData) => async (dispatch) => {
    try {
      const { data } = await api.signUp(authData);
      toast.success('Welcome to Nowcast!', { icon: '😍' });
      dispatch({ type: 'SIGN_UP', payload: data });
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      toast.error(`${error.response.data.message}`, { icon: '😵' });
      console.log(error.response.data.message);
    }
  }

export const signIn = (authData) => async (dispatch) => {
    try {
      const { data } = await api.signIn(authData);
      toast.success('Welcome Back! Redirecting You to Feed...', { icon: '🥰' });
      dispatch({ type: 'SIGN_IN', payload: data });
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      toast.error(`${error.response.data.message}`, { icon: '😵' });
      console.log(error.response.data.message);
    }
  }