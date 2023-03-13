import express  from 'express';
import { getPostsBySearch, createPost, getPosts, updatePost, deletePost, likePost, getPost, addComment } from '../controllers/post.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, addComment);

export default router;
