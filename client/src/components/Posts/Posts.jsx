import React, { useEffect } from 'react'
import Post from './Post'
import { useSelector } from 'react-redux';
import { LinearProgress, Grid } from '@mui/material'

import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../actions/posts';
import { searchPost } from '../../actions/posts'
import { useSearchParams } from 'react-router-dom';

function Posts() {

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("query");

  const state = useSelector((state) => state.updatestate);

  useEffect(() => {
    if (search === null) {
      dispatch(fetchPosts());
    }
    if (search) {
      dispatch(searchPost(search))
    }
  }, [dispatch, state, search])


  const posts = useSelector((state) => state.posts);

  return (
    !posts.length ? <LinearProgress sx={{ mt: 2 }} /> : (
      <>
        <Grid container alignItems="stretch" spacing={2} sx={{ mt: 0 }}>
          {
            posts.map((post) => (
              <Grid item xs={12} sm={12}>
                <Post post={post} />
              </Grid>
            ))
          }
        </Grid>
      </>
    )
  )
}

export default Posts