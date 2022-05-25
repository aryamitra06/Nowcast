import * as api from '../api/index.js';

//action creators
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const getPostById = (id) => async (dispatch) => {
    try {
      const { data } = await api.getPostById(id);
      dispatch({ type: 'GET_POST_BY_ID', payload: data })
    } catch (error) {
      console.log(error.message);
    }
  }
  
export const updatePost = (id, post) => async (dispatch) => {
    try {
      await api.updatePost(id, post);
      dispatch({ type: 'UPDATE', payload: 0 });
    } catch (error) {
      console.log(error.message);
    }
  }

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: 'DELETE', payload: 0 })
  } catch (error) {
    console.log(error.message);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    await api.likePost(id);
    dispatch({ type: 'LIKE', payload: 0 });
  } catch (error) {
    console.log(error.message);
  }
}