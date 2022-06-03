import React from 'react'
import { Typography, Paper, LinearProgress, Divider, Grid, Chip, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getPostById, likePost } from '../../actions/post'
import CommentSection from './CommentSection';
import PostRecommendation from './PostRecommendation';
import { updateState } from '../../actions/updatestate';


function PostDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();
  const state = useSelector((state) => state.updatestate);
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.googleId || user?.result?._id;


  React.useEffect(() => {
    dispatch(getPostById(id))
  }, [dispatch, state, location])

  const post = useSelector((state) => state.post);
  const data = post.data;

  const likePostHandler = async () => {
    if (userId) {
      await dispatch(likePost(data?._id));
      await dispatch(updateState(prev => !prev))
    }
    else {
      navigation('/auth')
    }
  }

  return (
    !data?.title?.length ? <LinearProgress sx={{ mt: 2 }} /> : (
      <>
        <Paper elevation={3} sx={{ width: '100%', mt: 2 }}>
          <Grid container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            {
              (data.selectedFile !== "") &&
              <Grid item xs={12} md={12} sm={12} xl={6} display='flex' justifyContent='center' alignItems='center'>
                <img src={data.selectedFile} alt="selected file" height="100%" width="100%" style={{ borderRadius: '13px' }} />
              </Grid>
            }
            {
              (data.selectedFile === "") ? (
                <Grid item xs={12} md={12} sm={12} xl={12}>
                  <Typography variant='h6' sx={{ mb: 1 }}>{data?.title}</Typography>
                  <div>
                    {data.tags?.map((tag) => <Chip label={tag} style={{ marginRight: '5px' }} />)}
                  </div>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  <Typography variant='subtitle1'>Created by: <Link style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }} to={`/profile/${data?.creator}`}>{data?.name}</Link></Typography>
                  <Typography variant='subtitle2' color='GrayText'>Posted: {moment(data.createdAt).fromNow()}</Typography>
                  <Typography variant='subtitle2' color='GrayText'>{moment(data.createdAt).format('MMMM Do YYYY, hh:mm a')}</Typography>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  <Typography variant='subtitle2' >{data?.message}</Typography>
                </Grid>
              ) : (
                <Grid item xs={12} md={12} sm={12} xl={5}>
                  <Typography variant='h6' sx={{ mb: 1 }}>{data?.title}</Typography>
                  <div>
                    {data.tags?.map((tag) => <Chip label={tag} style={{ marginRight: '5px' }} />)}
                  </div>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  <Typography variant='subtitle1'>Created by: <Link style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }} to={`/profile/${data?.creator}`}>{data?.name}</Link></Typography>
                  <Typography variant='subtitle2' color='GrayText'>Posted: {moment(data.createdAt).fromNow()}</Typography>
                  <Typography variant='subtitle2' color='GrayText'>{moment(data.createdAt).format('MMMM Do YYYY, hh:mm a')}</Typography>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  <Typography variant='subtitle2' >{data?.message}</Typography>
                </Grid>
              )
            }
          </Grid>
        </Paper>
        <div style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
        <IconButton onClick={likePostHandler}>
          {
            data?.likes?.includes(userId) ? (
              <ThumbUpIcon />
            ) : (
              <ThumbUpOffAltIcon />
            )
          }
        </IconButton>
        <Typography>{data?.likes.length}</Typography>
        </div>
        <CommentSection post={data} />
        <PostRecommendation post={data} />
      </>
    )
  )
}

export default PostDetails