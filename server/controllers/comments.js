import Comment from '../models/Comment.js';

export const getComments = async (req,res) => {
    try {
        let comments = await Comment.find({ postId: req.params.id })
        res.json(comments);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const addComment = async (req,res) => {
    const comment = req.body;
    const newComment = new Comment({...comment, creator: req.userId});
    try {
        await newComment.save();
        return res.status(200).send("Success");
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const deleteComment = async (req,res) => {
    const { id } = req.params;
    try {
        let comment = await Comment.findById(id);
        if(req.userId===comment.creator){
            await comment.deleteOne();
            res.status(200).json({ msg: 'deleted successfully' })
        }
        else{
            res.status(405).json({msg: 'not allowed'})
        }
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}