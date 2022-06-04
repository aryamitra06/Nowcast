import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, CardActionArea, CardHeader, IconButton, Chip, Menu, MenuItem } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import Edit from '../Modals/Edit';
import Delete from '../Modals/Delete';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"

import { getPostById, likePost } from '../../actions/post';
import { updateState } from '../../actions/updatestate';


function Post({ post }) {
  const navigation = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.googleId || user?.result?._id;

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  //delete modal
  const handleClickOpenDeleteModal = () => {
    setOpenDeleteModal(true);
    setAnchorEl(null);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  //edit modal
  const handleClickOpenEditModal = async () => {
    await dispatch(getPostById(post._id));
    setOpenEditModal(true);
    setAnchorEl(null);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  //menu
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  const likePostHandler = async () => {
    if(userId){
      await dispatch(likePost(post?._id));
      await dispatch(updateState(prev => !prev))
    }
    else{
      navigation('/auth')
    }
  }

  const openPost = () => {
    navigation(`/post/${post._id}`)
  }

  return (
    <>
      <Card>
        <>
          <CardHeader
            action={
              <>
                {
                  (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <IconButton onClick={handleOpenMenu}>
                      <MoreVertIcon />
                    </IconButton>
                  )
                }
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleClickOpenEditModal}>Edit</MenuItem>
                  <MenuItem onClick={handleClickOpenDeleteModal}>Delete</MenuItem>
                </Menu>
              </>
            }
            title={post?.name}
            subheader={moment(post?.createdAt).fromNow()}
          />
        </>
        <CardActionArea onClick={openPost}>
          {
            post?.selectedFile && (
              <CardMedia image={post?.selectedFile} style={{ height: '180px' }} />
            )
          }
          <CardContent>
            {post?.tags.map((tag) => <Chip label={tag} style={{ marginRight: '5px' }} />)}
            <Typography variant="body1" component="h2">
              {post?.title.toString().substring(0, 40)} {post?.title.length > 40 && <Typography variant="body2" color="textPrimary" component="p">...</Typography>}
            </Typography>
            <Typography variant="body2" color='GrayText' component="p">
              {post?.message.toString().substring(0, 100)} {post?.message.length > 100 && <Typography variant="body2" color='GrayText' component="p">...Read More</Typography>}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton onClick={likePostHandler}>
            {
              post?.likes?.includes(userId) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOffAltIcon />
              )
            }
          </IconButton>
          <Typography>{post?.likes.length}</Typography>
        </CardActions>
      </Card>
      <Delete openDeleteModal={openDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} postid={post?._id} setOpenDeleteModal={setOpenDeleteModal}/>
      <Edit openEditModal={openEditModal} handleCloseEditModal={handleCloseEditModal} postid={post?._id} setOpenEditModal={setOpenEditModal}/>
    </>
  )
}

export default Post