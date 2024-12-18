import React, { useEffect, useState } from 'react'
import './login.css';
import logo from '../../assets/logo/logo.png'
import { Button, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import LoginTopBar from '../../components/loginTopBar/LoginTopBar';
import ALink from '../../components/alink/ALink';
import LoginBottomBar from '../../components/loginBottomBar/LoginBottomBar';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useApi from '../../hooks/useApi';
import { userLogin } from '../../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorDescription, setUsernameErrorDescription] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorDescription, setPasswordErrorDescription] = useState(false);
    const [errorSnackOpen, seterrorSnackOpen] = React.useState(true);
    const [errorSnackDescription, seterrorSnackDescription] = React.useState("");

    const handleUsernameChange = (event) => setUsername(event.target.value.trim())
    const handlePasswordChange = (event) => setPassword(event.target.value.trim())
    const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);  

    const { data: loginStatus, error, loading, fetchData } = useApi(userLogin);
    const navigate = useNavigate();

    useEffect(()=>{
      setLoginCredentialsToLocalStorage();
    },[loginStatus])

    const handleClick = () => {
      seterrorSnackOpen(true);
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      seterrorSnackOpen(false);
    };

    const validateCredentials = () => {

      clearErrors();
      let hasError = false;

      if(username === "" || username == undefined || username == null){
        setUsernameError(true);
        setUsernameErrorDescription("Username cannot be empty");
        hasError = true;
      }

      if(password === "" || password == undefined || password == null){
        setPasswordError(true);
        setPasswordErrorDescription("Password cannot be empty");
        hasError = true;
      }

      return !hasError;

    }

    const clearErrors = () => {
        setUsernameError(false);
        setPasswordError(false);
        setPasswordErrorDescription("");
        setUsernameErrorDescription("");
    }

    const setLoginCredentialsToLocalStorage = () => {
      if(loginStatus != null){
        localStorage.setItem('access_token', loginStatus.access_token);
        navigate('/');
      }
    }

    const login = () => {
      
      const status = validateCredentials();

      if(status){

        const credentials = {
          email: username,
          password: password,
        };

        fetchData(credentials);

        if(error){
          console.log("Login Error : ", error)
        }

      }
    }

  return (
    <div className='mainContainer'>
      <LoginTopBar />
        <div className='loginMainContainer'>
                
                <div className='loginContainer'>
                    <div className='loginText'>
                        <Typography variant='h4'>Log in</Typography>
                        <span className='smallText'>Always stay updated with news around the world</span>
                    </div>
                    <div className="loginCredentialContainer">
                        <TextField
                            label="Username"
                            variant="outlined"
                            size='small'
                            value={username}
                            onChange={handleUsernameChange}
                            error={usernameError}
                            helperText={usernameErrorDescription}
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            size='small'
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                            helperText={passwordErrorDescription}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={handleTogglePasswordVisibility}
                                      edge="end"
                                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                        />
                        
                        <ALink url="/forgetPassword" displayText="Forgot Password?" />
                        <div>
                            <input type='checkbox' />
                            <span className='keepMeSignIn'> Keep me logged in </span>
                        </div>
                        <br />
                        <Button 
                          variant="contained" 
                          sx={{backgroundColor:'#102030'}} 
                          onClick={login}
                          loading={loading}
                        >
                          Log in
                        </Button>
                        <br />
                        <hr />
                        <span>Don't have an account? <ALink url="/register" displayText="Join now" /> </span>  
                    </div>                    
                </div>
        </div>
      <LoginBottomBar />
      {error && <Snackbar
        open={errorSnackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Something went wrong. Login failed"
      />}
      
    </div>
    
  )
}

export default Login
