import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, Container, CardContent } from "@material-ui/core";
import Input from "../UI/Input";
import ButtonField from "../UI/Button";
import { useStyle } from "../UI/StyleOfForm";
import Alert from "../UI/Alert";
import Spinner from "../UI/Spinner/Spinner";

const Signin = () => {
    const navigate = useNavigate();
    const classes = useStyle();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [spinner, setSpinner] = useState(false);

    // @@ Handling User Email
    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    // @@ Handling User Password
    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitHandler = async () => {

        // @@ check if All fields are filled
        if (email === "" || password === "") {
            setErrorMessage('All fields are required');
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);

            return;
        }
        setSpinner(true);
        const user = {
            email: email,
            password: password,
        }
        try {
            const result = await axios.post('http://localhost:8080/api/user/login', user);
            localStorage.setItem('user', JSON.stringify(result.data));
            localStorage.setItem('token', result.data.token);
            setSpinner(false);
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
        <React.Fragment>
            {
                spinner ? <Spinner /> : ''
            }
            <Container className={classes.container}>
                <Card>
                    <CardContent className={classes.content}>
                        {
                            error ? <Alert message={errorMessage} /> : ''
                        }
                        <h1>Sign In</h1>
                        <Input
                            onChange={emailHandler}
                            type="text"
                            label="Enter Email"
                            value={email}
                        />
                        <Input
                            onChange={passwordHandler}
                            type="password"
                            label="Enter Password"
                            value={password}
                        />
                        <ButtonField onClick={onSubmitHandler}>Submit</ButtonField>
                        <Link to='/signup' className={classes.ButtonLinkClass}>
                            <ButtonField>
                                Sign Up
                            </ButtonField>
                        </Link>
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    )
}


export default Signin;