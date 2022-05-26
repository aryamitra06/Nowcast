import React from 'react'
import { Typography, Paper, LinearProgress, Divider, Grid, Chip, Grow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigator } from 'react-router-dom';
import moment from 'moment';
import { getPostById } from '../../actions/post'


function PostDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getPostById(id))
  }, [])

  const data = useSelector((state) => state.post);
  console.log(data);
  return (
    <>
    {
      (data.length === 0) ? (
        <>
        <LinearProgress sx={{mt:2}}/>
        </>
      ) : (
        <>
      <Grow in>
      <Paper elevation={3} sx={{ width: '100%', mt: 2}}>
        <Grid container maxWidth="lg" sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2}}>
          <Grid item xs={12} md={12} sm={12} xl={6} display='flex' justifyContent='center' alignItems='center'>
            <img src={data.selectedFile} height="100%" width="100%" style={{borderRadius: '13px'}}/>
          </Grid>
          <Grid item xs={12} md={12} sm={12} xl={5}>
            <Typography variant='h6' sx={{mb:1}}>{data?.title}</Typography>
            <div>
            {data.tags?.map((tag) => <Chip label={tag} style={{ marginRight: '5px' }} />)}
            </div>
            <Divider sx={{mt:2, mb:2}}/>
            <Typography variant='subtitle1'>Created by: {data?.name}</Typography>
            <Typography variant='subtitle2' color='GrayText'>Posted: {moment(data.createdAt).fromNow()}</Typography>
            <Typography variant='subtitle2' color='GrayText'>{moment(data.createdAt).format('MMMM Do YYYY, hh:mm a')}</Typography>
            <Divider sx={{mt:2, mb:2}}/>
            <Typography variant='subtitle2' >{data?.message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      </Grow>
        </>
      )
    }
    </>
  )
}

export default PostDetails