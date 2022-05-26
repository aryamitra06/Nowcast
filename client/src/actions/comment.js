import * as api from '../api/index.js';

export const addComment = (post) => async (dispatch) => {
    try {
      const { data } = await api.addComment(post);
      dispatch({ type: 'ADD_COMMENT', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  }

export const deleteComment = (id) => async(dispatch) => {
    try {
        await api.deleteComment(id);
        dispatch({type: 'DELETE_COMMENT', payload: 0})
    } catch (error) {
        
    }
}