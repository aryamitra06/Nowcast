import express from "express";
import { getPosts, createPost, updatePost, getPostById, deletePost, likePost } from "../controllers/posts.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/posts', getPosts)
router.post('/add', auth, createPost)
router.get('/update/:id', getPostById)
router.patch('/update/:id', auth, updatePost)
router.delete('/delete/:id', auth, deletePost)
router.patch('/like/:id', auth, likePost)
router.get('/post/:id', getPostById)

export default router;