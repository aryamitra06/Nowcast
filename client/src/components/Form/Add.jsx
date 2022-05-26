import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/post';
import { updateState } from '../../actions/updatestate'
import toast, { Toaster } from 'react-hot-toast';

function Form() {
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })


  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createPost({ ...postData, name: user?.result?.name }))
    toast.success('Yay! Your story posted', {
      icon: '🎉',
    });
    await dispatch(updateState(prev => !prev))
    setPostData({ title: '', message: '', tags: '', selectedFile: '' })
  }


  if (!user?.result?.name) {
    return (
      <>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant='h6'>Please Login/Signup to create a post!</Typography>
          </CardContent>
        </Card>
      </>
    )
  }



  return (
    <>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant='h6' style={{ marginBottom: "10px" }}>Add Post</Typography>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField name='title' label="Title" variant="outlined" fullWidth value={postData.title} style={{ marginBottom: '9px' }} onChange={(e) => setPostData({ ...postData, title: e.target.value })} required />
            <TextField name='message' label="Message" variant="outlined" fullWidth value={postData.message} style={{ marginBottom: '9px' }} multiline={true} rows={3} onChange={(e) => setPostData({ ...postData, message: e.target.value })} required />
            <TextField name='tags' label="Tags (comma separated)" variant="outlined" fullWidth value={postData.tags} style={{ marginBottom: '9px' }} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} required />
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
            <Button variant="contained" type="submit" color="primary" fullWidth style={{ marginTop: "15px" }}>Post</Button>
          </form>
        </CardContent>
      </Card>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: 'white',
            color: 'green',
            fontFamily: 'sans-serif'
          }
        }}
      />
    </>
  )
}

export default Form