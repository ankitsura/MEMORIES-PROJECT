import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import dotenv from 'dotenv'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'


import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import Input from './Input';
import useStyles  from './styles';
import Icon from './Icon';
// import Icon from './Icon';

const Auth = () => {
    dotenv.config();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch =  useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {

    }
    const handleChange = (e) => {
        
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    }
    const googleSuccess = (res) =>{
        const token = res?.credential;
        const result = jwtDecode(res?.credential);

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
            {/* <GoogleOAuthProvider clientId="911641069648-6ed8spt8jg317l0tht184feke10lirle.apps.googleusercontent.com">
                <GoogleLogin
                    className={classes.googleButton}
                    color='primary'
                    // disabled={renderProps.disabled}
                    variant='contained'
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                />
            </GoogleOAuthProvider> */}
            <GoogleLogin
                render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                </Button>
                )}
                text='Google Sign In'
                disabled
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
