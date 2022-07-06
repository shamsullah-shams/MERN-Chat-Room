import React from "react";
import Input from "../UI/Input";
import ButtonField from "../UI/Button";
import { Card, Container, CardContent, makeStyles, TextField } from "@material-ui/core";
import { Link } from "react-router-dom"

const useStyle = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        marginTop: 30,
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
        color: "white",
        width: '100%',
        marginLeft: 22
    }
}));


const Signup = () => {
    const classes = useStyle();
    return (
        <>
            <Container className={classes.container}>
                <Card>
                    <CardContent className={classes.content}>
                        <h1>Sign Up</h1>
                        <Input type="text" label="Enter Name" />
                        <Input type="text" label="Enter Last Name" />
                        <Input type="text" label="Enter Email" />
                        <Input type="password" label="Enter Password" />
                        <Input type="file" />
                        <ButtonField>Submit</ButtonField>
                        <Link to='/signin' className={classes.ButtonLinkClass}>
                            <ButtonField>
                                Sign In
                            </ButtonField>
                        </Link>

                    </CardContent>

                </Card>
            </Container>
        </>
    )
}


export default Signup;