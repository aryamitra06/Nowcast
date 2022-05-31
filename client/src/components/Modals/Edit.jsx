import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
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
        await dispatch(updateState(prev => !prev))
      }

      const onValueChange = (e) =>{
        setPostData({...postData, [e.target.name]: e.target.value})
      }

    return (
        <>
            <Dialog
                open={props.openEditModal}
                onClose={props.handleCloseEditModal}
            >
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <img src={postData?.selectedFile} alt="post cover" style={{width: '100%', height: '200px', objectFit: 'cover',marginBottom: '10px', borderRadius: '10px'}}></img>
                                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
                                <TextField name='title' label="Title" variant="outlined" fullWidth value={postData?.title} style={{ marginBottom: '9px', marginTop: '19px' }} onChange={(e) => onValueChange(e)} required focused/>
                                <TextField name='message' label="Message" variant="outlined" fullWidth value={postData?.message} multiline={true} rows={3} style={{ marginBottom: '9px' }} onChange={(e) => onValueChange(e)} required focused/>
                                <TextField name='tags' label="Tags (comma separated)" variant="outlined" fullWidth value={postData?.tags} style={{ marginBottom: '9px' }} onChange={(e)=> setPostData({...postData, tags: e.target.value.split(',')})} required focused/>
                                <Button variant="contained" type="submit" onClick={props.handleCloseEditModal} color="primary" fullWidth style={{ marginTop: "15px" }}>Submit</Button>
                            </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Edit