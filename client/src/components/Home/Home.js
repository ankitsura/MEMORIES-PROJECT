import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ChipInput from 'material-ui-chip-input';

import { fetchPostsBySearch, getPosts } from '../../actions/postsActions';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles.js';
import Paginate from '../Pagination/Pagination';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}




const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
 
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId, dispatch]);
  
  const searchPost = () => {
    if(search.trim() || tags.length > 0){
      dispatch(fetchPostsBySearch({search, tags: tags.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      console.log('else part');
      navigate('/');
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      searchPost();
    }
  } 

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  }
  const handleDelete = (deleteTag) => {
    setTags(tags.filter((tag) => tag !== deleteTag));
  }

  return (
    <Grow in>
        <Container maxWidth='xl'>
          <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField
                  name='search'
                  variant='outlined'
                  label='Search Memories'
                  fullWidth
                  value={search}
                  onKeyUp= {handleKeyPress}
                  onChange={(e)=> setSearch(e.target.value)}
                />
                <ChipInput
                  style={{margin: '10px 0'}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label='Search Tags'
                  variant='outlined'
                />
                <Button onClick={searchPost} color='primary' variant='contained'>Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <Paper className={classes.pagination} elevation={6}>
                <Paginate/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  );
}

export default Home;
