import React, { useState } from "react";
import { Link } from "react-router-dom"
import Spinner from "../UI/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Signup.css";
import checkValidity from "../../checkValidity";
import DescriptionAlerts from "../UI/Alert";


const theme = createTheme();

const Signup = () => {

    const [user, setUser] = useState({
        name: '', lastName: '', email: '', password: ''
    });
    const [showErrors, setShowErrors] = useState({
        name: false, lastName: false, email: false, password: false
    });
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // @@ ---- Handling User
    const onChangeHandler = event => {
        const { value, name } = event.target;

        setUser(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        });

        // show error messages
        const result = checkValidity(name, value);
        if (!result) {
            setShowErrors(prevState => {
                return {
                    ...prevState,
                    [name]: true
                }
            })
        } else {
            setShowErrors(prevState => {
                return {
                    ...prevState,
                    [name]: false
                }
            })
        }
    }


    // @@ ---- On Submition Of Form
    const onSubmitHandler = async (event) => {

        event.preventDefault(event);

        // @@ ---- check if all fields are filled
        if (
            !checkValidity('name', user.name) ||
            !checkValidity('lastName', user.lastName) ||
            !checkValidity('email', user.email) ||
            !checkValidity('password', user.password) ||
            !image
        ) {
            setErrorMessage("All fields are required");
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);
            return;
        }
        // @@ ---- Get The Form Data and send to the backend
        try {
            setSpinner(true);
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('lastName', user.lastName);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('file', image);

            // @@ ---- send the form data to the backend
            const result = await axios.post('/api/signup', formData);
            setSpinner(false);
            if (result.status === 201) {
                navigate('/signin');
            }
        } catch (error) {
            setSpinner(false);
            setErrorMessage(error.response.data.message);
            setError(true);
            setTimeout(() => {
                setError(false);
                setErrorMessage('')
            }, 8000);
        }

    }



    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {
                        error && <DescriptionAlerts message={errorMessage} />
                    }
                    {
                        spinner && <Spinner />
                    }
                    <Box component="form" noValidate onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={onChangeHandler}
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="First Name"
                                    autoFocus
                                />
                                {
                                    showErrors.name && <small className="Error">Name is Required</small>
                                }

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={onChangeHandler}
                                    autoComplete="lastName"
                                    name="lastName"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    autoFocus
                                />
                                {
                                    showErrors.lastName && <small className="Error">Last Name is Required</small>
                                }

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={onChangeHandler}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                                {
                                    showErrors.email && <small className="Error">Email is Required</small>
                                }

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={onChangeHandler}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                                {
                                    showErrors.password && <small className="Error">password must be more than 8 character</small>
                                }

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={event => setImage(event.target.files[0])}
                                    fullWidth
                                    name="image"
                                    label="Image"
                                    type="file"
                                    id="image"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Link to='/signin'>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}





export default Signup;