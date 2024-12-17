import React, { useEffect, useState } from 'react'
import './register.css';
import { Autocomplete, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LoginBottomBar from '../../components/loginBottomBar/LoginBottomBar';
import LoginTopBar from '../../components/loginTopBar/loginTopBar';
import Alink from '../../components/alink/ALink'
import Agreement from '../../components/agreement/Agreement';
import dayjs from 'dayjs';
import { userRegister } from '../../api';
import useApi from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const interests = [
        { title: 'Sports', id: 1 },
        { title: 'Tech', id: 2 },
        { title: 'Agriculture', id: 3 },
        { title: 'Art', id: 5 },
        { title: 'Politics', id: 6 },
    ];

    const [openAgreement, setOpenAgreement] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [dob, setDob] = React.useState(null);
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [userInterests, setUserInterests] = useState([])
    const [aggreedStatus, setAggreedStatus] = useState(false)

    const [firstNameError, setFirstNameError] = useState(null)
    const [lastNameError, setLastNameError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [cPasswordError, setcPasswordError] = useState(null)
    const [dobError, setDobError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [cityError, setCityError] = useState(null)
    const [interestError, setInterestError] = useState(null)

    const handleFirstNameChange = (event) => setFirstName(event.target.value?.trim());
    const handleLastNameChange = (event) => setLastName(event.target.value?.trim());
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleCPasswordChange = (event) => setCPassword(event.target.value);
    const handleDobChange = (newValue) => setDob(newValue);
    const handleEmailChange = (event) => setEmail(event.target.value?.trim());
    const handleCityChange = (event) => setCity(event.target.value?.trim());
    const handleCountryChange = (event) => setCountry(event.target.value);
    const handleUserInterestsChange = (_, values) => setUserInterests(values);
    const handleUserAgreement = () => setAggreedStatus(!aggreedStatus);

    const emptyFieldErrorMessage = "*field cannot be empty"
    const minimumLengthErrorMessage = "*length should be atleast 3 letters"
    const invalidEmailErrorMessage = "*invalid email address"
    const passwordDoesNotMatchErrorMessage = "*passwords does not match"
    const passwordNotStandardErrorMessage = "*password does not match the constraints"

    const navigate = useNavigate();

    const { data: respose, error: registerAPIError, loading: registering, fetchData: usrRegister } = useApi(userRegister);

    useEffect(()=>{
        if(respose?.message == "User registered successfully"){
            alert("Successfully registered. Please login from the provided credentials");
            navigate("/login");
        }
    },[respose])

    const handleVisibilityOfAgreement = (visibility) => {
        setOpenAgreement(visibility)
    }

    const submitForm = async () => {
        const errorFoundStatus = validateForm();
        if(!errorFoundStatus){

            if(!aggreedStatus){
                alert("You should accept the agreement");
                return;
            }

            const requestBody = {
                name: firstName + " " + lastName,
                email: email,
                password: password,
                preferences: userInterests.map(intrst => intrst.title),
                date_of_birth: dayjs(dob).format('YYYY-MM-DD')
            }

            usrRegister(requestBody)

        }
    }

    const validateForm = () => {
        
        let errorFoundStatus = false;

        clearErrors();

        if(firstName == ""){
            errorFoundStatus = true;
            setFirstNameError(emptyFieldErrorMessage)
        }else if(firstName.length < 3){
            errorFoundStatus = true;
            setFirstNameError(minimumLengthErrorMessage)
        }

        if(lastName == ""){
            errorFoundStatus = true;
            setLastNameError(emptyFieldErrorMessage)
        }else if(firstName.length < 3) {
            errorFoundStatus = true;
            setLastNameError(minimumLengthErrorMessage)
        }  
        
        if(dob == null){
            errorFoundStatus = true;
            setDobError(emptyFieldErrorMessage)
        }

        if(email == ""){
            errorFoundStatus = true;
            setEmailError(emptyFieldErrorMessage)
        }else if(!validateEmail()){
            errorFoundStatus = true;
            setEmailError(invalidEmailErrorMessage)
        }

        if(password == ""){
            errorFoundStatus = true;
            setPasswordError(emptyFieldErrorMessage)
        }

        if(cPassword == ""){
            errorFoundStatus = true;
            setcPasswordError(emptyFieldErrorMessage)
        }

        if(password != "" && cPassword != "" && password != cPassword){
            errorFoundStatus = true;
            setPasswordError(passwordDoesNotMatchErrorMessage)
            setcPasswordError(passwordDoesNotMatchErrorMessage)
        }else if(!validatePassword()){
            errorFoundStatus = true;
            setPasswordError(passwordNotStandardErrorMessage)
        }

        if(country == ""){
            errorFoundStatus = true;
            setCityError(emptyFieldErrorMessage)
        }

        if(city == ""){
            errorFoundStatus = true;
            setCityError(emptyFieldErrorMessage)
        }

        if(userInterests == null || userInterests.length == 0 ){
            errorFoundStatus = true;
            setInterestError(emptyFieldErrorMessage)
        }

        return errorFoundStatus;
    }

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=~`{}[\]|:;"'<>,.?/])(?=.{8,})/;
        return passwordRegex.test(password);
    }

    const clearErrors = () => {
        setFirstNameError(null);
        setLastNameError(null);
        setPasswordError(null);
        setcPasswordError(null);
        setDobError(null);
        setEmailError(null);
        setCityError(null);
        setInterestError(null);
    }


  return (
    <div>
        <LoginTopBar />
        <div className='mainContainer'>
                    <div className="registerFormContainer">
                        <div className="header">
                            <span className='signUpText'>Registration</span> 
                        </div>
                        <hr />
                        <div className="container">
                            <div className="rowFields">
                                <div className="left">
                                    <TextField 
                                        value={firstName} 
                                        onChange={handleFirstNameChange} 
                                        label="First Name*"  
                                        variant="outlined" 
                                        size='small' 
                                        color='black'
                                        error={firstNameError != null}
                                        helperText={firstNameError}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker 
                                        label="Date of Birth" 
                                        value={dob}
                                        onChange={handleDobChange}
                                        slotProps={{
                                            textField: {
                                            variant: 'outlined',
                                            size: 'small',
                                            error: dobError != null,
                                            helperText: dobError
                                            },
                                        }}  
                                        
                                    />
                                </LocalizationProvider>
                                <TextField 
                                    value={password}
                                    onChange={handlePasswordChange}
                                    type='password' 
                                    label="Password*" 
                                    variant="outlined" 
                                    size='small' 
                                    error={passwordError != null}
                                    helperText={passwordError}
                                />
                                <FormHelperText>
                                    Password should containe : <br />
                                    - Minimum 8 characters <br />
                                    - At least one capital letter <br />
                                    - At least one simple letter <br />
                                    - At least one number <br />
                                    - At least one capital letter <br />
                                    - At least one symbol <br />
                                </FormHelperText>
                                </div>
                                <div className="right">
                                    <TextField 
                                        value={lastName} 
                                        onChange={handleLastNameChange} 
                                        label="Last Name*" 
                                        variant="outlined" 
                                        size='small' 
                                        error={lastNameError != null}
                                        helperText={lastNameError}
                                    />
                                    <TextField 
                                        type='email' 
                                        label="Email*" 
                                        variant="outlined" 
                                        size='small' 
                                        value={email}
                                        onChange={handleEmailChange}
                                        error={emailError != null}
                                        helperText={emailError}
                                    />
                                    <TextField 
                                        value={cPassword}
                                        onChange={handleCPasswordChange}
                                        type='password' 
                                        label="Confirm Password*" 
                                        variant="outlined" 
                                        size='small' 
                                        error={cPasswordError != null}
                                        helperText={cPasswordError}
                                    />
                                    <TextField 
                                        value={city}
                                        onChange={handleCityChange}
                                        type='text' 
                                        label="City" 
                                        variant="outlined" 
                                        size='small' 
                                        error={cityError != null}
                                        helperText={cityError}
                                    />
                                    <FormControl fullWidth error={cityError != null}>
                                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        Country
                                    </InputLabel>
                                    <Select
                                        variant='outlined'
                                        label='Country'
                                        size='small'
                                        value={country}
                                        onChange={handleCountryChange}
                                    >
                                    <MenuItem value={1}>Finland</MenuItem>
                                    <MenuItem value={2}>Sweden</MenuItem>
                                    <MenuItem value={3}>Norway</MenuItem>
                                    </Select>
                                    {cityError && <FormHelperText>{cityError}</FormHelperText>}
                                </FormControl>
                                </div>
                            </div>
                            <br />
                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    options={interests}
                                    getOptionLabel={(option) => option.title}
                                    value={userInterests}
                                    onChange={handleUserInterestsChange}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Interests"
                                        placeholder="Interests"
                                        error={interestError != null}
                                        helperText={interestError}
                                    />
                                    )}
                                    size='small'
                                />
                                <br />
                                <input type='checkbox' onChange={handleUserAgreement} checked={aggreedStatus} /> <span>I agree for </span> <span className='termsAndConditions' onClick={() => handleVisibilityOfAgreement(true)}>Terms and Conditions</span> <br /><br />
                                <Button
                                    variant="outlined" 
                                    sx={{backgroundColor:'#102030', color: 'white'}}
                                    onClick={() => submitForm()}
                                    disabled={registering}
                                >
                                    {registering ? (
                                        <CircularProgress size={20} sx={{ color: 'white' }} />
                                    ) : (
                                        "Register"
                                    )}
                                </Button>
                        </div>
                        <br />
                        <hr />
                        <div className='alreadyHaveAccount'>
                            <span>Already have an account? <Alink url="/login" displayText="Login" /> </span>
                        </div>
                    </div>
                    
        </div>
        <LoginBottomBar />
        <Agreement visibility={openAgreement} handleVisibility={handleVisibilityOfAgreement} />
    </div> 
  )
}

export default Register
