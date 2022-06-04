import React, { useState } from 'react';
import { TextField, Typography, Card, CardContent, Alert, AlertTitle, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/post';
import { updateState } from '../../actions/updatestate'
import { Toaster } from 'react-hot-toast';

function Form() {
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await setLoading(true);
    await dispatch(createPost({ ...postData, name: user?.result?.name }))
    await setLoading(false);
    await dispatch(updateState(prev => !prev))
    await document.getElementById("form").reset();
    await setPostData({ selectedFile: '' });
  }

  const resetForm = () => {
    setPostData({ selectedFile: '' });
  }

  const removeCoverPhoto = () => {
    setPostData({ ...postData, selectedFile: '' })
  }

  const handleOnChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  }

  if (!user?.result?.name) {
    return (
      <>
        <Alert severity="info" sx={{ mt: 2 }}>
          <AlertTitle>🎉 Join Nowcast</AlertTitle>
          <strong>Login/Create your account to start posting!</strong>
        </Alert>
      </>
    )
  }

  return (
    <>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant='h6' style={{ marginBottom: "10px" }}>Add Post</Typography>
          <form onSubmit={handleSubmit} id='form'>
            {
              postData?.selectedFile && (
                <>
                  <img id='formimg' src={postData?.selectedFile} alt="post cover" style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px', borderRadius: '10px' }}/>
                  <Button onClick={removeCoverPhoto}>Remove</Button>
                </>
              )
            }
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
            <TextField name='title' placeholder='Title*' variant="outlined" fullWidth style={{ marginBottom: '9px', marginTop: '10px' }} onChange={handleOnChange} required />
            <TextField name='message' placeholder='Message*' variant="outlined" fullWidth style={{ marginBottom: '9px' }} multiline={true} rows={3} onChange={handleOnChange} required />
            <TextField name='tags' placeholder='Tags (comma separated)*' variant="outlined" fullWidth style={{ marginBottom: '9px' }} onChange={handleOnChange} required />
            <LoadingButton loading={loading} loadingIndicator="Checking Toxicity..." variant="contained" type="submit" color="primary" fullWidth style={{ marginTop: "15px" }}>Post</LoadingButton>
            <Button variant="contained" onClick={resetForm} type="reset" value="Reset" color="primary" fullWidth style={{ marginTop: "15px" }}>Reset</Button>
          </form>
        </CardContent>
      </Card>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000
        }}
      />
    </>
  )
}

export default Form