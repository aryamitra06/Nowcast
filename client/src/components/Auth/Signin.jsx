import React, {useState} from 'react'
import { Card, CardContent, Typography, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useDispatch} from 'react-redux';
import {signIn} from '../../actions/jwtauth';
function Signin() {
    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e)=> {
        e.preventDefault()
        await setLoading(true);
        await dispatch(signIn(authData)); 
        await setLoading(false);    
      }
      const handleOnChange = (e) => {
        setAuthData({...authData,[e.target.name]:e.target.value});
      }
    return (
        <>
            <Card sx={{mb: 1}}>
                <CardContent>
                    <Typography variant="h5">
                        Login to your Account
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Welcome back to Newcast!
                    </Typography>
                    <form method='post' onSubmit={handleSubmit}>
                        <TextField name="email" label="Email" type='email' variant="outlined" fullWidth size="small" sx={{ mb: 2 }} onChange={handleOnChange} required />
                        <TextField name="password" label="Password" type='password' variant="outlined" fullWidth size="small" sx={{ mb: 2 }} onChange={handleOnChange} required />
                        <LoadingButton loading={loading} size="small" variant='contained' fullWidth type='submit'>Sign In</LoadingButton>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default Signin