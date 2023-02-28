import Post from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}


export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
        console.log(newPost);
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.ststus(404).send('No post with that id');

    const updatedPost = await Post.findByIdAndUpdate(_id, post, {new: true});

    res.status(200).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.ststus(404).send('No post with that id');

    const deletedPost = await Post.findByIdAndRemove(_id);

    res.status(200).json({
        message: 'Post deleted!',
    });
}