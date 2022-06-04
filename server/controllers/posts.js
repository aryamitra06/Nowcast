import Post from '../models/Post.js'
import('@tensorflow/tfjs');
import toxicity from '@tensorflow-models/toxicity';
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
    const body = req.body;
    try {
        const post = await new Post({ ...body, creator: req.userId });
        const threshold = 0.9;
        toxicity.load(threshold).then(model => {
            const sentences = [req.body.title + req.body.message];
            model.classify(sentences).then(predictions => {
                let result = predictions[1].results;
                if (JSON.stringify(result).includes("false") === false) {
                    res.status(500).json({ "error": "toxic post detected! You cannot post it to the community!" });
                }
                else if (JSON.stringify(result).includes("false") === true) {
                    post.save();
                    res.status(200).json({ "msg": "Success" });
                }
            })
        })
    } catch (error) {
        res.status(500).json(error);
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
    try {
        if (req.body.creator === req.userId) {
            const threshold = 0.9;
            const editPost = new Post(req.body);

            //@desc
            //function for editing a post
            const editingPost = async () => {
                await Post.updateOne({ _id: req.params.id }, editPost);
                res.status(200).json({ "msg": "success" });
            }

            toxicity.load(threshold).then(model => {
                const sentences = [editPost.title + editPost.message];
                model.classify(sentences).then(predictions => {
                    let result = predictions[1].results;
                    if (JSON.stringify(result).includes("false") === false) {
                        res.status(500).json({ "error": "toxic post detected! You cannot post it to the community!" });
                    }
                    else if (JSON.stringify(result).includes("false") === true) {
                        editingPost();
                    }
                })
            })
        }
        else {
            res.status(401).send("Not allowed");
        }
    } catch (error) {
        res.status(401).send("Not allowed");
    }
}

//deleting a post
export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    try {
        if (post.creator === req.userId) {
            await Post.findByIdAndRemove(id);
            res.json({ msg: 'deleted successfully' })
        }
        else {
            res.status(405).json({ msg: 'not allowed' })
        }
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//liking a post
export const likePost = async (req, res) => {
    if (!req.userId) {
        return res.json({ message: 'Unauthenticated' });
    }
    try {
        const post = await Post.findById(req.params.id);
        const index = post.likes.findIndex((id) => id === String(req.userId));
        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
        await Post.findByIdAndUpdate(req.params.id, post, { new: true });
        res.status(200).json({ msg: 'success' });

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//getting recommended posts
export const recommendPosts = async (req, res) => {
    try {
        const data = await Post.findById(req.params.postId);
        const message = data.message;
        const title = data.title;
        const tags = data.tags.toString();
        const q1 = new RegExp(title, "i");
        const q2 = new RegExp(tags, "i");
        const q3 = new RegExp(message, "i");
        const posts = await Post.find({ $or: [{ title: q1 }, { tags: q2 }, { message: q3 }] });
        res.json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//search post
export const searchPost = async (req, res) => {
    const { query } = req.query;
    try {
        const q = new RegExp(query, "i");
        const posts = await Post.find({ $or: [{ title: q }, { tags: q }, { message: q }] });
        res.json(posts);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//profile posts
export const ProfilePosts = async (req, res) => {
    try {
        const posts = await Post.find({ creator: req.params.userId })
        res.status(200).json(posts);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}