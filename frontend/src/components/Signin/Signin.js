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
import "../Signup/Signup.css";
import checkValidity from "../../checkValidity";
import DescriptionAlerts from "../UI/Alert";


const theme = createTheme();

const Signin = () => {

    const [showErrors, setShowErrors] = useState({
        email: false, password: false
    });
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // @@ ---- Handling User
    const onChangeHandler = event => {
        const { value, name } = event.target;

        if (name === 'email') {
            setEmail(event.target.value);
        } else if (name === 'password') {
            setPassword(event.target.value);
        }

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
            !checkValidity('email', email) ||
            !checkValidity('password', password)
        ) {
            setErrorMessage("All fields are required");
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);
            return;
        }

        // @@ ---- Get The Form Data and send to the backend

        setSpinner(true);
        const user = {
            email: email,
            password: password,
        }
        try {
            // @@ ---- send the user information to the backend
            const result = await axios.post('/api/user/login', user);
            // @@ ---- store user information in local storage
            // localStorage.setItem('user', JSON.stringify(result.data));
            // localStorage.setItem('token', result.data.token);

            console.log(result.data.token);

            setSpinner(false);
            // @@ ---- redirect to home screen
            if (result.status === 200) {
                navigate('/');
            }
        } catch (error) {
            setSpinner(false);
            setErrorMessage(error.response.data.message);
            setError(true);
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
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
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    {
                        error && <DescriptionAlerts message={errorMessage} />
                    }
                    {
                        spinner && <Spinner />
                    }
                    <Box component="form" noValidate onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Link to='/signup'>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}





export default Signin;