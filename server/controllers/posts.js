import Post from '../models/Post.js'

//fetching all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//adding a new post
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post({...post, creator: req.userId});
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ msg: error.message })
    }
}

//get data for specific id
export const getPostById = async (req, res) => {
    try {
        const data = await Post.findById(req.params.id);
        return res.json(data)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//updating a post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    try {
        if(creator===req.userId){
            const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
            await Post.findByIdAndUpdate(id, updatedPost, { new: true });
            res.json(updatedPost);
        }
        else{
            res.status(405).json({msg: 'not allowed'})
        }
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//deleting a post
export const deletePost = async (req, res) => {
    const { id } = req.params;
    const data = await Post.findById(id);
    try {
        if(data.creator===req.userId){
            await Post.findByIdAndRemove(id);
            res.json({ msg: 'deleted successfully' })
        }
        else{
            res.status(405).json({msg: 'not allowed'})
        }
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//liking a post
export const likePost = async (req, res) => {
    const { id } = req.params;

    //@case 1: checking authentication
    if (!req.userId) {
        return res.json({ message: 'Unauthenticated' });
    }
    try {
        const post = await Post.findById(id);
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
        
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
        
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}