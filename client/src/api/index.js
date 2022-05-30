import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts = () => API.get(`/posts`);
export const createPost = (newPost) => API.post(`/add`, newPost);
export const getPostById = (id) => API.get(`/post/${id}`, id);
export const updatePost = (id, updatePost) => API.patch(`/update/${id}`, updatePost);
export const deletePost = (id) =>API.delete(`/delete/${id}`);

export const likePost = (id) => API.patch(`/like/${id}`);

export const signIn = (authData) => API.post(`/signin`, authData); 
export const signUp = (authData) => API.post(`/signup`, authData);

export const addComment = (newComment) => API.post(`/comment/add`, newComment)
export const deleteComment = (id) => API.delete(`/comment/delete/${id}`)
export const getComments = (id) => API.get(`/comments/${id}`, id);

export const recommendPosts = (searchQuery) => API.get(`/recommend?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const searchPost = (query) => API.get(`/search?query=${query}`);