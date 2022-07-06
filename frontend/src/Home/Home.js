import React, { useState, useEffect } from 'react';
import { Grid, Paper } from "@material-ui/core";
import SmallAppBar from "../UI/SmallAppBar";
import axios from "axios";
import AppBar from "../UI/AppBar";
import User from "./users/user";
import Messages from './messages/message';
import { useStyle } from "../UI/Style";

const Home = (props) => {
    const classes = useStyle();
    const [spacing, setSpacing] = React.useState(2);
    const [newMessage, setNewMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [request, setRequest] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [pageRefresh, setPageRefresh] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);


    // const refreshMessages = () => {
    //     setInterval(() => {
    //         // Get Element
    //         const paperDiv = document.getElementById('paperDiv');


    //         paperDiv.scrollTop = paperDiv.scrollHeight;
    //     }, 2000);
    // };

    // Set the div to bottom for the first time as well
    // refreshMessages();




    useEffect(() => {
        setSpinner(true);
        // const isAuth = localStorage.getItem('token') ? localStorage.getItem('token') : false;
        // if (!isAuth) {
        //   return navigate('/signin')
        // }
        // axios.post('/api/auth', { token: isAuth })
        //   .then(result => {
        //     setSpinner(false);
        //     if (!result.data.isAuth) {
        //       return navigate('/signin');
        //     }
        //   })
        //   .catch(error => {
        //     setSpinner(false);
        //     return navigate('/signin');
        //   })
    }, []);

    useEffect(() => {
        // const socket = openSocket('/');
        // socket.on('messages', data => {
        //     if (data.action === "newmessage") {
        //         setRequest(['1']);
        //     }
        // })
    }, []);



    const logout = () => {
        localStorage.clear();
        setPageRefresh('1');
    }



    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (newMessage !== '') {
            const localStorageUser = localStorage.getItem('user');
            const user = JSON.parse(localStorageUser);
            const newUserMessage = {
                message: newMessage,
                userId: user.user._id,
                userImageUrl: user.user.imageUrl,
                userName: user.user.name + " " + user.user.lastName,
            }
            setNewMessage('');
            try {
                const result = await axios.post('http://localhost:8080/api/newmessage', newUserMessage);
                setChat([...chat, { message: newMessage, _id: Math.random().toString() }])
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
    }


    return (
        <>
            <AppBar logout={logout} />
            <Grid container className={classes.rootOfHome} spacing={2}>
                <Grid container justifyContent="center" spacing={spacing}>
                    <Grid item>
                        <Paper className={classes.paperOfHome}>
                            <SmallAppBar />
                            <User />
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.paperOfHome}>
                            <div id='paperDiv' className={classes.messageDivOfHome}>
                                <Messages />
                            </div>
                            <form onSubmit={onSubmitHandler} >
                                <input placeholder='Enter your message:' className={classes.inputOfHome} value={newMessage} onChange={event => setNewMessage(event.target.value)} />
                                <button className={classes.buttonOfHome}>Submit</button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}





export default Home;