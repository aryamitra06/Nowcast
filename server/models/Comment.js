import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    postId: String,
    creator: String,
    name: String,
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', commentSchema)
export default Comment;