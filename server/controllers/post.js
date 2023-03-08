import Post from '../models/postSchema.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {

        const title = new RegExp(searchQuery, 'i'); // i for ignore Case
        const posts =  await Post.find({ $or: [{ title }, {tags: { $in: tags.split(',') }} ] });
        return res.status(200).json(posts);
        
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const getPost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}


export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post({...post, creator: req.userId});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.ststus(404).send('No post with that id');

    const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});

    res.status(200).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.ststus(404).send('No post with that id');

    const deletedPost = await Post.findByIdAndRemove(id);

    res.status(200).json({
        message: 'Post deleted!',
    });
}

export const likePost = async (req, res) => {
    const id = req.params.id;
    if(!req.userId) return res.json({message: 'Unauthenticated'});
    if(!mongoose.Types.ObjectId.isValid(id)) return res.ststus(404).send('No post with that id');

    const post = await Post.findById(id);
    const index =  post.likes.findIndex((id) => id === String(req.userId));
    if(index === -1){
        post.likes.push(req.userId);
        post.save();
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
        post.save();
    }

    res.status(200).json(post);
}