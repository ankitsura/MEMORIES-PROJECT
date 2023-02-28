import express  from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/post.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/create', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;