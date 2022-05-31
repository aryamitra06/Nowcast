import React from 'react'
import {Button} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useDispatch } from 'react-redux';
import { likePost } from '../../actions/post'
import { updateState } from '../../actions/updatestate'

function Likepost({ post }) {
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result.googleId || user?.result?._id;
  const dispatch = useDispatch();

  const [likes, setLikes] = React.useState(post?.likes);
  const hasLikedPost = post.likes?.find((like) => like === userId);

  const likePostHandler = async () => {
    await dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
    dispatch(updateState(prev => !prev))
  }

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  };

  return (
    <>
      <Button size="small" sx={{mt:2}} color="primary" disabled={!user?.result} onClick={likePostHandler}>
        <Likes />
      </Button>
    </>
  )
}

export default Likepost