import * as api from '../api/index.js';

export const fetchComments = (postId) => async (dispatch) => {
    try {
      const { data } = await api.getComments(postId);
      dispatch({ type: 'FETCH_COMMENTS', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  }