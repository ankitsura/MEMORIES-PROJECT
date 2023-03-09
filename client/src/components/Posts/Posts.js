import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core'

import Post from './Post/Post.js'
import useStyles from './styles.js';

const Posts = ({setCurrentId}) => {
  const {posts} = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    !posts?.length ? <CircularProgress /> : (
      <Grid container className={classes.mainContainer} alignItems='stretch' spacing={3}>
        {
          posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;
