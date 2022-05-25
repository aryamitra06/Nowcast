import * as api from '../api/index.js';

export const signUp = (authData) => async (dispatch) => {
    try {
      const { data } = await api.signUp(authData);
      dispatch({ type: 'SIGN_UP', payload: data });
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    }
  }

export const signIn = (authData) => async (dispatch) => {
    try {
      const { data } = await api.signIn(authData);
      dispatch({ type: 'SIGN_IN', payload: data });
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    }
  }