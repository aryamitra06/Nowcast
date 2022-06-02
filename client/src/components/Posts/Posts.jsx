import React, { useEffect } from 'react'
import Post from './Post'
import { useSelector } from 'react-redux';
import { Grid, LinearProgress, Typography } from '@mui/material'

import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../actions/posts';
import { searchPost } from '../../actions/posts'
import { useSearchParams } from 'react-router-dom';

function Posts() {

  const [loader, setLoader] = React.useState(true);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("query");

  const state = useSelector((state) => state.updatestate);

  useEffect(() => {
    
    if (search === null) {
        dispatch(fetchPosts());
    }
    if (search === "") {
      dispatch(fetchPosts());
    }
    if (search) {
      dispatch(searchPost(search))
    }
  }, [dispatch, state])


  const posts = useSelector((state) => state.posts);
  const data = posts.data;
  
  useEffect(() => {
    if(posts?.status === 200){
      setLoader(false); 
    }
  }, [posts])
  
  
  return (
    <>
      {
        loader && <LinearProgress sx={{mt:2}}/>
      }
      {
        data?.length === 0 && <><Typography variant='h6' mt={2}>No post found</Typography></>
      }
      <Grid container alignItems="stretch" spacing={2} sx={{ mt: 0, mb: 2 }}>
        {
          data?.map((d) => (
            <Grid item xs={12} sm={12}>
              <Post post={d} />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}

export default Posts