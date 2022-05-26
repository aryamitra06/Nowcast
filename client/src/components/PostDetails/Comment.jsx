import React from 'react'
import { IconButton, Paper, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

import CommentDelete from '../../components/Modals/CommentDelete'
import moment from 'moment';


function Comment({ comment }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user = JSON.parse(localStorage.getItem('profile'));


  return (
    <>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='body1'>{comment?.name}</Typography>
          {
            (user?.result?.googleId === comment?.creator || user?.result?._id === comment?.creator) && (
              <IconButton onClick={handleClickOpen}><DeleteIcon color='error' /></IconButton>
            )
          }
        </div>
        <Typography variant='body2' color='GrayText'>{moment(comment?.createdAt).fromNow()}</Typography>
        <Typography variant='subtitle2' sx={{ mt: 1 }}>{comment?.comment}</Typography>
      </Paper>
      <CommentDelete open={open} handleClose={handleClose} comment={comment} setOpen={setOpen}/>
    </>
  )
}

export default Comment