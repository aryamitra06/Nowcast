import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comments.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/comments/:id', getComments);
router.post('/comment/add', auth, addComment);
router.delete('/comment/delete/:id', auth, deleteComment);

export default router;