import React from 'react'
import { Grid, Paper, Typography, Divider, Avatar, LinearProgress, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { profilePosts } from '../../actions/posts';
import { Link, useParams } from 'react-router-dom'
import moment from 'moment';

function MyProfile() {
    const [loader, setLoader] = React.useState(true);

    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.googleId || user?.result?._id;
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(profilePosts(userId));
    }, [dispatch])

    const posts = useSelector((state) => state.posts);
    const data = posts.data;

    React.useEffect(() => {
        if (posts?.status === 200) {
            setLoader(false);
        }
    }, [posts])


    const name = data?.[0]?.name;
    const lastpost = data?.[data?.length - 1]?.createdAt;

    let totallikes = 0;
    for (let i = 0; i < data?.length; i++) {
        totallikes = (data?.[i].likes.length) + totallikes;
    }

    return (
        <>
            <Grid container style={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Grid item xs={12} sm={6} md={6} lg={6} mt={3}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ height: '150px', width: '150px' }}></Avatar>
                        <Typography variant='h6' mt={1} mb={1}>{name}</Typography>
                        <Alert severity="info">
                            <Typography variant='body1'>Last Post: {moment(lastpost).format('MMMM Do YYYY, hh:mm a')}</Typography>
                            <Typography variant='body1'>Total Posts: {data?.length}</Typography>
                            <Typography variant='body1'>Total Likes: {totallikes}</Typography>
                        </Alert>
                    </div>
                </Grid>
                <Typography variant='h6' mb={1} mt={2} textAlign='center'>All Posts</Typography>
            </Grid>
            {
                <Grid container style={{ mt: 2 }} spacing={2}>
                    {
                        loader && <LinearProgress sx={{ mt: 2 }} />
                    }
                    {
                        data?.length === 0 && <><Typography variant='h6' mt={2}>No post found</Typography></>
                    }
                    {
                        data?.map((post) => (
                            <Grid key={data._id} item xs={12} sm={6} md={4} lg={4}>
                                <Link style={{ textDecoration: 'none' }} to={`/post/${post._id}`}>
                                    <Paper sx={{ height: '300px' }}>
                                        <img src={post.selectedFile} height="50%" width="100%" style={{ objectFit: 'cover', borderRadius: "5px 5px 0 0" }}></img>
                                        <div style={{ padding: "10px 12px" }}>
                                            <Typography variant='body1'>{post.title.toString().slice(0, 30)}...</Typography>
                                            <Divider sx={{ mb: 1, mt: 1 }} />
                                            <Typography variant='body2'>{post.message.toString().slice(0, 140)}...</Typography>
                                        </div>
                                    </Paper>
                                </Link>
                            </Grid>
                        ))
                    }
                </Grid>
            }
        </>
    )
}

export default MyProfile