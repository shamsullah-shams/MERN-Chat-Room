import React from "react";
import Input from "../UI/Input";
import ButtonField from "../UI/Button";
import { Card, Container, CardContent, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        marginTop: 100,
        width: 400,
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingLeft: 3,
    },
    ButtonLinkClass: {
        textDecoration: 'none',
        color: 'white',
        width: '100%',
        marginLeft: 22
    }
}));

const Signin = () => {
    const classes = useStyle();
    return (
        <>
            <Container className={classes.container}>
                <Card>
                    <CardContent className={classes.content}>
                        <h1>Sign In</h1>
                        <Input type="text" label="Enter Email" />
                        <Input type="password" label="Enter Password" />
                        <ButtonField>Submit</ButtonField>
                        <Link to='/signup' className={classes.ButtonLinkClass}>
                            <ButtonField>
                                Sign Up
                            </ButtonField>
                        </Link>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}


export default Signin;