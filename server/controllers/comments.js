import Comment from '../models/Comment.js';
import '@tensorflow/tfjs';
import toxicity from '@tensorflow-models/toxicity';

export const getComments = async (req, res) => {
    try {
        let comments = await Comment.find({ postId: req.params.id })
        res.json(comments);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const addComment = async (req, res) => {
    try {
        const comment = await new Comment({ ...req.body, creator: req.userId });
        const threshold = 0.9;
        toxicity.load(threshold).then(model => {
            const sentences = [req.body.comment];
            model.classify(sentences).then(predictions => {
                let result = predictions[1].results;
                if (JSON.stringify(result).includes("false") === false) {
                    res.status(500).json({ "error": "toxic post detected! You cannot post it to the community!" });
                }
                else if (JSON.stringify(result).includes("false") === true) {
                    comment.save();
                    res.status(200).json({ "msg": "Success" });
                }
            })
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteComment = async (req, res) => {

    try {
        let comment = await Comment.findById(req.params.id);
        if (req.userId === comment.creator) {
            await comment.deleteOne();
            res.status(200).json({ msg: 'deleted successfully' })
        }
        else {
            res.status(405).json({ msg: 'not allowed' })
        }
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}