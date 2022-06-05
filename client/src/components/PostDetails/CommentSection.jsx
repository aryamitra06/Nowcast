import React, {useState} from 'react'
import { Grid, Grow, TextField, Typography, LinearProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../actions/comment';
import { fetchComments } from '../../actions/comments'
import { updateState } from '../../actions/updatestate'

function CommentSection({ post }) {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setCommment] = React.useState('');
  const [loader, setLoader] = React.useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setLoading(true);
    await dispatch(addComment({ comment: comment, postId: post._id, name: user?.result?.name }))
    await setLoading(false);
    await dispatch(updateState(prev => !prev))
    await setCommment('');
  }

  const state = useSelector((state) => state.updatestate);
  const comments = useSelector((state) => state.comments);
  const data = comments.data;

  React.useEffect(() => {
    dispatch(fetchComments(post._id));
  }, [state, dispatch, post._id])

  React.useEffect(() => {
    if (comments?.status === 200) {
      setLoader(false);
    }
  }, [comments])

  return (
    <>
      <Grow in>
        <Grid container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0 }} >
          <Grid item xs={12} md={12} sm={12} xl={12} sx={{ alignSelf: 'flex-start', mb: 2 }}>
            {
              (user) && (
                <>
                  <Typography variant='h6' sx={{ mb: 2 }}>Write a Comment</Typography>
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                      <TextField value={comment} onChange={event => setCommment(event.target.value)} multiline size='small' fullWidth placeholder='What is your view?' required></TextField>
                      <LoadingButton type='submit' loading={loading} variant='contained' sx={{ alignSelf: 'flex-start' }}>Comment</LoadingButton>
                    </div>
                  </form>
                </>
              )
            }
          </Grid>
          <Grid item xs={12} md={12} sm={12} xl={12} sx={{ alignSelf: 'flex-start' }}>
            <Typography variant='h6' sx={{ mb: 2 }}>Comments ({data?.length})</Typography>
              {
                loader && <LinearProgress sx={{ mt: 2 }} />
              }
              {
                data?.length === 0 && <><Typography variant='body1' color='GrayText'>No comment found, Be the first one to comment!</Typography></>
              }
            <div style={{ overflowX: 'scroll', padding: '5px', display: 'flex' }}>
              {
                data?.map((d) => (
                  <Comment key={d} comment={d} />
                ))
              }
            </div>
          </Grid>
        </Grid>
      </Grow>
    </>
  )
}

export default CommentSection