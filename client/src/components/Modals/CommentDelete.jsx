import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../actions/comment';
import { updateState } from '../../actions/updatestate';

function CommentDelete(props) {
    const dispatch = useDispatch();
    const handleDeleteComment = async () => {
        await dispatch(deleteComment(props.comment._id))
        await dispatch(updateState(prev => !prev))
        props.setOpen(false);
      }
    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
            >
                <DialogTitle>
                    Delete Comment
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this comment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={handleDeleteComment} color='error'>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CommentDelete