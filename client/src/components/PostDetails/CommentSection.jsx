import React, { useRef, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { addComment } from '../../actions/postsActions';
import useStyles from './styles';

const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');

    const user = JSON.parse(localStorage.getItem('profile'))?.result;

    const handleClick = async () => {
        const finalComment = `${user?.name}: ${comment}`
        const newComments = await dispatch(addComment(post._id, finalComment)); // newComments are returned from action
        setComments(newComments);
        setComment('');
        commentsRef.current.scrollIntoView({behavior: 'smooth'}); 
    }

  return (
    <>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant='h6'>Comments</Typography>
            { comments.map((comment, index) => (
                <Typography key={index} gutterBottom variant='subtitle1'>
                    <strong>{comment.split(': ')[0]}</strong>
                    {comment.split(':')[1]}
                </Typography>
            )) }
            <div ref={commentsRef} />
        </div>
        <div style={{width: '70%'}}>
            <Typography gutterBottom variant='h6'>Write a Comment</Typography>
            <TextField
                fullWidth
                aria-rowcount={4}
                variant='outlined'
                label='Comment'
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button style={{marginTop:'10px'}} color='primary' fullWidth variant='contained' disabled={ !comment || !user } onClick={handleClick}>
                { user ? 'Comment' : 'Please login to make a comment'}
            </Button>
        </div>
      </div>
    </>
  );
}

export default CommentSection;
