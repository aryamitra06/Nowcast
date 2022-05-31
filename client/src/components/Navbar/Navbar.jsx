import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem, Box, TextField } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { updateState } from '../../actions/updatestate';
import decode from 'jwt-decode';

function Navbar(props) {


  const [query, setQuery] = React.useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeTheme = () => {
    if (props.colscheme === "light") {
      props.setcolscheme("dark")
    }
    else {
      props.setcolscheme("light")
    }
  }
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = (JSON.parse(localStorage.getItem('profile')));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  //jwt token expire to logout user
  const token = user?.token;
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      logout();
      window.location.href = "/";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate(`/search?query=${query.query}`)
    await dispatch(updateState(prev => !prev))
  }

  const handleOnChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  }
  return (
    <>
      <AppBar position="static" color='transparent' style={{ borderRadius: '10px' }}>
        <Toolbar sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <a style={{ textDecoration: 'none', color: 'inherit' }} href='/'><Typography variant="h6" color="inherit" sx={{ textDecoration: 'none' }}>
            Nowcast
          </Typography></a>
          <div style={{ display: 'flex', gap: '10px' }}>
            <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
              {props.colscheme === 'dark' ? <><Brightness7Icon /></> : <Brightness4Icon />}
            </IconButton>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TextField label="Hit Enter to search..." name="query" onChange={handleOnChange} variant="outlined" size='small' />
              </Box>
            </form>
            <Typography variant="h6" color="inherit">
              {
                user ? (
                  <>
                    <IconButton onClick={handleClick} sx={{ p: 0 }}>
                      <Avatar src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem>{user?.result.name}</MenuItem>
                      <MenuItem>My Profile</MenuItem>
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button component={Link} to="/auth" variant="contained">Login</Button>
                  </>
                )
              }
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar