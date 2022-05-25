import React, { useEffect } from 'react'
import Post from './Post'
import { useSelector } from 'react-redux';
import { LinearProgress, Grid } from '@mui/material'

import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../actions/posts';
function Posts() {
  const [toggle, setToggle] = React.useState([]);


  const dispatch = useDispatch();

  const state = useSelector((state) => state.updatestate);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [toggle, dispatch, state])



  const posts = useSelector((state) => state.posts);

  return (
    !posts.length ? <LinearProgress sx={{ mt: 2 }} /> : (
      <>
        <Grid container alignItems="stretch" spacing={2} sx={{ mt: 0 }}>
          {
            posts.map((post) => (
              <Grid key={post._id} item xs={12} sm={6}>
                <Post post={post} setToggle={setToggle} />
              </Grid>
            ))
          }
        </Grid>
      </>
    )
  )
}

export default Posts