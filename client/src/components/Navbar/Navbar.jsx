import React, {useState} from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

function Navbar() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user= (JSON.parse(localStorage.getItem('profile')));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  //jwt token expire to logout user
  const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()){
        logout();
        window.location.href = "/";
      }
    }

  return (
    <>
      <AppBar position="static" style={{ borderRadius: '10px' }}>
        <Toolbar sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit" component={Link} to="/" sx={{textDecoration: 'none'}}>
            Nowcast
          </Typography>
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
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar