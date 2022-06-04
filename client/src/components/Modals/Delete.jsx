import React, {useState} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useDispatch} from 'react-redux';
import { deletePost } from '../../actions/post';
import {updateState} from '../../actions/updatestate'; 
function Delete(props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await setLoading(true);
        await dispatch(deletePost(props.postid))
        await setLoading(false);
        await props.setOpenDeleteModal(false);
        await dispatch(updateState(prev => !prev))
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
                    <LoadingButton loading={loading} loadingIndicator="Deleting..." onClick={handleDelete} color='error'>
                        Delete
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Delete