import { combineReducers } from 'redux';

import posts from './posts';
import post from './post';
import updatestate from './updatestate';
import googleauth from './googleauth';
import jwtauth from './jwtauth';
export const reducers = combineReducers({ posts, post, updatestate, googleauth, jwtauth });