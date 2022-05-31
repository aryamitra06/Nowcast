import { Typography, LinearProgress, Grid, Paper, Divider } from '@mui/material'
import React from 'react'
import { recommendPosts } from '../../actions/posts'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom';
function PostRecommendation({ post }) {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.posts);
  React.useEffect(() => {
    dispatch(recommendPosts({ search: 'none', tags: post?.tags?.join(',') }));
  }, [post])

  const recommendedPosts = data.posts?.filter(({ _id }) => _id !== post._id);

  return (
    <>
      <Typography variant='h6' mt={2} >Recommended Posts</Typography>
      {
        !data.posts?.length ? <LinearProgress sx={{ mt: 2 }} /> : (
          <>
            <Grid container display="flex" alignItems="center" justifyContent='flex-start' spacing={2} sx={{ mt: 0 }}>
              {
                recommendedPosts.map((post) => (
                  <Grid item xs={12} md={4} sm={4} xl={4}>
                    <Link style={{textDecoration: 'none'}} to={`/post/${post._id}`}><Paper sx={{ height: '300px' }}>
                      <img src={post.selectedFile} height="50%" width="100%" style={{objectFit: 'cover', borderRadius: "5px 5px 0 0"}}></img>
                      <div style={{padding: "10px 12px"}}>
                      <Typography variant='body1'>{post.title.toString().slice(0,30)}...</Typography>
                      <Divider sx={{mb:1, mt:1}}/>
                      <Typography variant='body2'>{post.message.toString().slice(0,140)}...</Typography>
                      </div>
                    </Paper></Link>
                  </Grid>
                ))
              }
            </Grid>
          </>
        )
      }
    </>
  )
}

export default PostRecommendation