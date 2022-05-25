import React, {useState} from 'react'
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import {useDispatch} from 'react-redux';
import {signIn} from '../../actions/jwtauth';
function Signin() {
    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});

    const handleSubmit = async (e)=> {
        e.preventDefault()
        await dispatch(signIn(authData));     
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
                        <Button size="small" variant='contained' fullWidth type='submit'>Sign In</Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default Signin