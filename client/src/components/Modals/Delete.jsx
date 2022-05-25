import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';
import {useDispatch} from 'react-redux';
import { deletePost } from '../../actions/post';
import {updateState} from '../../actions/updatestate'; 
function Delete(props) {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deletePost(props.postid))
        dispatch(updateState(prev => !prev))
    }
    
    return (
        <>
            <Dialog
                open={props.openDeleteModal}
                onClose={props.handleCloseDeleteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Delete Post</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseDeleteModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={ ()=> {props.handleCloseDeleteModal(); handleDelete();}} color='secondary'>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Delete