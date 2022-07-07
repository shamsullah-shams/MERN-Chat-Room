import React, { useState, useEffect } from 'react';
import openSocket from "socket.io-client";
import { Grid, Paper } from "@material-ui/core";
import SmallAppBar from "../UI/SmallAppBar";
import axios from "axios";
import AppBar from "../UI/AppBar";
import User from "./users/user";
import { useStyle } from "../UI/Style";
import List from "../UI/List";
import { useDispatch, useSelector } from "react-redux";
import { messagesAction } from "../store/action/message";
import { useNavigate } from 'react-router';
import Spinner from '../UI/Spinner/Spinner';
import Alert from "../UI/Alert";


const Home = (props) => {
    const [spacing, setSpacing] = React.useState(2);
    const [newMessage, setNewMessage] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [req, setReq] = useState(0);
    const [componentRefresh, setComponentRefresh] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [updateValue, setUpdateValue] = useState('');
    const [updateAction, setUpdateAction] = useState(false);
    const navigate = useNavigate();
    const classes = useStyle();

    // @@ ---- checks if user is authenticated or not
    useEffect(() => {
        setSpinner(true);
        setIsAuthenticated(false);
        const isAuth = localStorage.getItem('token') ? localStorage.getItem('token') : false;
        // @@ ---- if user passes the if block then user is Authenticated
        if (!isAuth) {
            return navigate('/signin')
        }
        // @@ ---- IF Token exists Then Verify if it is not expired
        axios.post('http://localhost:8080/api/auth', { token: isAuth })
            .then(result => {
                setSpinner(false);
                if (!result.data.isAuth) {
                    // @@ ---- if Token is expired then redirect to sign in page
                    return navigate('/signin');
                }
            })
            .catch(error => {
                setSpinner(false);
                return navigate('/signin');
            })
        // @@ ---- set that user is Authenticatd
        setIsAuthenticated(true);
    }, [componentRefresh]);


    // @@ ---- Dispatch Redux
    const dispatch = useDispatch();
    useEffect(() => {
        // @@ ---- TO Prevent Infinite Rendering
        if (req === 1) {
            setReq(0);
        }
        // @@ ---- To Work The UseEffect Again and Again
        if (componentRefresh === 1) {
            setComponentRefresh(0);
        }
        // @@ ---- Dispatch Message From State of Redux
        dispatch(messagesAction());
    }, [req]);

    // @@ Get Array Of Messages From State Of Redux
    const messag = useSelector(state => state.messages);
    const { messages, loading } = messag;

    // @@ ---- Open Socket When Someone do a Message
    useEffect(() => {
        const socket = openSocket('http://localhost:8080/');
        // @@ ---- If New Message
        socket.on('messages', data => {
            if (data.action === "newmessage") {
                setReq(1);

            }
        })
    }, [req]);



    // @@ ---- If User Log outs from our page
    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setComponentRefresh(1);
    }



    // @@ ---- On the Submition of Form of New Messages
    const onSubmitHandler = async (event) => {
        event.preventDefault(event);
        // @@ ---- Check If the Input is filled
        if (newMessage !== '') {
            // @@ ---- Get User Information From Local Storage
            const localStorageUser = localStorage.getItem('user');
            const user = JSON.parse(localStorageUser);
            const newUserMessage = {
                message: newMessage,
                userId: user.user._id,
                userImageUrl: user.user.imageUrl,
                userName: user.user.name + " " + user.user.lastName,
            }

            // @@ ---- Input Field Of Form
            setNewMessage('');
            // @@ ---- Send The New Message To The Backend 
            try {
                const result = await axios.post('http://localhost:8080/api/newmessage', newUserMessage);
                // @@ ---- Get New Array of Messages From Backend
                setReq(1);
                setUpdateAction(false);
            } catch (error) {
                // @@ ---- Show Error If Exists
                setSpinner(false);
                setErrorMessage(error.response.data.message);
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 8000);
            }
        }
    }

    // @@ ---- Deleting User Message
    const deleteMessage = async (_id) => {
        axios.post('http://localhost:8080/api/message/delete', {
            _id
        }).then(response => {
            // @@ ---- For page refreshing
            if (req === 0) {
                setReq(1);
            } else if (req === 1) {
                setReq(0);
            }
        })
            .catch(error => console.log(error));
    }

    // @@ ---- when user clicks on the update Message icon 
    const updateMessage = (message) => {
        // @@ ---- set Message Value in the Input Box
        setUpdateAction(true);
        setUpdateValue(message);
        setNewMessage(message.message);
    }

    // @@ ---- On submition of the updateded Message form
    const updateMessageHandler = () => {
        updateValue.message = newMessage;
        axios.post('http://localhost:8080/api/message/update', updateValue)
            .then(result => {
                // @@ ---- OFF the Update Mode
                setUpdateAction(false);
                setUpdateValue('');
                setNewMessage('');
                // @@ ---- For Page Refreshing
                if (req === 0) {
                    setReq(1);
                } else if (req === 1) {
                    setReq(0);
                }
            }).catch(error => { });
    }

    // @@ ---- Handel New Message Value
    const inputValueHander = (event) => {
        setNewMessage(event.target.value);
    }


    // @@ ---- Convert Array Of Messages To JSX
    const allMessages = messages.map(ch => {
        return (
            <List
                message={ch}
                key={ch._id}
                deleteMessage={deleteMessage}
                updateMessage={updateMessage}
            />
        )
    });


    return (
        <React.Fragment>
            {
                spinner || loading ? <Spinner /> : ''
            }
            <AppBar logout={logout} />
            <Grid container className={classes.rootOfHome} spacing={2}>
                <Grid container justifyContent="center" spacing={spacing}>
                    {
                        // @@ ---- If Error Exists
                        error ? <Alert message={errorMessage} /> : ''
                    }
                    <Grid item>
                        <Paper className={classes.paperOfHome}>
                            <SmallAppBar />
                            <User />
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.paperOfHome}>
                            <div id='paperDiv' className={classes.messageDivOfHome}>
                                {allMessages}
                            </div>
                            <div>
                                <input
                                    placeholder='Enter your message:'
                                    className={classes.inputOfHome}
                                    value={newMessage}
                                    onChange={event => inputValueHander(event)}
                                />
                                <button
                                    className={classes.buttonOfHome}
                                    onClick={updateAction ? updateMessageHandler : onSubmitHandler}>
                                    {updateAction ? "Update" : "Submit"}
                                </button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );

}


export default Home;