import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, TextField } from '@mui/material';
import FileBase from 'react-file-base64';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import {updatePost} from '../../actions/post';
import {updateState} from '../../actions/updatestate'; 

function Edit(props) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.post);
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: ''})
    const user=JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        setPostData(data);
    }, [data])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updatePost(props.postid, {...postData, name: user?.result?.name}))
        dispatch(updateState(prev => !prev))
      }

      const onValueChange = (e) =>{
        setPostData({...postData, [e.target.name]: e.target.value})
      }

    return (
        <>
            <Dialog
                open={props.openEditModal}
                onClose={props.handleCloseEditModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <TextField name='title' label="Title" variant="outlined" fullWidth value={postData.title} style={{ marginBottom: '9px' }} onChange={(e) => onValueChange(e)} required focused/>
                                <TextField name='message' label="Message" variant="outlined" fullWidth value={postData.message} multiline={true} rows={3} style={{ marginBottom: '9px' }} onChange={(e) => onValueChange(e)} required focused/>
                                <TextField name='tags' label="Tags" variant="outlined" fullWidth value={postData.tags} style={{ marginBottom: '9px' }} onChange={(e)=> setPostData({...postData, tags: e.target.value.split(',')})} required focused/>
                                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
                                <Button variant="contained" type="submit" onClick={props.handleCloseEditModal} color="primary" fullWidth style={{ marginTop: "15px" }}>Submit</Button>
                            </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Edit