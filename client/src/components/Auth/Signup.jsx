import React, { useState } from 'react'
import { Card, CardContent, Typography, TextField, Avatar, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { signUp } from '../../actions/jwtauth';
function Signup() {
    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        await setLoading(true);
        await dispatch(signUp(authData));
        await setLoading(false);
    }
    const handleOnChange = (e) => {
        setAuthData({ ...authData, [e.target.name]: e.target.value });
    }
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Create Account
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Create a new account for Nowcast
                    </Typography>
                    <Avatar
                    sx={{height: '140px', width: '140px', mb: '10px', margin: 'auto'}}
                    src={authData.imageUrl}
                    >
                    </Avatar>
                    {
                        authData.imageUrl && (
                            <Button size='small' onClick={() => setAuthData({ ...authData, imageUrl: '' })}>Remove</Button>
                        )
                    }
                    <form method='post' onSubmit={handleSubmit}>
                        <FileBase type="file" name="imageUrl" multiple={false} onDone={({ base64 }) => setAuthData({ ...authData, imageUrl: base64 })} />
                        <TextField style={{marginTop: '10px'}} name="firstName" label="First Name" type='text' variant="outlined" fullWidth size="small" sx={{ mb: 2 }} onChange={handleOnChange} required />
                        <TextField name="lastName" label="Last Name" type='text' variant="outlined" fullWidth size="small" sx={{ mb: 2 }} onChange={handleOnChange} required />
                        <TextField name="email" label="Email" type='email' variant="outlined" fullWidth size="small" sx={{ mb: 2 }} onChange={handleOnChange} required />
                        <TextField name="password" label="Password" type='password' variant="outlined" fullWidth size="small" sx={{ mb: 2 }} onChange={handleOnChange} required />
                        <LoadingButton loading={loading} size="small" variant='contained' fullWidth type='submit'>Sign up</LoadingButton>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default Signup