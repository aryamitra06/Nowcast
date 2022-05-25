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
      <Paper elevation={3} sx={{ width: '100%', mt: 4}}>
        <Grid container maxWidth="lg" sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '500px'}}>
          <Grid item xs={11} sm={6} sx={{ display:'flex' ,alignItems: 'center', justifyContent: 'center'}}>
            <img src={data.selectedFile} style={{width: '100%', height: '500px', borderRadius: '4px 0px 0px 4px' }} />
          </Grid>
          <Grid item xs={11} sm={5}>
            <Typography variant='h4' sx={{mb:1, width: '95%'}}>{data?.title}</Typography>
            <div>
            {data.tags?.map((tag) => <Chip label={tag} style={{ marginRight: '5px' }} />)}
            </div>
            <Divider sx={{mt:2, mb:2}}/>
            <Typography variant='subtitle1'>Created by: {data?.name}</Typography>
            <Typography variant='subtitle2'>Posted: {moment(data.createdAt).fromNow()}</Typography>
            <Typography variant='subtitle2'>{moment(data.createdAt).format('MMMM Do YYYY, hh:mm a')}</Typography>
            <Divider sx={{mt:2, mb:2}}/>
            <Typography variant='subtitle1' sx={{width: '95%'}} >{data?.message}</Typography>
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