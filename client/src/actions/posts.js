import * as api from '../api/index.js';

//action creators
export const fetchPosts = () => async (dispatch) => {
  try {
    const data = await api.fetchPosts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const recommendPosts = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.recommendPosts(searchQuery);
    dispatch({ type: 'RECOMMEND_POSTS', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const searchPost = (query) => async (dispatch) => {
  try {
    const { data } = await api.searchPost(query);
    dispatch({ type: 'SEARCH_POST', payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const profilePosts = (userId) => async (dispatch) => {
  try {
    const { data } = await api.ProfilePosts(userId);
    dispatch({ type: 'USER_POSTS', payload: data });
  } catch (error) {
    console.log(error);
  }
}