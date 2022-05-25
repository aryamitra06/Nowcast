import React, {useState} from 'react'
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import {useDispatch} from 'react-redux';
import {signUp} from '../../actions/jwtauth';
function Signup() {
    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({firstName: '', lastName: '', email: '', password: ''});

    const handleSubmit = async (e)=> {
        e.preventDefault()
        console.log(authData);
        await dispatch(signUp(authData));
      }
      const handleOnChange = (e) => {
        setAuthData({...authData,[e.target.name]:e.target.value});
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
                    <form method='post' onSubmit={handleSubmit}>
                        <TextField name="firstName" label="First Name" type='text' variant="outlined" fullWidth size="small" sx={{ mb: 2 }} onChange={handleOnChange} required />
                        <TextField name="lastName" label="Last Name" type='text' variant="outlined" fullWidth size="small" sx={{ mb: 2 }} onChange={handleOnChange} required />
                        <TextField name="email" label="Email" type='email' variant="outlined" fullWidth size="small" sx={{ mb: 2 }} onChange={handleOnChange} required />
                        <TextField name="password" label="Password" type='password' variant="outlined" fullWidth size="small" sx={{ mb: 2 }} onChange={handleOnChange} required />
                        <Button size="small" variant='contained' fullWidth type='submit'>Sign up</Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default Signup