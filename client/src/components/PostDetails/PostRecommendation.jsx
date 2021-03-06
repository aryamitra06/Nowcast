import { Typography, LinearProgress, Grid, Paper, Divider } from '@mui/material'
import React from 'react'
import { recommendPosts } from '../../actions/posts'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
function PostRecommendation({ post }) {
  const [loader, setLoader] = React.useState(true);
  const dispatch = useDispatch();

  const {id} = useParams();

  
  const posts = useSelector((state) => state.posts);
  const data = posts?.data;
  const recommendedPosts = data?.filter(({ _id }) => _id !== post?._id);
  
  
  React.useEffect(() => {
    if (post?.title) {
      dispatch(recommendPosts(id));
    }
    if (posts?.status === 200) {
      setLoader(false);
    }
  }, [dispatch, id, posts?.status ])


  return (
    <>
      <Typography variant='h6' mt={2} >Recommended For You</Typography>
      {
        <>
          {
            loader && <LinearProgress sx={{ mt: 2 }} />
          }
          {
            recommendedPosts?.length === 0 && <><Typography variant='body1' color='GrayText' mt={2}>No recommended posts found</Typography></>
          }
          <Grid container display="flex" alignItems="center" justifyContent='flex-start' spacing={2} sx={{ mt: 0, mb: 2 }}>
            {
              recommendedPosts?.map((post) => (
                <Grid key={post?._id} item xs={12} md={4} sm={4} xl={4}>
                  <Link style={{ textDecoration: 'none' }} to={`/post/${post?._id}`}>
                    <Paper>
                      {
                        post?.selectedFile && (
                          <img src={post?.selectedFile} height="50%" width="100%" style={{ objectFit: 'cover', borderRadius: "5px 5px 0 0" }}></img>
                        )
                      }
                      <div style={{ padding: "10px 12px" }}>
                        <Typography variant='body1'>{post?.title.toString().slice(0, 30)}...</Typography>
                        <Divider sx={{ mb: 1, mt: 1 }} />
                        <Typography variant='body2'>{post?.message.toString().slice(0, 140)}...</Typography>
                      </div>
                    </Paper>
                  </Link>
                </Grid>
              ))
            }
          </Grid>
        </>
      }
    </>
  )
}

export default PostRecommendation