import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import dotenv from 'dotenv'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'


import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import Input from './customInput';
import useStyles  from './styles';
import Icon from './Icon';
import { signin, signup } from '../../actions/authActions';
// import Icon from './Icon';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    dotenv.config();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch =  useDispatch();
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Switch from Login to Sign Up page or vice-versa
    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    }

    const googleSuccess = (res) =>{
        const token = res?.credential;
        const result = jwtDecode(token);
        try {
            dispatch({type: 'AUTH', data: {result, token}});
            navigate('/');
        } catch (error) {
            console.log('error',error);
        }
    }

    const googleFailure = () =>{
        console.log('Google Sign In failure. Try again later');
    }

  return (
    <Container component="main" maxWidth="xs">
       <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlined />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' autoFocus />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    {
                        isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />
                    }
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin
                    render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    </Button>
                    )}
                    text='Google Sign In'
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
       </Paper>
    </Container>
  );
}

export default Auth;
