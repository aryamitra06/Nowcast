import React, { useEffect, useState, useRef } from 'react'
import { Dialog, DialogTitle, DialogContent, Button, TextField, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileBase from 'react-file-base64';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../actions/post';
import { updateState } from '../../actions/updatestate';

function Edit(props) {
    const dispatch = useDispatch();
    const ref = useRef();

    const post = useSelector((state) => state.post);
    const data = post.data;
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        setPostData(data);
    }, [data])


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updatePost(props.postid, { ...postData, name: user?.result?.name }))
        await dispatch(updateState(prev => !prev))
    }

    const onValueChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }

    const removeCoverPhoto = () => {
        setPostData({ ...postData, selectedFile: '' })

    }

    return (
        <>
            <Dialog
                open={props.openEditModal}
                onClose={props.handleCloseEditModal}
            >
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        {
                            postData?.selectedFile && (
                                <>
                                <img src={postData?.selectedFile} alt="post cover" style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px', borderRadius: '10px' }}/>
                                <Button onClick={removeCoverPhoto}>Remove</Button>
                                </>
                            )
                        }
                        <FileBase type="image" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                        <TextField name='title' label="Title" variant="outlined" fullWidth value={postData?.title} style={{ marginBottom: '9px', marginTop: '19px' }} onChange={(e) => onValueChange(e)} required focused />
                        <TextField name='message' label="Message" variant="outlined" fullWidth value={postData?.message} multiline={true} rows={3} style={{ marginBottom: '9px' }} onChange={(e) => onValueChange(e)} required focused />
                        <TextField name='tags' label="Tags (comma separated)" variant="outlined" fullWidth value={postData?.tags} style={{ marginBottom: '9px' }} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} required focused />
                        <Button variant="contained" type="submit" onClick={props.handleCloseEditModal} color="primary" fullWidth style={{ marginTop: "15px" }}>Save</Button>
                        <Button variant="contained" onClick={props.handleCloseEditModal} color="primary" fullWidth style={{ marginTop: "15px" }}>Close</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Edit