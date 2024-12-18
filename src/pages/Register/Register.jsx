import React, { useEffect, useState } from 'react'
import './register.css';
import { Autocomplete, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LoginBottomBar from '../../components/loginBottomBar/LoginBottomBar';
import LoginTopBar from '../../components/loginTopBar/LoginTopBar';
import Alink from '../../components/alink/ALink'
import Agreement from '../../components/agreement/Agreement';
import dayjs from 'dayjs';
import { userRegister } from '../../api';
import useApi from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const interests = [
        { title: 'Business', id: 1 },
        { title: 'Crime', id: 2 },
        { title: 'Culture', id: 3 },
        { title: 'Education', id: 5 },
        { title: 'Entertainment', id: 6 },
        { title: 'Environment', id: 7 },
        { title: 'Health', id: 8 },
        { title: 'Lifestyle', id: 9 },
        { title: 'Politics', id: 10 },
        { title: 'Science', id: 11 },
        { title: 'Sports', id: 12 },
        { title: 'Technology', id: 13 },
        { title: 'Travel', id: 14 },
        { title: 'World News', id: 15 },
    ];

    const countries = [
        {
          "id": 1,
          "country": "Afghanistan"
        },
        {
          "id": 2,
          "country": "Albania"
        },
        {
          "id": 3,
          "country": "Algeria"
        },
        {
          "id": 4,
          "country": "Andorra"
        },
        {
          "id": 5,
          "country": "Angola"
        },
        {
          "id": 6,
          "country": "Antigua and Barbuda"
        },
        {
          "id": 7,
          "country": "Argentina"
        },
        {
          "id": 8,
          "country": "Armenia"
        },
        {
          "id": 9,
          "country": "Australia"
        },
        {
          "id": 10,
          "country": "Austria"
        },
        {
          "id": 11,
          "country": "Azerbaijan"
        },
        {
          "id": 12,
          "country": "Bahamas"
        },
        {
          "id": 13,
          "country": "Bahrain"
        },
        {
          "id": 14,
          "country": "Bangladesh"
        },
        {
          "id": 15,
          "country": "Barbados"
        },
        {
          "id": 16,
          "country": "Belarus"
        },
        {
          "id": 17,
          "country": "Belgium"
        },
        {
          "id": 18,
          "country": "Belize"
        },
        {
          "id": 19,
          "country": "Benin"
        },
        {
          "id": 20,
          "country": "Bhutan"
        },
        {
          "id": 21,
          "country": "Bolivia"
        },
        {
          "id": 22,
          "country": "Bosnia and Herzegovina"
        },
        {
          "id": 23,
          "country": "Botswana"
        },
        {
          "id": 24,
          "country": "Brazil"
        },
        {
          "id": 25,
          "country": "Brunei"
        },
        {
          "id": 26,
          "country": "Bulgaria"
        },
        {
          "id": 27,
          "country": "Burkina Faso"
        },
        {
          "id": 28,
          "country": "Burundi"
        },
        {
          "id": 29,
          "country": "Cabo Verde"
        },
        {
          "id": 30,
          "country": "Cambodia"
        },
        {
          "id": 31,
          "country": "Cameroon"
        },
        {
          "id": 32,
          "country": "Canada"
        },
        {
          "id": 33,
          "country": "Central African Republic"
        },
        {
          "id": 34,
          "country": "Chad"
        },
        {
          "id": 35,
          "country": "Chile"
        },
        {
          "id": 36,
          "country": "China"
        },
        {
          "id": 37,
          "country": "Colombia"
        },
        {
          "id": 38,
          "country": "Comoros"
        },
        {
          "id": 39,
          "country": "Congo (Congo-Brazzaville)"
        },
        {
          "id": 40,
          "country": "Costa Rica"
        },
        {
          "id": 41,
          "country": "Croatia"
        },
        {
          "id": 42,
          "country": "Cuba"
        },
        {
          "id": 43,
          "country": "Cyprus"
        },
        {
          "id": 44,
          "country": "Czechia (Czech Republic)"
        },
        {
          "id": 45,
          "country": "Denmark"
        },
        {
          "id": 46,
          "country": "Djibouti"
        },
        {
          "id": 47,
          "country": "Dominica"
        },
        {
          "id": 48,
          "country": "Dominican Republic"
        },
        {
          "id": 49,
          "country": "Ecuador"
        },
        {
          "id": 50,
          "country": "Egypt"
        },
        {
          "id": 51,
          "country": "El Salvador"
        },
        {
          "id": 52,
          "country": "Equatorial Guinea"
        },
        {
          "id": 53,
          "country": "Eritrea"
        },
        {
          "id": 54,
          "country": "Estonia"
        },
        {
          "id": 55,
          "country": "Eswatini"
        },
        {
          "id": 56,
          "country": "Ethiopia"
        },
        {
          "id": 57,
          "country": "Fiji"
        },
        {
          "id": 58,
          "country": "Finland"
        },
        {
          "id": 59,
          "country": "France"
        },
        {
          "id": 60,
          "country": "Gabon"
        },
        {
          "id": 61,
          "country": "Gambia"
        },
        {
          "id": 62,
          "country": "Georgia"
        },
        {
          "id": 63,
          "country": "Germany"
        },
        {
          "id": 64,
          "country": "Ghana"
        },
        {
          "id": 65,
          "country": "Greece"
        },
        {
          "id": 66,
          "country": "Grenada"
        },
        {
          "id": 67,
          "country": "Guatemala"
        },
        {
          "id": 68,
          "country": "Guinea"
        },
        {
          "id": 69,
          "country": "Guinea-Bissau"
        },
        {
          "id": 70,
          "country": "Guyana"
        },
        {
            "id": 71,
            "country": "Haiti"
          },
          {
            "id": 72,
            "country": "Honduras"
          },
          {
            "id": 73,
            "country": "Hungary"
          },
          {
            "id": 74,
            "country": "Iceland"
          },
          {
            "id": 75,
            "country": "India"
          },
          {
            "id": 76,
            "country": "Indonesia"
          },
          {
            "id": 77,
            "country": "Iran"
          },
          {
            "id": 78,
            "country": "Iraq"
          },
          {
            "id": 79,
            "country": "Ireland"
          },
          {
            "id": 80,
            "country": "Israel"
          },
          {
            "id": 81,
            "country": "Italy"
          },
          {
            "id": 82,
            "country": "Jamaica"
          },
          {
            "id": 83,
            "country": "Japan"
          },
          {
            "id": 84,
            "country": "Jordan"
          },
          {
            "id": 85,
            "country": "Kazakhstan"
          },
          {
            "id": 86,
            "country": "Kenya"
          },
          {
            "id": 87,
            "country": "Kiribati"
          },
          {
            "id": 88,
            "country": "Korea, North"
          },
          {
            "id": 89,
            "country": "Korea, South"
          },
          {
            "id": 90,
            "country": "Kuwait"
          },
          {
            "id": 91,
            "country": "Kyrgyzstan"
          },
          {
            "id": 92,
            "country": "Laos"
          },
          {
            "id": 93,
            "country": "Latvia"
          },
          {
            "id": 94,
            "country": "Lebanon"
          },
          {
            "id": 95,
            "country": "Lesotho"
          },
          {
            "id": 96,
            "country": "Liberia"
          },
          {
            "id": 97,
            "country": "Libya"
          },
          {
            "id": 98,
            "country": "Liechtenstein"
          },
          {
            "id": 99,
            "country": "Lithuania"
          },
          {
            "id": 100,
            "country": "Luxembourg"
          },
          {
            "id": 101,
            "country": "Madagascar"
          },
          {
            "id": 102,
            "country": "Malawi"
          },
          {
            "id": 103,
            "country": "Malaysia"
          },
          {
            "id": 104,
            "country": "Maldives"
          },
          {
            "id": 105,
            "country": "Mali"
          },
          {
            "id": 106,
            "country": "Malta"
          },
          {
            "id": 107,
            "country": "Marshall Islands"
          },
          {
            "id": 108,
            "country": "Mauritania"
          },
          {
            "id": 109,
            "country": "Mauritius"
          },
          {
            "id": 110,
            "country": "Mexico"
          },
          {
            "id": 111,
            "country": "Micronesia"
          },
          {
            "id": 112,
            "country": "Moldova"
          },
          {
            "id": 113,
            "country": "Monaco"
          },
          {
            "id": 114,
            "country": "Mongolia"
          },
          {
            "id": 115,
            "country": "Montenegro"
          },
          {
            "id": 116,
            "country": "Morocco"
          },
          {
            "id": 117,
            "country": "Mozambique"
          },
          {
            "id": 118,
            "country": "Myanmar (Burma)"
          },
          {
            "id": 119,
            "country": "Namibia"
          },
          {
            "id": 120,
            "country": "Nauru"
          },
          {
            "id": 121,
            "country": "Nepal"
          },
          {
            "id": 122,
            "country": "Netherlands"
          },
          {
            "id": 123,
            "country": "New Zealand"
          },
          {
            "id": 124,
            "country": "Nicaragua"
          },
          {
            "id": 125,
            "country": "Niger"
          },
          {
            "id": 126,
            "country": "Nigeria"
          },
          {
            "id": 127,
            "country": "North Macedonia"
          },
          {
            "id": 128,
            "country": "Norway"
          },
          {
            "id": 129,
            "country": "Oman"
          },
          {
            "id": 130,
            "country": "Pakistan"
          },
          {
            "id": 131,
            "country": "Palau"
          },
          {
            "id": 132,
            "country": "Panama"
          },
          {
            "id": 133,
            "country": "Papua New Guinea"
          },
          {
            "id": 134,
            "country": "Paraguay"
          },
          {
            "id": 135,
            "country": "Peru"
          },
          {
            "id": 136,
            "country": "Philippines"
          },
          {
            "id": 137,
            "country": "Poland"
          },
          {
            "id": 138,
            "country": "Portugal"
          },
          {
            "id": 139,
            "country": "Qatar"
          },
          {
            "id": 140,
            "country": "Romania"
          },
          {
            "id": 141,
            "country": "Russia"
          },
          {
            "id": 142,
            "country": "Rwanda"
          },
          {
            "id": 143,
            "country": "Saint Kitts and Nevis"
          },
          {
            "id": 144,
            "country": "Saint Lucia"
          },
          {
            "id": 145,
            "country": "Saint Vincent and the Grenadines"
          },
          {
            "id": 146,
            "country": "Samoa"
          },
          {
            "id": 147,
            "country": "San Marino"
          },
          {
            "id": 148,
            "country": "Sao Tome and Principe"
          },
          {
            "id": 149,
            "country": "Saudi Arabia"
          },
          {
            "id": 150,
            "country": "Senegal"
          },
          {
            "id": 151,
            "country": "Serbia"
          },
          {
            "id": 152,
            "country": "Seychelles"
          },
          {
            "id": 153,
            "country": "Sierra Leone"
          },
          {
            "id": 154,
            "country": "Singapore"
          },
          {
            "id": 155,
            "country": "Slovakia"
          },
          {
            "id": 156,
            "country": "Slovenia"
          },
          {
            "id": 157,
            "country": "Solomon Islands"
          },
          {
            "id": 158,
            "country": "Somalia"
          },
          {
            "id": 159,
            "country": "South Africa"
          },
          {
            "id": 160,
            "country": "South Sudan"
          },
          {
            "id": 161,
            "country": "Spain"
          },
          {
            "id": 162,
            "country": "Sri Lanka"
          },
          {
            "id": 163,
            "country": "Sudan"
          },
          {
            "id": 164,
            "country": "Suriname"
          },
          {
            "id": 165,
            "country": "Sweden"
          },
          {
            "id": 166,
            "country": "Switzerland"
          },
          {
            "id": 167,
            "country": "Syria"
          },
          {
            "id": 168,
            "country": "Taiwan"
          },
          {
            "id": 169,
            "country": "Tajikistan"
          },
          {
            "id": 170,
            "country": "Tanzania"
          },
          {
            "id": 171,
            "country": "Thailand"
          },
          {
            "id": 172,
            "country": "Timor-Leste"
          },
          {
            "id": 173,
            "country": "Togo"
          },
          {
            "id": 174,
            "country": "Tonga"
          },
          {
            "id": 175,
            "country": "Trinidad and Tobago"
          },
          {
            "id": 176,
            "country": "Tunisia"
          },
          {
            "id": 177,
            "country": "Turkey"
          },
          {
            "id": 178,
            "country": "Turkmenistan"
          },
          {
            "id": 179,
            "country": "Tuvalu"
          },
          {
            "id": 180,
            "country": "Uganda"
          },
          {
            "id": 181,
            "country": "Ukraine"
          },
          {
            "id": 182,
            "country": "United Arab Emirates"
          },
          {
            "id": 183,
            "country": "United Kingdom"
          },
          {
            "id": 184,
            "country": "United States of America"
          },
          {
            "id": 185,
            "country": "Uruguay"
          },
          {
            "id": 186,
            "country": "Uzbekistan"
          },
          {
            "id": 187,
            "country": "Vanuatu"
          },
          {
            "id": 188,
            "country": "Vatican City"
          },
          {
            "id": 189,
            "country": "Venezuela"
          },
          {
            "id": 190,
            "country": "Vietnam"
          },
          {
            "id": 191,
            "country": "Yemen"
          },
          {
            "id": 192,
            "country": "Zambia"
          },
          {
            "id": 193,
            "country": "Zimbabwe"
          }
      ]

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
                                    {countries.map(country => (
                                        <MenuItem 
                                            key={country.id} 
                                            value={country.id} 
                                        >{country.country}</MenuItem>
                                    ))}
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
                                    sx={{
                                        backgroundColor: '#f7f4f3', // Background color for the input area of the Autocomplete
                                      }}
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
