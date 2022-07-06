import React, { useState } from "react";
import Input from "../UI/Input";
import ButtonField from "../UI/Button";
import { Card, Container, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom"
import { useStyle } from "../UI/StyleOfForm";
import Alert from "../UI/Alert";
import Spinner from "../UI/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Signup = () => {
    const classes = useStyle();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // @@ Handling User Name
    const nameHandler = (event) => {
        setName(event.target.value);
    }
    // @@ Handling User Last Name
    const lastNameHandler = (event) => {
        setLastName(event.target.value);
    }
    // @@ Handling User Email
    const emailHandler = (event) => {
        setEmail(event.target.value);
    }
    // @@ Handling User Password
    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    // On Submition Of Form
    const onSubmitHandler = async () => {
        // @@ check if all fields are filled
        if (name === '' || email === '' || password === '' || lastName === '') {
            setErrorMessage("All fields are required");
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);
            return;
        }
        // @@ Get The Form Data and send to the backend
        try {
            setSpinner(true);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('file', image);

            const result = await axios.post('http://localhost:8080/api/signup', formData);
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
                        <h1>Sign Up</h1>
                        <Input
                            type="text"
                            label="Enter Name"
                            value={name}
                            onChange={nameHandler}
                        />
                        <Input
                            type="text"
                            label="Enter Last Name"
                            value={lastName}
                            onChange={lastNameHandler}
                        />
                        <Input
                            type="text"
                            label="Enter Email"
                            value={email}
                            onChange={emailHandler}
                        />
                        <Input
                            type="password"
                            label="Enter Password"
                            value={password}
                            onChange={passwordHandler}
                        />
                        <Input
                            required
                            type="file"
                            variant="outlined"
                            onChange={event => setImage(event.target.files[0])}
                        />
                        <ButtonField
                            onClick={onSubmitHandler}
                        >
                            Submit
                        </ButtonField>
                        <Link to='/signin' className={classes.ButtonLinkClass}>
                            <ButtonField>
                                Sign In
                            </ButtonField>
                        </Link>
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    )
}


export default Signup;