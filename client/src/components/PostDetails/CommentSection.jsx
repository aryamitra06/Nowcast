import React from 'react'
import { Button, Grid, Grow, TextField, Typography } from '@mui/material';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../actions/comment';
import { fetchComments } from '../../actions/comments'
import { updateState } from '../../actions/updatestate'

function CommentSection({ post }) {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setCommment] = React.useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addComment({ comment: comment, postId: post._id, name: user?.result?.name }))
    await dispatch(updateState(prev => !prev))
    setCommment('');
  }

  const state = useSelector((state) => state.updatestate);
  const comments = useSelector((state) => state.comments);

  React.useEffect(() => {
    dispatch(fetchComments(post._id));
  }, [state, dispatch, post._id])


  return (
    <>
      <Grow in>
        <Grid container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }} >
          <Grid item xs={12} md={12} sm={12} xl={12} sx={{ alignSelf: 'flex-start', mb: 2 }}>
            {
              (user?.result?.name) && (
                <>
                  <Typography variant='h6' sx={{ mb: 2 }}>Write a Comment</Typography>
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                      <TextField value={comment} onChange={event => setCommment(event.target.value)} multiline size='small' fullWidth placeholder='What is your view?' required></TextField>
                      <Button type='submit' variant='contained' sx={{ alignSelf: 'flex-start' }}>Comment</Button>
                    </div>
                  </form>
                </>
              )
            }
          </Grid>
          <Grid item xs={12} md={12} sm={12} xl={12} sx={{ alignSelf: 'flex-start' }}>
            <Typography variant='h6' sx={{ mb: 2 }}>Comments ({comments?.length})</Typography>
            <div style={{ overflowX: 'scroll', padding: '5px', display: 'flex' }}>
              {
                comments.map((comment) => (
                  <Comment comment={comment} />
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