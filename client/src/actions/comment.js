import * as api from '../api/index.js';
import toast from 'react-hot-toast';

export const addComment = (post) => async (dispatch) => {
  try {
    const data = await api.addComment(post);
    toast.success('Comment Posted', { icon: '🥰' });
    dispatch({ type: 'ADD_COMMENT', payload: data });
  } catch (error) {
    toast.error('Oops! Something went wrong', { icon: '😣' });
    console.log(error.message);
  }
}

export const deleteComment = (id) => async (dispatch) => {
  try {
    await api.deleteComment(id);
    toast.success('Comment Deleted', { icon: '😬' });
    dispatch({ type: 'DELETE_COMMENT', payload: 0 })
  } catch (error) {
    toast.error('Oops! Something went wrong', { icon: '😣' });
    console.log(error.message);
  }
}