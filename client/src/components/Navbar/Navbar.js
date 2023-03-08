import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import jwtDecode from 'jwt-decode';


import useStyles from './styles';
import memories from '../../images/memories.png';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    const logOut = () => {
      dispatch({type: 'LOGOUT'});
      navigate('/auth');
      setUser(null);
    };

    useEffect(() => {
      const token = user?.token;
       if (token) {
         const decodedToken = jwtDecode(token);
         if(decodedToken.exp * 1000 < new Date().getTime()){
          logOut();
          }
        }
    });
    
    
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

  return (
        <AppBar className={classes.appBar} position="static" color="inherit">
          <div className={classes.logo}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt='memories' height="60"/>
          </div>
            <Toolbar className={classes.toolbar}>
              {
                user ? (
                  <div className={classes.profile}>
                    <div className={classes.avatar}>
                      <Avatar className={classes.purple} src={user.result.picture} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
                      <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    </div>
                    <Button variant='contained' onClick={logOut} className={classes.logout} color='secondary'>Logout</Button>
                  </div>
                ) : (
                  <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )
              }
            </Toolbar>
        </AppBar>
  );
}

export default Navbar;
