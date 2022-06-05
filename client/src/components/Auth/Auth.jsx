import React from 'react'
import { Container, Grow, Grid, Button } from '@mui/material';
import { GoogleLogin } from 'react-google-login'
import GoogleIcon from '@mui/icons-material/Google';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { saveAuth } from '../../actions/googleauth';
import Signup from './Signup';
import Signin from './Signin';
import { useNavigate } from "react-router-dom"

function Auth() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  React.useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const dispatch = useDispatch();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    await dispatch(saveAuth({ result, token }))

    await toast.success('Welcome Back! Redirecting You to Feed...')

    await setTimeout(() => {
      window.location.href = "/";
    }, 3000);

  };
  const googleFailure = async () => {
    await toast.error('Try Again')
  }
  return (
    <>
      <Grow in>
        <Container sx={{ mt: 2 }}>
          <Grid container justifyContent="center" alignItems="stretch" className='containermain' spacing={3}>
            <Grid item xs={12} sm={5}>
              <Signup />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Signin />
              <GoogleLogin
                clientId='903948333203-5hlqr2q43lst7986r8oqq6c9cvqv821h.apps.googleusercontent.com'
                render={(renderProps) => (
                  <Button variant="contained" fullWidth startIcon={<GoogleIcon />} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    Login With Google
                  </Button>
                )}
                onFailure={googleFailure}
                onSuccess={googleSuccess}
                cookiePolicy="single_host_origin"
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  )
}

export default Auth