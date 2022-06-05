import React, {useState} from 'react'
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../actions/comment';
import { updateState } from '../../actions/updatestate';

function CommentDelete(props) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDeleteComment = async () => {
        await setLoading(true);
        await dispatch(deleteComment(props.comment._id))
        await setLoading(false);
        await dispatch(updateState(prev => !prev))
        await props.setOpen(false);
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
                    <LoadingButton loading={loading} onClick={handleDeleteComment} color='error'>Delete</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CommentDelete